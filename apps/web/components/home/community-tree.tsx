import Link from 'next/link';
import type { CSSProperties, MouseEvent } from 'react';
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
          <span
            className="forrum-home-v16__tree-folder"
            aria-hidden="true"
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
}: {
  tree: TreeNode[];
  expanded: Set<string>;
  onToggle: (slug: string) => void;
}) {
  return (
    <aside className="forrum-home-v16__tree">
      <div className="forrum-home-v16__side-head">
        <h2>Сообщества</h2>
      </div>
      {tree.length ? (
        <ul className="forrum-home-v16__tree-root">
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
      <Link
        className="forrum-home-v16__proposal"
        href="/communities/proposals"
      >
        <span aria-hidden="true">⊞</span> Предложить сообщество
      </Link>
    </aside>
  );
}
