import fs from 'node:fs';

function read(path) {
  return fs.readFileSync(path, 'utf8');
}

function requireText(source, text, label) {
  if (!source.includes(text)) {
    throw new Error(`${label}: missing ${text}`);
  }
}

function forbidText(source, text, label) {
  if (source.includes(text)) {
    throw new Error(`${label}: forbidden ${text}`);
  }
}

function requireOrder(source, first, second, label) {
  const firstIndex = source.indexOf(first);
  const secondIndex = source.indexOf(second);
  if (firstIndex < 0 || secondIndex < 0 || firstIndex >= secondIndex) {
    throw new Error(`${label}: expected ${first} before ${second}`);
  }
}

const home = read('apps/web/components/home-dashboard.tsx');
const css = read('apps/web/app/globals.css');

requireText(css, 'FORRUM_CANONICAL_INTERFACE_V8', 'canonical baseline');
requireText(css, 'FORRUM_HOME_STAGE_1_V9', 'stage marker');
requireText(home, 'className="visually-hidden">Главная</h1>', 'accessible page heading');
forbidText(home, 'home-commandbar', 'standalone Main panel');
requireText(home, 'home-feed-toolbar', 'discussion toolbar');
requireText(home, 'home-create-topic', 'create topic action');
requireOrder(home, 'home-feed-toolbar', 'home-create-topic', 'create action placement');

requireText(home, "{ key: 'unanswered', label: 'Без ответа' }", 'unanswered tab');
requireText(home, 'home-filter-button', 'feed filters');
requireText(home, 'home-tab-count', 'new-content count');

requireText(home, 'home-workshop-entry', 'Workshop first section');
requireText(home, 'home-tree-separator', 'Workshop separator');
requireText(home, 'home-tree-hitarea', 'empty-area expansion');
requireText(home, 'home-tree-toggle', 'arrow expansion');
requireText(home, 'home-tree-new-count', 'tree new-content counter');
requireText(home, "aria-current={active ? 'page' : undefined}", 'active category semantics');
requireText(home, "open ? 'opened' : 'closed'", 'expanded category state');

requireText(home, 'home-topic-unread-dot', 'unread topic state');
requireText(home, 'home-topic-status pinned', 'pinned topic state');
requireText(home, 'home-topic-status hot', 'hot topic state');
requireText(home, 'home-topic-status answered', 'answered question state');
requireText(home, 'home-topic-actions', 'hover topic actions');
requireText(home, 'home-topic-more-menu', 'topic action menu');
requireText(home, 'home-topic-type-mark', 'topic fallback type mark');
requireOrder(home, '<p>{item.excerpt}</p>', 'home-topic-hashtags', 'hashtags at bottom');

requireText(home, 'CurrentTypeIcon', 'semantic current-item icons');
requireText(home, "kindKey: 'event' as const", 'event current type');
requireText(home, "kindKey: 'poll' as const", 'poll current type');
requireText(home, "kindKey: 'notice' as const", 'notice current type');
requireText(home, 'deadlineState', 'current urgency states');
requireText(home, 'home-secondary-panel', 'secondary lower blocks');

for (let tone = 0; tone < 10; tone += 1) {
  requireText(css, `--nick-${tone}:`, `nickname palette ${tone}`);
  requireText(css, `[data-user-tone="${tone}"]`, `nickname tone rule ${tone}`);
}
requireText(css, '--nick-owner:', 'owner nickname style');
requireText(css, '--nick-curator:', 'curator nickname style');
requireText(css, '.home-stage-one .home-topic-hashtags a', 'quiet hashtags');
requireText(css, '.home-stage-one .home-create-topic', 'mobile create action');
requireText(css, 'position: fixed;', 'mobile floating creation');
requireText(css, '.home-stage-one .home-topic-row:hover', 'topic hover');
requireText(css, '.home-stage-one .home-tree-row.active::before', 'active tree marker');

console.log('FORRUM Home Stage 1 V9 contract passed.');
