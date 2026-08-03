import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { randomUUID } from 'node:crypto';
import { join } from 'node:path';
import sharp from 'sharp';
import type { User } from '../generated/prisma/client.js';
import { GlobalRole, MediaKind } from '../generated/prisma/client.js';
import { PrismaService } from '../prisma/prisma.service.js';
import type { UploadMediaDto } from './dto.js';

function hasValidMagic(mime: string, data: Buffer): boolean {
  if (mime === 'image/png') return data.length >= 8 && data.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]));
  if (mime === 'image/jpeg') return data.length >= 3 && data[0] === 0xff && data[1] === 0xd8 && data[2] === 0xff;
  if (mime === 'image/webp') return data.length >= 12 && data.subarray(0, 4).toString('ascii') === 'RIFF' && data.subarray(8, 12).toString('ascii') === 'WEBP';
  return false;
}

@Injectable()
export class MediaService {
  constructor(private readonly prisma: PrismaService, private readonly config: ConfigService) {}

  private uploadDir() { return this.config.get('UPLOAD_DIR', '/app/uploads'); }
  private publicApiUrl() { return this.config.get('PUBLIC_API_URL', 'http://localhost:4000').replace(/\/$/, ''); }

  private async optimize(data: Buffer, kind: MediaKind) {
    const base = sharp(data, { failOn: 'error', limitInputPixels: 40_000_000 }).rotate();
    const metadata = await base.metadata();
    if (!metadata.width || !metadata.height) throw new BadRequestException('Не удалось определить размер изображения');
    if (metadata.width * metadata.height > 40_000_000) throw new BadRequestException('Слишком большое разрешение изображения');

    const full = kind === MediaKind.AVATAR
      ? base.clone().resize(512, 512, { fit: 'cover', position: 'attention', withoutEnlargement: true })
      : kind === MediaKind.COVER
        ? base.clone().resize(1800, 720, { fit: 'cover', position: 'attention', withoutEnlargement: true })
        : base.clone().resize(1800, 1800, { fit: 'inside', withoutEnlargement: true });
    const fullBuffer = await full.webp({ quality: 84, effort: 4 }).toBuffer({ resolveWithObject: true });
    const thumbBuffer = await base.clone().resize(520, 520, { fit: 'inside', withoutEnlargement: true }).webp({ quality: 76, effort: 4 }).toBuffer();
    return { full: fullBuffer.data, info: fullBuffer.info, thumbnail: thumbBuffer };
  }

  async upload(user: User, dto: UploadMediaDto) {
    const match = /^data:(image\/(?:png|jpeg|webp));base64,([A-Za-z0-9+/=\s]+)$/.exec(dto.dataUrl);
    if (!match) throw new BadRequestException('Разрешены только PNG, JPEG и WebP');
    const claimedMime = match[1];
    const data = Buffer.from(match[2].replace(/\s/g, ''), 'base64');
    const max = dto.kind === MediaKind.AVATAR ? 3 * 1024 * 1024 : dto.kind === MediaKind.COVER ? 6 * 1024 * 1024 : 8 * 1024 * 1024;
    if (!data.length || data.length > max) throw new BadRequestException(`Файл слишком большой. Лимит: ${Math.floor(max / 1024 / 1024)} МБ`);
    if (!hasValidMagic(claimedMime, data)) throw new BadRequestException('Содержимое файла не соответствует заявленному формату');

    let optimized: Awaited<ReturnType<MediaService['optimize']>>;
    try { optimized = await this.optimize(data, dto.kind); }
    catch (error) { if (error instanceof BadRequestException) throw error; throw new BadRequestException('Изображение повреждено или не поддерживается'); }

    const folder = join(this.uploadDir(), user.id);
    await mkdir(folder, { recursive: true });
    const id = randomUUID();
    const storageKey = `${user.id}/${id}.webp`;
    const thumbnailStorageKey = `${user.id}/${id}-thumb.webp`;
    await Promise.all([
      writeFile(join(this.uploadDir(), storageKey), optimized.full, { flag: 'wx' }),
      writeFile(join(this.uploadDir(), thumbnailStorageKey), optimized.thumbnail, { flag: 'wx' }),
    ]);

    const asset = await this.prisma.mediaAsset.create({
      data: {
        ownerId: user.id,
        kind: dto.kind,
        mimeType: 'image/webp',
        originalName: dto.originalName.replace(/[\\/\0]/g, '_').slice(0, 160) || 'image.webp',
        storageKey,
        thumbnailStorageKey,
        sizeBytes: optimized.full.length,
        width: optimized.info.width,
        height: optimized.info.height,
      },
    });
    const url = `${this.publicApiUrl()}/v1/media/${asset.id}/content`;
    const thumbnailUrl = `${url}?variant=thumbnail`;
    if (dto.kind === MediaKind.AVATAR) await this.prisma.user.update({ where: { id: user.id }, data: { avatarUrl: url } });
    if (dto.kind === MediaKind.COVER) await this.prisma.user.update({ where: { id: user.id }, data: { coverUrl: url } });
    await this.prisma.auditLog.create({ data: { actorId: user.id, action: 'media.upload', entityType: 'MediaAsset', entityId: asset.id, metadata: { kind: dto.kind, sourceMime: claimedMime, outputMime: 'image/webp', sourceSize: data.length, outputSize: optimized.full.length } } });
    return { id: asset.id, url, thumbnailUrl, kind: asset.kind, mimeType: asset.mimeType, sizeBytes: asset.sizeBytes, width: asset.width, height: asset.height, originalName: asset.originalName };
  }

  async get(id: string, variant?: string) {
    const asset = await this.prisma.mediaAsset.findUnique({ where: { id } });
    if (!asset) throw new NotFoundException('Изображение не найдено');
    const key = variant === 'thumbnail' && asset.thumbnailStorageKey ? asset.thumbnailStorageKey : asset.storageKey;
    const data = await readFile(join(this.uploadDir(), key)).catch(() => null);
    if (!data) throw new NotFoundException('Файл изображения отсутствует');
    return { asset, data };
  }

  async list(userId: string) {
    const assets = await this.prisma.mediaAsset.findMany({ where: { ownerId: userId }, orderBy: { createdAt: 'desc' }, take: 100 });
    return assets.map((asset) => ({ ...asset, url: `${this.publicApiUrl()}/v1/media/${asset.id}/content`, thumbnailUrl: `${this.publicApiUrl()}/v1/media/${asset.id}/content?variant=thumbnail` }));
  }

  async remove(id: string, user: User) {
    const asset = await this.prisma.mediaAsset.findUnique({ where: { id } });
    if (!asset) throw new NotFoundException('Изображение не найдено');
    if (asset.ownerId !== user.id && ![GlobalRole.ADMIN, GlobalRole.OWNER].includes(user.role)) throw new ForbiddenException('Нет доступа');
    throw new BadRequestException('Удаление изображений временно отключено, чтобы не ломать опубликованные материалы');
  }
}
