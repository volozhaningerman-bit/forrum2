import 'reflect-metadata';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module.js';
import { requestSecurity } from './common/request-security.js';
async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const config = app.get(ConfigService);
    const webOrigin = config.get('WEB_ORIGIN', 'http://localhost:3000');
    app.use(helmet({ contentSecurityPolicy: false, crossOriginResourcePolicy: { policy: 'cross-origin' } }));
    app.use(requestSecurity({ allowedOrigin: webOrigin }));
    app.useBodyParser('json', { limit: '12mb' });
    app.setGlobalPrefix('v1');
    app.use(cookieParser());
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true, forbidNonWhitelisted: true }));
    app.enableCors({ origin: webOrigin, credentials: true, methods: ['GET', 'HEAD', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'] });
    app.enableShutdownHooks();
    const swagger = new DocumentBuilder()
        .setTitle('FORRUM internal API')
        .setDescription('Внутренний API закрытой альфы FORRUM. Публичный API для сторонних разработчиков не открыт.')
        .setVersion('0.20.2-rc4')
        .addCookieAuth(config.get('SESSION_COOKIE_NAME', 'forrum_session'))
        .build();
    if (config.get('NODE_ENV') !== 'production' || config.get('ENABLE_SWAGGER') === 'true') {
        SwaggerModule.setup('docs', app, SwaggerModule.createDocument(app, swagger));
    }
    await app.listen(Number(config.get('API_PORT', 4000)), '0.0.0.0');
}
bootstrap();
//# sourceMappingURL=main.js.map