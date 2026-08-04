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
import { MediaPartnersModule } from './media-partners/media-partners.module.js';

@Module({
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
    MediaPartnersModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}
