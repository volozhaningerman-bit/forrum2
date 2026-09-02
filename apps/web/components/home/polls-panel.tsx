import Link from 'next/link';
import { CommunityMark } from '@/components/community-mark';
import { HomePanel } from './home-panel';
import type { PollItem } from './types';
import {
  communityVisual,
  formatCount,
  pollTimeLeft,
} from './utils';

function PollRow({ poll }: { poll: PollItem }) {
  const options = poll.options ?? [];
  const totalBinding = options.reduce(
    (sum, option) => sum + Math.max(0, option.bindingVotes),
    0,
  );
  const totalAdvisory = options.reduce(
    (sum, option) => sum + Math.max(0, option.advisoryVotes),
    0,
  );
  const outcomeTotal = totalBinding > 0 ? totalBinding : totalAdvisory;
  const totalVotes = totalBinding + totalAdvisory;

  return (
    <Link className="forrum-home-v16__poll" href="/events?tab=polls">
      <CommunityMark
        className="forrum-home-v16__poll-mark"
        name={poll.community.name}
        url={communityVisual(
          poll.community.slug,
          poll.community.avatarUrl,
        )}
        size={40}
      />
      <span className="forrum-home-v16__poll-copy">
        <strong>{poll.title}</strong>
        <small>
          Голосов: {formatCount(totalVotes)}
          {totalBinding > 0 && totalAdvisory > 0
            ? ` · решающих ${formatCount(totalBinding)}`
            : ''}
        </small>
      </span>
      <span className="forrum-home-v16__poll-options">
        {options.map((option) => {
          const votes =
            totalBinding > 0
              ? option.bindingVotes
              : option.advisoryVotes;
          const percent =
            outcomeTotal > 0
              ? Math.round((votes / outcomeTotal) * 100)
              : 0;

          return (
            <span
              className="forrum-home-v16__poll-option"
              key={option.id}
            >
              <span>{option.label}</span>
              <i aria-hidden="true">
                <b style={{ width: `${percent}%` }} />
              </i>
              <em>{formatCount(votes)}</em>
              <strong>{percent}%</strong>
            </span>
          );
        })}
      </span>
      <span className="forrum-home-v16__poll-time">
        Осталось: {pollTimeLeft(poll.closesAt)}
      </span>
    </Link>
  );
}

export function PollsPanel({ polls }: { polls: PollItem[] }) {
  if (!polls.length) return null;

  return (
    <HomePanel
      title="Активные голосования"
      href="/events?tab=polls"
    >
      <div className="forrum-home-v16__poll-list">
        {polls.map((poll) => (
          <PollRow key={poll.id} poll={poll} />
        ))}
      </div>
    </HomePanel>
  );
}
