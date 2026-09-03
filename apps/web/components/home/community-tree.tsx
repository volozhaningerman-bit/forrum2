import Link from 'next/link';
import type { CSSProperties, MouseEvent } from 'react';
import { CommunityMark } from '@/components/community-mark';
import type { TreeNode } from './types';
import { communityDisplayName } from './utils';

function TreeBranch({
  node,
  depth,
  expanded,
  onToggle,
}: {
  node: TreeNode;
  depth: number;
  expanded: Set<string>;
  onToggle: (slug: string) => void;
}) {
  const hasChildren = node.children.length > 0;
  const isOpen = expanded.has(node.slug);

  const onRowClick = (event: MouseEvent<HTMLDivElement>) => {
    if (!hasChildren || event.target !== event.currentTarget) return;
    onToggle(node.slug);
  };

  return (
    <li
      className="forrum-home-v16__tree-node"
      style={{ '--tree-depth': depth } as CSSProperties}
    >
      <div
        className="forrum-home-v16__tree-row"
        data-expandable={hasChildren ? 'true' : undefined}
        onClick={onRowClick}
      >
        {hasChildren ? (
          <button
            className="forrum-home-v16__tree-toggle"
            type="button"
            aria-expanded={isOpen}
            aria-label={
              isOpen
                ? `Свернуть ${communityDisplayName(node.name)}`
                : `Развернуть ${communityDisplayName(node.name)}`
            }
            onClick={() => onToggle(node.slug)}
          >
            <span aria-hidden="true">{isOpen ? '−' : '+'}</span>
          </button>
        ) : (
          <span
            className="forrum-home-v16__tree-spacer"
            aria-hidden="true"
          />
        )}
        <Link
          className="forrum-home-v16__tree-link"
          href={`/communities/${node.slug}`}
          aria-label={`Открыть сообщество ${communityDisplayName(node.name)}`}
        >
          <CommunityMark
            className="forrum-home-v22__community-mark"
            name={communityDisplayName(node.name)}
            url={node.avatarUrl}
            size={depth === 0 ? 24 : 20}
          />
          <span className="forrum-home-v16__tree-name">
            {communityDisplayName(node.name)}
          </span>
        </Link>
      </div>
      {hasChildren && isOpen && (
        <ul className="forrum-home-v16__tree-children">
          {node.children.map((child) => (
            <TreeBranch
              key={child.id}
              node={child}
              depth={depth + 1}
              expanded={expanded}
              onToggle={onToggle}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

export function CommunityTree({
  tree,
  expanded,
  onToggle,
  fullyVisible,
  onToggleVisibility,
}: {
  tree: TreeNode[];
  expanded: Set<string>;
  onToggle: (slug: string) => void;
  fullyVisible: boolean;
  onToggleVisibility: () => void;
}) {
  return (
    <aside
      className={`forrum-home-v16__tree ${
        fullyVisible ? 'is-fully-visible' : ''
      }`.trim()}
    >
      <div className="forrum-home-v16__side-head">
        <h2>Сообщества</h2>
        <span className="forrum-home-v20__tree-meta">
          ваши сообщества
        </span>
      </div>
      {tree.length ? (
        <ul
          className="forrum-home-v16__tree-root"
          id="home-community-tree"
        >
          {tree.map((node) => (
            <TreeBranch
              key={node.id}
              node={node}
              depth={0}
              expanded={expanded}
              onToggle={onToggle}
            />
          ))}
        </ul>
      ) : (
        <p className="forrum-home-v16__empty">
          Сообщества появятся после загрузки данных.
        </p>
      )}
      {tree.length > 0 && (
        <button
          className="forrum-home-v20__tree-visibility"
          type="button"
          aria-controls="home-community-tree"
          aria-expanded={fullyVisible}
          onClick={onToggleVisibility}
        >
          {fullyVisible
            ? 'Свернуть структуру'
            : 'Показать всю структуру'}
          <span aria-hidden="true">{fullyVisible ? '↑' : '↓'}</span>
        </button>
      )}
      <Link
        className="forrum-home-v16__proposal"
        href="/communities/proposals"
      >
        <span aria-hidden="true">⊞</span> Предложить сообщество
      </Link>
    </aside>
  );
}
