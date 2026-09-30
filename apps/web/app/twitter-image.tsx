import { createSocialImage, socialImageSize } from '@/lib/social-image';

export const alt = '4rrum — технологии, люди, идеи';
export const size = socialImageSize;
export const contentType = 'image/png';

export default function TwitterImage() {
  return createSocialImage();
}
