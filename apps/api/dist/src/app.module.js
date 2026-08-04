var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module.js';
import { AuthModule } from './auth/auth.module.js';
import { UsersModule } from './users/users.module.js';
import { CommunitiesModule } from './communities/communities.module.js';
import { PublicationsModule } from './publications/publications.module.js';
import { FeedModule } from './feed/feed.module.js';
import { SearchModule } from './search/search.module.js';
import { NotificationsModule } from './notifications/notifications.module.js';
import { MessagesModule } from './messages/messages.module.js';
import { WalletModule } from './wallet/wallet.module.js';
import { AdminModule } from './admin/admin.module.js';
import { HealthController } from './health.controller.js';
import { MediaModule } from './media/media.module.js';
import { ModerationModule } from './moderation/moderation.module.js';
import { GovernanceModule } from './governance/governance.module.js';
import { WorkshopModule } from './workshop/workshop.module.js';
import { TelegramModule } from './telegram/telegram.module.js';
import { HomeModule } from './home/home.module.js';
import { TagsModule } from './tags/tags.module.js';
import { InteractionsModule } from './interactions/interactions.module.js';
import { CommunityManagementModule } from './community-management/community-management.module.js';
import { EventsModule } from './events/events.module.js';
import { PortfolioModule } from './portfolio/portfolio.module.js';
let AppModule = class AppModule {
};
AppModule = __decorate([
    Module({
        imports: [
            ConfigModule.forRoot({ isGlobal: true, envFilePath: ['../../.env', '.env'] }),
            PrismaModule,
            AuthModule,
            UsersModule,
            CommunitiesModule,
            PublicationsModule,
            FeedModule,
            SearchModule,
            NotificationsModule,
            MessagesModule,
            WalletModule,
            AdminModule,
            MediaModule,
            ModerationModule,
            GovernanceModule,
            WorkshopModule,
            TelegramModule,
            HomeModule,
            TagsModule,
            InteractionsModule,
            CommunityManagementModule,
            EventsModule,
            PortfolioModule,
        ],
        controllers: [HealthController],
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map