'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import type { PublicationCardData } from '@/lib/types';
import { api } from '@/lib/api';
import { CommunityTree } from './home/community-tree';
import {
  MediaPanel,
  ServicesPanel,
} from './home/discovery-panels';
import { ForrumNewsPanel } from './home/forrum-news-panel';
import { ForumStatsPanel } from './home/forum-stats-panel';
import { homeDemoWeekly } from './home/home-demo-content';
import {
  mergePopularTopics,
  selectMediaItems,
} from './home/model';
import { PollsPanel } from './home/polls-panel';
import { PopularTopicsPanel } from './home/popular-topics-panel';
import type {
  HomeInitialData,
  HomeMediaPartner,
  HomeService,
} from './home/types';
import { buildTree } from './home/utils';
import { WeeklyMembersPanel } from './home/weekly-members-panel';

export type { HomeInitialData } from './home/types';

export function HomeDashboard({
  initialData,
}: {
  initialData: HomeInitialData;
}) {
  const communities = initialData.communities ?? [];
  const tree = useMemo(
    () => buildTree(communities),
    [communities],
  );
  const parentSlugs = useMemo(
    () =>
      communities
        .filter((item) =>
          communities.some(
            (candidate) =>
              candidate.parent?.slug === item.slug,
          ),
        )
        .map((item) => item.slug),
    [communities],
  );
  const [expanded, setExpanded] = useState<Set<string>>(
    () => new Set(parentSlugs),
  );
  const [treeFullyVisible, setTreeFullyVisible] = useState(false);
  const [mediaPartners, setMediaPartners] = useState(
    initialData.mediaPartners ?? [],
  );
  const [mediaMaterials, setMediaMaterials] = useState(
    initialData.mediaMaterials ?? [],
  );
  const [services, setServices] = useState(
    initialData.services ?? [],
  );
  const [discoveryLoaded, setDiscoveryLoaded] = useState(
    initialData.mediaPartners !== undefined &&
      initialData.mediaMaterials !== undefined &&
      initialData.services !== undefined,
  );

  useEffect(() => {
    let active = true;

    const loadDiscovery = async () => {
      const [
        partnersResult,
        newsResult,
        announcementsResult,
        servicesResult,
      ] = await Promise.allSettled([
        api<HomeMediaPartner[]>('/media/partners'),
        api<PublicationCardData[]>('/news'),
        api<PublicationCardData[]>('/announcements'),
        api<HomeService[]>('/portfolio?kind=SERVICE'),
      ]);

      if (!active) return;

      if (partnersResult.status === 'fulfilled') {
        setMediaPartners(partnersResult.value);
      }

      if (
        newsResult.status === 'fulfilled' ||
        announcementsResult.status === 'fulfilled'
      ) {
        const materials = new Map<string, PublicationCardData>();
        const news =
          newsResult.status === 'fulfilled'
            ? newsResult.value
            : [];
        const announcements =
          announcementsResult.status === 'fulfilled'
            ? announcementsResult.value
            : [];
        for (const item of [...news, ...announcements]) {
          materials.set(item.id, item);
        }
        setMediaMaterials([...materials.values()]);
      }

      if (servicesResult.status === 'fulfilled') {
        setServices(servicesResult.value);
      }

      setDiscoveryLoaded(true);
    };

    void loadDiscovery();
    const refresh = window.setInterval(() => {
      if (document.visibilityState === 'visible') {
        void loadDiscovery();
      }
    }, 60_000);

    return () => {
      active = false;
      window.clearInterval(refresh);
    };
  }, []);

  const popularFeed = useMemo(
    () =>
      (initialData.feed ?? []).filter(
        (item) => item.format === 'TOPIC',
      ),
    [initialData.feed],
  );
  const discussedPool = useMemo(
    () =>
      mergePopularTopics(
        popularFeed,
        initialData.overview?.discussed ?? [],
      ),
    [initialData.overview?.discussed, popularFeed],
  );
  const mediaItems = useMemo(
    () => selectMediaItems(mediaMaterials, mediaPartners),
    [mediaMaterials, mediaPartners],
  );
  const activePolls = useMemo(() => {
    const now = Date.now();
    const merged = [
      ...(initialData.overview?.activePolls ?? []),
      ...(initialData.polls ?? []),
    ];
    const unique = new Map(
      merged
        .filter(
          (poll) =>
            poll.status.toUpperCase() === 'OPEN' &&
            new Date(poll.closesAt).getTime() > now,
        )
        .map((poll) => [poll.id, poll]),
    );

    return [...unique.values()]
      .sort(
        (left, right) =>
          new Date(left.closesAt).getTime() -
          new Date(right.closesAt).getTime(),
      )
      .slice(0, 3);
  }, [initialData.overview?.activePolls, initialData.polls]);
  const announcements = initialData.announcements ?? [];
  const realWeekly = initialData.overview?.weekly ?? {
    likes: [],
    activity: [],
  };
  const useDemoWeekly =
    realWeekly.likes.length === 0 && realWeekly.activity.length === 0;
  const weekly = useDemoWeekly ? homeDemoWeekly : realWeekly;

  const toggleTree = (slug: string) => {
    setExpanded((current) => {
      const next = new Set(current);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });
  };

  return (
    <div
      className="forrum-home-v16 forrum-home-v19 forrum-home-v191 forrum-home-v20 forrum-home-v21 forrum-home-v22 forrum-home-v23"
      data-home-reference="v23"
    >
      <CommunityTree
        tree={tree}
        expanded={expanded}
        onToggle={toggleTree}
        fullyVisible={treeFullyVisible}
        onToggleVisibility={() =>
          setTreeFullyVisible((current) => !current)
        }
      />

      <main className="forrum-home-v16__center">
        <div className="forrum-home-v18__discovery-grid">
          <MediaPanel
            items={mediaItems}
            loaded={discoveryLoaded}
          />
          <ServicesPanel
            services={services}
            loaded={discoveryLoaded}
          />
        </div>
        <section
          className="forrum-home-v22__composer"
          aria-label="Создать публикацию"
        >
          <Link
            className="forrum-home-v22__composer-prompt"
            href="/create?format=POST"
          >
            <span aria-hidden="true">＋</span>
            <strong>Поделитесь мыслью или задайте вопрос…</strong>
          </Link>
          <div className="forrum-home-v22__composer-actions">
            <Link href="/create?format=POST">Запись</Link>
            <Link href="/create?format=TOPIC">Тема</Link>
            <small>
              После публикации — отправьте в подключённый Telegram-канал
            </small>
          </div>
        </section>
        <PopularTopicsPanel items={discussedPool} />
        <PollsPanel polls={activePolls} />
      </main>

      <aside className="forrum-home-v16__rail">
        <WeeklyMembersPanel weekly={weekly} demo={useDemoWeekly} />
        <ForrumNewsPanel announcements={announcements} />
        <ForumStatsPanel stats={initialData.overview?.stats} />
      </aside>
    </div>
  );
}
