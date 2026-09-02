'use client';

import { useEffect, useMemo, useState } from 'react';
import type { PublicationCardData } from '@/lib/types';
import { api } from '@/lib/api';
import { CommunityTree } from './home/community-tree';
import { ActivityPanel } from './home/activity-panel';
import {
  MediaPanel,
  ServicesPanel,
} from './home/discovery-panels';
import { ForrumNewsPanel } from './home/forrum-news-panel';
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
  const [activityFeed, setActivityFeed] = useState(
    initialData.activityFeed ?? [],
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
        activityResult,
      ] = await Promise.allSettled([
        api<HomeMediaPartner[]>('/media/partners'),
        api<PublicationCardData[]>('/news'),
        api<PublicationCardData[]>('/announcements'),
        api<HomeService[]>('/portfolio?kind=SERVICE'),
        api<PublicationCardData[]>('/feed?mode=all'),
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

      if (activityResult.status === 'fulfilled') {
        setActivityFeed(activityResult.value);
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
  const weekly = initialData.overview?.weekly ?? {
    likes: [],
    activity: [],
  };

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
      className="forrum-home-v16 forrum-home-v19 forrum-home-v191 forrum-home-v20"
      data-home-reference="v20"
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
        <PopularTopicsPanel items={discussedPool} />
        <PollsPanel polls={activePolls} />
      </main>

      <aside className="forrum-home-v16__rail">
        <ActivityPanel publications={activityFeed} />
        <WeeklyMembersPanel weekly={weekly} />
        <ForrumNewsPanel announcements={announcements} />
      </aside>
    </div>
  );
}
