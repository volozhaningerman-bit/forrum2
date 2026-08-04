import dotenv from 'dotenv';
dotenv.config({ path: '../../.env' });
import argon2 from 'argon2';
import { PrismaPg } from '@prisma/adapter-pg';
import { AccountState, CommunityRoleType, GlobalRole, PrismaClient, PublicationFormat, PublicationType, WorkshopItemStatus, WorkshopItemType, InteractionStatus, InteractionType, ReactionType, ReviewVerdict, RoleEventType, CommunityEventFormat, CommunityEventStatus, PollKind, PortfolioItemKind, PortfolioItemStatus, } from '../src/generated/prisma/client.js';
import { achievementDefinitions } from '../src/users/achievements.js';
const connectionString = process.env.DATABASE_URL;
if (!connectionString)
    throw new Error('DATABASE_URL is required');
const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString }) });
async function upsertUser(input) {
    const passwordHash = await argon2.hash(input.password, { type: argon2.argon2id });
    const user = await prisma.user.upsert({
        where: { email: input.email },
        update: { role: input.role ?? GlobalRole.USER, displayName: input.displayName, bio: input.bio, onboardingCompletedAt: new Date() },
        create: {
            email: input.email,
            username: input.username,
            displayName: input.displayName,
            passwordHash,
            bio: input.bio,
            role: input.role ?? GlobalRole.USER,
            state: AccountState.VERIFIED,
            emailVerifiedAt: new Date(),
            onboardingCompletedAt: new Date(),
            wallet: { create: { balance: input.role === GlobalRole.OWNER ? 25000 : 5000 } },
            notificationPreference: { create: {} },
            createdAt: new Date(Date.now() - 60 * 86400000),
        },
    });
    await prisma.notificationPreference.upsert({ where: { userId: user.id }, update: {}, create: { userId: user.id } });
    return user;
}
async function ensureRole(input) {
    const role = await prisma.communityRole.upsert({
        where: { userId_communityId_role: { userId: input.userId, communityId: input.communityId, role: input.role } },
        update: { endedAt: null, grantedById: input.grantedById, note: input.note ?? null },
        create: { userId: input.userId, communityId: input.communityId, role: input.role, grantedById: input.grantedById, note: input.note ?? null },
    });
    const eventCount = await prisma.communityRoleEvent.count({ where: { roleId: role.id, type: RoleEventType.GRANTED } });
    if (!eventCount)
        await prisma.communityRoleEvent.create({ data: { roleId: role.id, userId: input.userId, actorId: input.grantedById, type: RoleEventType.GRANTED, note: input.note ?? 'Начальная роль тестовой среды' } });
    return role;
}
async function main() {
    const owner = await upsertUser({
        email: process.env.OWNER_EMAIL ?? 'owner@forrum.local',
        username: 'owner',
        displayName: 'Владелец FORRUM',
        password: process.env.OWNER_PASSWORD ?? 'Owner12345!',
        role: GlobalRole.OWNER,
        bio: 'Основатель закрытой альфы FORRUM.',
    });
    const friend = await upsertUser({
        email: process.env.FRIEND_EMAIL ?? 'friend@forrum.local',
        username: 'friend',
        displayName: 'Первый участник',
        password: process.env.FRIEND_PASSWORD ?? 'Friend12345!',
        bio: 'Тестовый участник для проверки ответов, реакций и личных сообщений.',
    });
    await prisma.platformSetting.upsert({
        where: { key: 'promotion.pricing' }, update: {},
        create: { key: 'promotion.pricing', value: { pinLimit: 3, pinBasePricePerDay: 500, pinDemandPercentPerOccupied: 35, boostLimit: 8, boostBasePricePerDay: 150, boostDemandPercentPerOccupied: 12 } },
    });
    for (const definition of achievementDefinitions) {
        await prisma.achievementDefinition.upsert({
            where: { code: definition.code },
            update: { title: definition.title, description: definition.description, icon: definition.icon, category: definition.category, automatic: definition.automatic, sortOrder: definition.sortOrder, active: true },
            create: { code: definition.code, title: definition.title, description: definition.description, icon: definition.icon, category: definition.category, automatic: definition.automatic, sortOrder: definition.sortOrder },
        });
    }
    const communities = [
        {
            slug: 'forrum-start',
            name: 'FORRUM Start',
            shortDescription: 'Обсуждение и развитие закрытой альфы.',
            description: 'Первое сообщество FORRUM. Здесь участники публикуют идеи, замечания, предложения и помогают улучшать платформу.',
            accentColor: '#3157D5',
        },
        {
            slug: 'internet-projects',
            name: 'Интернет-проекты',
            shortDescription: 'Проекты, команды, дневники разработки и поиск партнёров.',
            description: 'Сообщество для авторов интернет-проектов. Показывайте развитие продукта, собирайте команду, получайте обратную связь и находите первых пользователей.',
            accentColor: '#7C3AED',
        },
        {
            slug: 'promotion',
            name: 'Продвижение',
            shortDescription: 'Маркетинг, рассылки, органический трафик и практические кейсы.',
            description: 'Обсуждение способов продвижения проектов, каналов и личного бренда. Только конкретика, прозрачные кейсы и нормальная дискуссия без обещаний лёгких результатов.',
            accentColor: '#0F8A63',
        },
        {
            slug: 'gta-rp',
            name: 'GTA RP',
            shortDescription: 'Ролевые серверы GTA 5, гайды, команды и обсуждения.',
            description: 'Сообщество игроков GTA RP. Здесь обсуждают серверы, помогают новичкам, публикуют гайды, собирают команды и ведут постоянные темы проектов.',
            accentColor: '#6D4AFF',
        },
        {
            slug: 'telegram',
            name: 'Telegram',
            shortDescription: 'Каналы, боты, Mini Apps, продвижение и обновления.',
            description: 'Сообщество авторов каналов, разработчиков ботов и пользователей Telegram. Новости, практические вопросы, проекты и постоянные темы.',
            accentColor: '#229ED9',
        },
    ];
    for (const data of communities) {
        const community = await prisma.community.upsert({
            where: { slug: data.slug },
            update: { name: data.name, description: data.description, shortDescription: data.shortDescription, accentColor: data.accentColor },
            create: { ...data, createdById: owner.id },
        });
        await ensureRole({ userId: owner.id, communityId: community.id, role: CommunityRoleType.CURATOR, grantedById: owner.id, note: 'Куратор стартового сообщества' });
        await prisma.communitySubscription.upsert({
            where: { userId_communityId: { userId: owner.id, communityId: community.id } }, update: {}, create: { userId: owner.id, communityId: community.id },
        });
        await prisma.communitySubscription.upsert({
            where: { userId_communityId: { userId: friend.id, communityId: community.id } }, update: {}, create: { userId: friend.id, communityId: community.id },
        });
    }
    const gtaParent = await prisma.community.findUniqueOrThrow({ where: { slug: 'gta-rp' } });
    const majestic = await prisma.community.upsert({
        where: { slug: 'majestic-rp' },
        update: {
            name: 'Majestic RP',
            description: 'Дочернее сообщество GTA RP для игроков Majestic: новости, гайды, команды, поддержка и постоянные темы проектов.',
            shortDescription: 'Новости, гайды, команды и поддержка игроков Majestic RP.',
            accentColor: '#8B5CF6',
            parentId: gtaParent.id,
        },
        create: {
            slug: 'majestic-rp',
            name: 'Majestic RP',
            description: 'Дочернее сообщество GTA RP для игроков Majestic: новости, гайды, команды, поддержка и постоянные темы проектов.',
            shortDescription: 'Новости, гайды, команды и поддержка игроков Majestic RP.',
            accentColor: '#8B5CF6',
            parentId: gtaParent.id,
            createdById: owner.id,
        },
    });
    await ensureRole({ userId: owner.id, communityId: majestic.id, role: CommunityRoleType.CURATOR, grantedById: owner.id, note: 'Куратор дочернего сообщества' });
    await prisma.communitySubscription.upsert({
        where: { userId_communityId: { userId: owner.id, communityId: majestic.id } }, update: {}, create: { userId: owner.id, communityId: majestic.id },
    });
    const tags = [
        { slug: 'forrum', label: 'forrum', styleEnabled: true, backgroundColor: '#E9EEFF', textColor: '#2948B1', borderColor: '#BFCBFF' },
        { slug: 'proekty', label: 'проекты', styleEnabled: true, backgroundColor: '#F1EAFE', textColor: '#6D28D9', borderColor: '#D8C5FA' },
        { slug: 'prodvizhenie', label: 'продвижение', styleEnabled: true, backgroundColor: '#E6F6F0', textColor: '#087453', borderColor: '#AEE2D0' },
        { slug: 'idei', label: 'идеи', styleEnabled: false },
    ];
    for (const tag of tags)
        await prisma.tag.upsert({ where: { slug: tag.slug }, update: tag, create: tag });
    const start = await prisma.community.findUniqueOrThrow({ where: { slug: 'forrum-start' } });
    const projects = await prisma.community.findUniqueOrThrow({ where: { slug: 'internet-projects' } });
    const promotion = await prisma.community.findUniqueOrThrow({ where: { slug: 'promotion' } });
    const welcome = await prisma.publication.upsert({
        where: { slug: 'welcome-to-forrum' },
        update: {
            body: '[h2]Добро пожаловать[/h2]Это постоянная тема развития платформы. [b]Пишите честно[/b], что удобно, что раздражает и чего не хватает.\n\n[quote=Команда FORRUM]Здесь накапливается история продукта и обратная связь первых участников.[/quote]\n\n[list]\n[*]Предлагайте механики\n[*]Показывайте ошибки\n[*]Обсуждайте развитие\n[/list]',
        },
        create: {
            slug: 'welcome-to-forrum', format: PublicationFormat.TOPIC, type: PublicationType.ANNOUNCEMENT,
            title: 'Добро пожаловать в закрытую альфу FORRUM',
            body: '[h2]Добро пожаловать[/h2]Это постоянная тема развития платформы. [b]Пишите честно[/b], что удобно, что раздражает и чего не хватает.\n\n[quote=Команда FORRUM]Здесь накапливается история продукта и обратная связь первых участников.[/quote]\n\n[list]\n[*]Предлагайте механики\n[*]Показывайте ошибки\n[*]Обсуждайте развитие\n[/list]',
            authorId: owner.id, communityId: start.id,
        },
    });
    const idea = await prisma.publication.upsert({
        where: { slug: 'show-your-project' },
        update: {},
        create: {
            slug: 'show-your-project', format: PublicationFormat.TOPIC, type: PublicationType.PROJECT,
            title: 'Покажите свой интернет-проект и найдите команду',
            body: 'Расскажите, что вы создаёте, кому это нужно, на каком этапе находится проект и кого вы ищете. Постоянная тема остаётся активной, собирает обновления и помогает формировать репутацию автора.',
            authorId: owner.id, communityId: projects.id,
        },
    });
    await prisma.publication.upsert({
        where: { slug: 'first-promotion-post' },
        update: {},
        create: {
            slug: 'first-promotion-post', format: PublicationFormat.POST, type: PublicationType.DISCUSSION,
            body: 'Какие способы продвижения небольшого сообщества реально давали вам живых участников, а не пустые просмотры?',
            authorId: friend.id, communityId: promotion.id,
        },
    });
    const gta = await prisma.community.findUniqueOrThrow({ where: { slug: 'gta-rp' } });
    const telegram = await prisma.community.findUniqueOrThrow({ where: { slug: 'telegram' } });
    await prisma.publication.upsert({
        where: { slug: 'gta-rp-new-player-start' }, update: {},
        create: { slug: 'gta-rp-new-player-start', format: PublicationFormat.POST, type: PublicationType.QUESTION,
            title: 'С чего лучше начать новичку? Выбор сервера и первый шаг',
            body: 'Всем привет! Только начал интересоваться GTA RP и немного растерялся. Подскажите, на каких серверах комфортнее стартовать новичку и где меньше токсичности?',
            authorId: friend.id, communityId: gta.id },
    });
    await prisma.publication.upsert({
        where: { slug: 'majestic-rp-official-topic' },
        update: {
            communityId: majestic.id,
            body: '[h2]Официальная тема Majestic RP[/h2]Здесь собраны [b]новости обновлений[/b], полезные ссылки, ответы на частые вопросы и поддержка новичков.\n\n[spoiler=Как начать играть]Выберите сервер, создайте персонажа и прочитайте правила проекта.[/spoiler]\n\n[quote]Первый пост регулярно обновляется, а ответы поднимают тему внутри Majestic и общей ленты GTA RP.[/quote]',
        },
        create: { slug: 'majestic-rp-official-topic', format: PublicationFormat.TOPIC, type: PublicationType.GUIDE,
            title: 'Majestic RP — актуальная информация, бонусы и поддержка',
            body: '[h2]Официальная тема Majestic RP[/h2]Здесь собраны [b]новости обновлений[/b], полезные ссылки, ответы на частые вопросы и поддержка новичков.\n\n[spoiler=Как начать играть]Выберите сервер, создайте персонажа и прочитайте правила проекта.[/spoiler]\n\n[quote]Первый пост регулярно обновляется, а ответы поднимают тему внутри Majestic и общей ленты GTA RP.[/quote]',
            authorId: owner.id, communityId: majestic.id },
    });
    await prisma.publication.upsert({
        where: { slug: 'telegram-update-discussion' }, update: {},
        create: { slug: 'telegram-update-discussion', format: PublicationFormat.TOPIC, type: PublicationType.NEWS,
            title: 'Обсуждение обновлений Telegram и полезных находок',
            body: 'Собираем в одной постоянной теме важные обновления Telegram, новые возможности каналов, ботов и Mini Apps, а также реальные впечатления пользователей.',
            authorId: owner.id, communityId: telegram.id },
    });
    const forrumTag = await prisma.tag.findUniqueOrThrow({ where: { slug: 'forrum' } });
    const projectsTag = await prisma.tag.findUniqueOrThrow({ where: { slug: 'proekty' } });
    await prisma.publicationTag.upsert({ where: { publicationId_tagId: { publicationId: welcome.id, tagId: forrumTag.id } }, update: {}, create: { publicationId: welcome.id, tagId: forrumTag.id } });
    await prisma.publicationTag.upsert({ where: { publicationId_tagId: { publicationId: idea.id, tagId: projectsTag.id } }, update: {}, create: { publicationId: idea.id, tagId: projectsTag.id } });
    const commentCount = await prisma.comment.count({ where: { publicationId: welcome.id } });
    if (!commentCount) {
        const firstComment = await prisma.comment.create({ data: { publicationId: welcome.id, authorId: friend.id, body: 'Проверяю первый ответ. Постоянная тема визуально и по поведению должна отличаться от обычного поста.' } });
        await prisma.comment.create({ data: { publicationId: welcome.id, authorId: owner.id, parentId: firstComment.id, body: 'Спасибо. В версии 0.4 страница темы, ответы и ветки обсуждений уже получили отдельный полноценный интерфейс.' } });
    }
    const existingProposal = await prisma.communityProposal.findFirst({ where: { name: 'Дизайн и визуальные проекты' } });
    if (!existingProposal) {
        await prisma.communityProposal.create({ data: {
                authorId: friend.id, name: 'Дизайн и визуальные проекты',
                description: 'Отдельное сообщество для интерфейсов, брендинга, иллюстраций и разбора работ. Оно появится только после проверки спроса.',
                initialTopics: 'Разбор интерфейса; поиск дизайнера в команду; дневник редизайна; полезные инструменты.',
                supports: { create: [{ userId: friend.id }, { userId: owner.id }] },
            } });
    }
    const existingPoll = await prisma.communityPoll.findFirst({ where: { title: 'Нужен ли отдельный раздел для гайдов новичкам?' } });
    if (existingPoll) {
        await prisma.communityPoll.update({ where: { id: existingPoll.id }, data: { kind: PollKind.STRUCTURE, quorum: 2, minAccountAgeDays: 14, requireSubscription: true, allowAdvisory: true } });
    }
    else {
        await prisma.communityPoll.create({ data: {
                communityId: gta.id, createdById: owner.id, title: 'Нужен ли отдельный раздел для гайдов новичкам?',
                description: 'Проверяем, достаточно ли материалов и авторов, чтобы вынести гайды из общей ленты GTA RP.',
                kind: PollKind.STRUCTURE, quorum: 2, minAccountAgeDays: 14, requireSubscription: true, allowAdvisory: true,
                closesAt: new Date(Date.now() + 14 * 86400000),
                options: { create: [
                        { label: 'Да, раздел уже нужен', position: 0 },
                        { label: 'Пока оставить в общей ленте', position: 1 },
                        { label: 'Сначала собрать больше авторов', position: 2 },
                    ] },
            } });
    }
    const existingEvent = await prisma.communityEvent.findFirst({ where: { title: 'Открытая встреча закрытой альфы' } });
    const eventStartsAt = new Date(Date.now() + 7 * 86400000);
    const eventEndsAt = new Date(eventStartsAt.getTime() + 2 * 3600000);
    if (existingEvent) {
        await prisma.communityEvent.update({ where: { id: existingEvent.id }, data: { status: CommunityEventStatus.PUBLISHED, startsAt: eventStartsAt, endsAt: eventEndsAt } });
    }
    else {
        await prisma.communityEvent.create({ data: {
                communityId: start.id, createdById: owner.id, title: 'Открытая встреча закрытой альфы',
                description: 'Небольшая онлайн-встреча для проверки календаря, участия и переходов между событием и сообществом.',
                format: CommunityEventFormat.ONLINE, status: CommunityEventStatus.PUBLISHED,
                startsAt: eventStartsAt, endsAt: eventEndsAt, location: 'Онлайн внутри тестовой среды', capacity: 50,
            } });
    }
    const existingWorkshop = await prisma.workshopItem.findFirst({ where: { title: 'Значок первого участника' } });
    if (!existingWorkshop) {
        await prisma.workshopItem.create({ data: {
                authorId: friend.id, reviewedById: owner.id, type: WorkshopItemType.BADGE, status: WorkshopItemStatus.PUBLISHED,
                title: 'Значок первого участника', description: 'Спокойный коллекционный значок для людей, которые помогали тестировать FORRUM до публичного запуска.',
                resolutionNote: 'Опубликовано как демонстрационная работа закрытого теста.',
            } });
    }
    const ownerWallCount = await prisma.wallPost.count({ where: { profileUserId: owner.id } });
    if (!ownerWallCount) {
        await prisma.wallPost.createMany({ data: [
                { profileUserId: owner.id, authorId: owner.id, body: 'Продолжаем строить FORRUM. Главная цель — дать людям аудиторию, пространство для самовыражения, команду и возможность развивать свои проекты.' },
                { profileUserId: owner.id, authorId: friend.id, body: 'Проверяю стену профиля. Здесь должны появляться мысли, поздравления, достижения, подарки и важные обновления.' },
            ] });
    }
    await prisma.publicationReaction.upsert({
        where: { userId_publicationId: { userId: friend.id, publicationId: welcome.id } },
        update: { type: ReactionType.USEFUL }, create: { userId: friend.id, publicationId: welcome.id, type: ReactionType.USEFUL },
    });
    await prisma.bookmark.upsert({ where: { userId_publicationId: { userId: friend.id, publicationId: welcome.id } }, update: {}, create: { userId: friend.id, publicationId: welcome.id } });
    const earlyTester = await prisma.achievementDefinition.findUniqueOrThrow({ where: { code: 'EARLY_TESTER' } });
    await prisma.userAchievement.upsert({
        where: { userId_achievementId_scopeKey: { userId: friend.id, achievementId: earlyTester.id, scopeKey: 'global' } },
        update: {}, create: { userId: friend.id, achievementId: earlyTester.id, scopeKey: 'global', sourceType: 'closed-alpha' },
    });
    let testPortfolio = await prisma.portfolioItem.findFirst({ where: { ownerId: owner.id, title: 'Разработка закрытой альфы FORRUM' } });
    if (!testPortfolio)
        testPortfolio = await prisma.portfolioItem.create({ data: {
                ownerId: owner.id, communityId: projects.id, publicationId: welcome.id,
                kind: PortfolioItemKind.PROJECT, status: PortfolioItemStatus.ACTIVE,
                title: 'Разработка закрытой альфы FORRUM',
                summary: 'Публичный проект для проверки портфолио, команды и подтверждённых взаимодействий.',
                description: 'Демонстрационная карточка реального процесса разработки закрытой альфы. Она связана с постоянной темой, сообществом и подтверждённым взаимодействием.',
                lookingForTeam: true, contactNote: 'Связаться через личные сообщения FORRUM.', links: ['https://example.com/forrum-alpha'],
            } });
    let interaction = await prisma.confirmedInteraction.findFirst({ where: { createdById: owner.id, counterpartId: friend.id, title: 'Проверка сценария совместной работы' } });
    if (!interaction)
        interaction = await prisma.confirmedInteraction.create({ data: {
                createdById: owner.id, counterpartId: friend.id, communityId: start.id, publicationId: welcome.id, portfolioItemId: testPortfolio.id,
                type: InteractionType.PROJECT, status: InteractionStatus.COMPLETED,
                title: 'Проверка сценария совместной работы', description: 'Совместная проверка публикаций, ответов и пользовательских сценариев закрытой альфы.',
                creatorConfirmedAt: new Date(), counterpartConfirmedAt: new Date(), creatorCompletedAt: new Date(), counterpartCompletedAt: new Date(), completedAt: new Date(),
            } });
    await prisma.profileReview.upsert({
        where: { interactionId_authorId: { interactionId: interaction.id, authorId: owner.id } }, update: {},
        create: { interactionId: interaction.id, authorId: owner.id, targetId: friend.id, verdict: ReviewVerdict.POSITIVE, body: 'Внимательно прошёл тестовый сценарий и дал конкретную обратную связь по интерфейсу.' },
    });
}
main().finally(() => prisma.$disconnect());
//# sourceMappingURL=seed.js.map