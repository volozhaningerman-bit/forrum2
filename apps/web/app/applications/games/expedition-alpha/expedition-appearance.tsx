'use client';

export type ExpeditionAppearanceBody = 'male' | 'female';

export type ExpeditionAppearanceItem = {
  slot: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic';
  visual: string;
  appearanceId: string;
};

type Theme = {
  primary: string;
  secondary: string;
  edge: string;
  accent: string;
  glow: string;
};

const themes: Record<ExpeditionAppearanceItem['rarity'], Theme> = {
  common: {
    primary: '#6e4a32',
    secondary: '#3c2b22',
    edge: '#b47a48',
    accent: '#d29a57',
    glow: 'rgba(210,154,87,.28)',
  },
  uncommon: {
    primary: '#73553b',
    secondary: '#3a2e25',
    edge: '#a77d4f',
    accent: '#d0a45e',
    glow: 'rgba(180,138,81,.28)',
  },
  rare: {
    primary: '#52636b',
    secondary: '#2d3a40',
    edge: '#8499a2',
    accent: '#69c7df',
    glow: 'rgba(83,165,196,.30)',
  },
  epic: {
    primary: '#594c59',
    secondary: '#302a35',
    edge: '#9d7faa',
    accent: '#e59455',
    glow: 'rgba(164,110,190,.30)',
  },
};

const familyByVisual: Record<string, string> = {
  hood: 'head.hood',
  helm: 'head.helmet',
  'consul-mask': 'head.mask',
  neck: 'torso.pendant',
  'neck-eye': 'effect.eye',
  shoulders: 'torso.shoulders',
  cloak: 'cloak.road',
  'cloak-blue': 'cloak.banner',
  chest: 'torso.light',
  'chest-guard': 'torso.guard',
  'chest-epic': 'torso.heavy',
  wrists: 'arms.bracers',
  gloves: 'arms.gloves',
  belt: 'torso.belt',
  legs: 'legs.trousers',
  boots: 'feet.boots',
  ring: 'effect.warm',
  'ring-blue': 'effect.blue',
  relic: 'effect.relic',
  'relic-epic': 'effect.epic',
  sword: 'weapon.sword',
  spear: 'weapon.spear',
  'sword-blue': 'weapon.blade',
  hammer: 'weapon.hammer',
  shield: 'offhand.shield',
};

const defaultFamilyBySlot: Record<string, string> = {
  head: 'head.hood',
  neck: 'torso.pendant',
  shoulders: 'torso.shoulders',
  cloak: 'cloak.road',
  chest: 'torso.light',
  wrists: 'arms.bracers',
  gloves: 'arms.gloves',
  belt: 'torso.belt',
  legs: 'legs.trousers',
  feet: 'feet.boots',
  ring1: 'effect.warm',
  ring2: 'effect.blue',
  relic1: 'effect.relic',
  relic2: 'effect.epic',
  mainHand: 'weapon.sword',
  offHand: 'offhand.shield',
};

export function expeditionAppearanceId(slot: string, visual: string) {
  return familyByVisual[visual] ?? defaultFamilyBySlot[slot] ?? 'effect.relic';
}

function itemBySlot(items: ExpeditionAppearanceItem[], slot: string) {
  return items.find((item) => item.slot === slot);
}

function firstItem(items: Array<ExpeditionAppearanceItem | undefined>) {
  return items.find(Boolean) as ExpeditionAppearanceItem | undefined;
}

function themeOf(item?: ExpeditionAppearanceItem) {
  return themes[item?.rarity ?? 'common'];
}

function HeadChannel({ item }: { item?: ExpeditionAppearanceItem }) {
  if (!item) return null;
  const theme = themeOf(item);
  const family = item.appearanceId;

  if (family === 'head.helmet') {
    return (
      <g data-channel="head">
        <path d="M400 315 Q404 180 512 145 Q620 180 624 315 L590 347 L574 289 Q512 250 450 289 L434 347 Z"
          fill={theme.secondary} stroke={theme.edge} strokeWidth="18" />
        <path d="M414 245 Q512 165 610 245" fill="none" stroke={theme.primary} strokeWidth="46" strokeLinecap="round" />
        <path d="M445 300 H579" stroke={theme.accent} strokeWidth="12" strokeLinecap="round" opacity=".7" />
      </g>
    );
  }

  if (family === 'head.mask') {
    return (
      <g data-channel="head">
        <path d="M438 250 Q512 204 586 250 L575 337 Q512 380 449 337 Z"
          fill={theme.secondary} stroke={theme.edge} strokeWidth="16" />
        <path d="M468 286 H496 M528 286 H556" stroke={theme.accent} strokeWidth="14" strokeLinecap="round" />
        <path d="M512 312 L512 348" stroke={theme.edge} strokeWidth="10" />
      </g>
    );
  }

  return (
    <g data-channel="head">
      <path d="M414 337 Q384 260 412 204 Q449 138 512 137 Q575 138 612 204 Q640 260 610 337"
        fill="none" stroke={theme.secondary} strokeWidth="62" strokeLinecap="round" />
      <path d="M421 322 Q405 248 430 205 Q465 163 512 162 Q559 163 594 205 Q619 248 603 322"
        fill="none" stroke={theme.edge} strokeWidth="12" strokeLinecap="round" opacity=".78" />
    </g>
  );
}

function CloakChannel({ item }: { item?: ExpeditionAppearanceItem }) {
  if (!item) return null;
  const theme = themeOf(item);
  return (
    <g data-channel="cloak" opacity=".9">
      <path d="M383 430 Q342 500 330 620 L305 1045 L357 1012 L390 1050 L421 690 L424 447 Z"
        fill={theme.secondary} fillOpacity=".82" stroke={theme.edge} strokeWidth="12" />
      <path d="M641 430 Q682 500 694 620 L719 1045 L667 1012 L634 1050 L603 690 L600 447 Z"
        fill={theme.secondary} fillOpacity=".82" stroke={theme.edge} strokeWidth="12" />
      <path d="M403 459 Q512 493 621 459" fill="none" stroke={theme.accent} strokeWidth="12" opacity=".44" />
    </g>
  );
}

function TorsoChannel({
  chest,
  shoulders,
  belt,
  neck,
}: {
  chest?: ExpeditionAppearanceItem;
  shoulders?: ExpeditionAppearanceItem;
  belt?: ExpeditionAppearanceItem;
  neck?: ExpeditionAppearanceItem;
}) {
  const source = firstItem([chest, shoulders, belt, neck]);
  if (!source) return null;
  const theme = themeOf(source);
  const family = chest?.appearanceId ?? '';

  return (
    <g data-channel="torso">
      {chest ? (
        family === 'torso.heavy' ? (
          <>
            <path d="M421 457 Q512 414 603 457 L588 695 Q512 725 436 695 Z"
              fill={theme.secondary} fillOpacity=".88" stroke={theme.edge} strokeWidth="14" />
            <path d="M453 480 Q512 451 571 480 L562 628 Q512 654 462 628 Z"
              fill={theme.primary} stroke={theme.edge} strokeWidth="9" />
            <path d="M512 452 V675" stroke={theme.accent} strokeWidth="8" opacity=".42" />
          </>
        ) : family === 'torso.guard' ? (
          <>
            <path d="M433 471 Q512 435 591 471 L580 662 Q512 691 444 662 Z"
              fill={theme.primary} fillOpacity=".86" stroke={theme.edge} strokeWidth="12" />
            <path d="M457 508 H567 M452 563 H572 M450 616 H574"
              fill="none" stroke={theme.secondary} strokeWidth="15" opacity=".72" />
          </>
        ) : (
          <>
            <path d="M423 474 L485 515 L461 691" fill="none" stroke={theme.primary} strokeWidth="24" strokeLinecap="round" />
            <path d="M601 474 L539 515 L563 691" fill="none" stroke={theme.primary} strokeWidth="24" strokeLinecap="round" />
            <path d="M485 515 H539" stroke={theme.accent} strokeWidth="11" strokeLinecap="round" opacity=".56" />
          </>
        )
      ) : null}

      {shoulders ? (
        <>
          <path d="M362 468 Q399 428 445 442 L435 496 Q393 509 354 490 Z"
            fill={theme.secondary} fillOpacity=".9" stroke={theme.edge} strokeWidth="11" />
          <path d="M662 468 Q625 428 579 442 L589 496 Q631 509 670 490 Z"
            fill={theme.secondary} fillOpacity=".9" stroke={theme.edge} strokeWidth="11" />
        </>
      ) : null}

      {belt ? (
        <>
          <path d="M414 753 Q512 770 610 753" fill="none" stroke={theme.secondary} strokeWidth="30" strokeLinecap="round" />
          <rect x="484" y="741" width="56" height="50" rx="8" fill={theme.accent} stroke={theme.edge} strokeWidth="8" />
          <rect x="498" y="754" width="28" height="24" rx="4" fill={theme.secondary} />
        </>
      ) : null}

      {neck ? (
        <>
          <path d="M457 410 Q512 435 567 410" fill="none" stroke={theme.edge} strokeWidth="10" strokeLinecap="round" />
          <circle cx="512" cy="448" r="15" fill={theme.accent} stroke={theme.secondary} strokeWidth="7" />
        </>
      ) : null}
    </g>
  );
}

function ArmsChannel({
  wrists,
  gloves,
}: {
  wrists?: ExpeditionAppearanceItem;
  gloves?: ExpeditionAppearanceItem;
}) {
  const source = gloves ?? wrists;
  if (!source) return null;
  const theme = themeOf(source);
  return (
    <g data-channel="arms">
      {wrists ? (
        <>
          <path d="M316 690 L347 702 L333 770 L300 760 Z" fill={theme.primary} fillOpacity=".9" stroke={theme.edge} strokeWidth="9" />
          <path d="M708 690 L677 702 L691 770 L724 760 Z" fill={theme.primary} fillOpacity=".9" stroke={theme.edge} strokeWidth="9" />
        </>
      ) : null}
      {gloves ? (
        <>
          <path d="M297 773 Q324 760 345 785 L337 844 Q311 862 287 839 Z" fill={theme.secondary} stroke={theme.edge} strokeWidth="9" />
          <path d="M727 773 Q700 760 679 785 L687 844 Q713 862 737 839 Z" fill={theme.secondary} stroke={theme.edge} strokeWidth="9" />
        </>
      ) : null}
    </g>
  );
}

function LegsChannel({ item }: { item?: ExpeditionAppearanceItem }) {
  if (!item) return null;
  const theme = themeOf(item);
  return (
    <g data-channel="legs">
      <path d="M411 925 Q448 942 484 931 L476 1010 Q443 1027 405 1014 Z"
        fill={theme.secondary} fillOpacity=".82" stroke={theme.edge} strokeWidth="10" />
      <path d="M613 925 Q576 942 540 931 L548 1010 Q581 1027 619 1014 Z"
        fill={theme.secondary} fillOpacity=".82" stroke={theme.edge} strokeWidth="10" />
      <path d="M421 1048 L480 1063 M603 1048 L544 1063" stroke={theme.accent} strokeWidth="9" opacity=".48" />
      <path d="M418 1092 L477 1107 M606 1092 L547 1107" stroke={theme.edge} strokeWidth="8" opacity=".7" />
    </g>
  );
}

function FeetChannel({ item }: { item?: ExpeditionAppearanceItem }) {
  if (!item) return null;
  const theme = themeOf(item);
  return (
    <g data-channel="feet">
      <path d="M389 1160 H480 L473 1303 Q434 1330 382 1313 L383 1252 Z"
        fill={theme.secondary} fillOpacity=".9" stroke={theme.edge} strokeWidth="11" />
      <path d="M635 1160 H544 L551 1303 Q590 1330 642 1313 L641 1252 Z"
        fill={theme.secondary} fillOpacity=".9" stroke={theme.edge} strokeWidth="11" />
      <path d="M395 1201 H477 M547 1201 H629" stroke={theme.accent} strokeWidth="9" opacity=".48" />
    </g>
  );
}

function MainHandChannel({ item }: { item?: ExpeditionAppearanceItem }) {
  if (!item) return null;
  const theme = themeOf(item);
  const family = item.appearanceId;

  if (family === 'weapon.spear') {
    return (
      <g data-channel="mainHand">
        <path d="M744 465 L653 1300" stroke={theme.secondary} strokeWidth="24" strokeLinecap="round" />
        <path d="M760 334 L802 478 L730 445 Z" fill={theme.edge} stroke={theme.secondary} strokeWidth="10" />
        <path d="M750 383 L773 447" stroke={theme.accent} strokeWidth="10" />
      </g>
    );
  }

  if (family === 'weapon.hammer') {
    return (
      <g data-channel="mainHand">
        <path d="M707 626 L649 1270" stroke={theme.secondary} strokeWidth="30" strokeLinecap="round" />
        <path d="M633 500 H826 V637 H633 Z" fill={theme.primary} stroke={theme.edge} strokeWidth="17" />
        <circle cx="730" cy="568" r="34" fill={theme.accent} opacity=".85" />
      </g>
    );
  }

  return (
    <g data-channel="mainHand">
      <path d="M690 708 L659 1224" stroke={theme.secondary} strokeWidth="28" strokeLinecap="round" />
      <path d="M707 515 L733 550 L681 1040 L649 1073 L653 1010 Z"
        fill={family === 'weapon.blade' ? theme.accent : '#d8e4e8'} stroke={theme.edge} strokeWidth="11" />
      <path d="M648 1035 L724 1058" stroke={theme.edge} strokeWidth="24" strokeLinecap="round" />
    </g>
  );
}

function OffHandChannel({ item }: { item?: ExpeditionAppearanceItem }) {
  if (!item) return null;
  const theme = themeOf(item);
  return (
    <g data-channel="offHand">
      <path d="M235 690 Q304 714 324 770 L307 956 Q278 1014 232 1046 Q186 1014 157 956 L140 770 Q160 714 235 690 Z"
        fill={theme.secondary} fillOpacity=".88" stroke={theme.edge} strokeWidth="13" />
      <path d="M235 742 Q279 757 291 792 L279 925 Q261 958 235 978 Q209 958 191 925 L179 792 Q191 757 235 742 Z"
        fill={theme.primary} stroke={theme.edge} strokeWidth="8" />
      <circle cx="235" cy="857" r="27" fill={theme.accent} opacity=".65" />
    </g>
  );
}

function EffectChannel({ items }: { items: ExpeditionAppearanceItem[] }) {
  const effects = items.filter((item) =>
    item.slot === 'ring1' || item.slot === 'ring2' || item.slot === 'relic1' || item.slot === 'relic2' || item.visual === 'neck-eye',
  );
  if (!effects.length) return null;
  const strongest = [...effects].sort((a, b) => ['common','uncommon','rare','epic'].indexOf(b.rarity) - ['common','uncommon','rare','epic'].indexOf(a.rarity))[0];
  const theme = themeOf(strongest);
  const intensity = Math.min(.42, .12 + effects.length * .07);

  return (
    <g data-channel="effect" pointerEvents="none">
      <ellipse cx="512" cy="1398" rx="225" ry="48" fill={theme.glow} opacity={intensity + .18} />
      <circle cx="512" cy="615" r="31" fill={theme.accent} opacity={intensity + .18} />
      <circle cx="512" cy="615" r="58" fill="none" stroke={theme.accent} strokeWidth="9" opacity={intensity} />
      {effects.length > 2 ? (
        <path d="M360 1035 Q512 1115 664 1035" fill="none" stroke={theme.accent} strokeWidth="10" opacity={intensity} strokeDasharray="18 24" />
      ) : null}
    </g>
  );
}

export function ExpeditionAppearanceCompositor({
  items,
  body,
  className = '',
}: {
  items: ExpeditionAppearanceItem[];
  body: ExpeditionAppearanceBody;
  className?: string;
}) {
  if (body === 'female' || items.length === 0) return null;

  const head = itemBySlot(items, 'head');
  const neck = itemBySlot(items, 'neck');
  const shoulders = itemBySlot(items, 'shoulders');
  const cloak = itemBySlot(items, 'cloak');
  const chest = itemBySlot(items, 'chest');
  const wrists = itemBySlot(items, 'wrists');
  const gloves = itemBySlot(items, 'gloves');
  const belt = itemBySlot(items, 'belt');
  const legs = itemBySlot(items, 'legs');
  const feet = itemBySlot(items, 'feet');
  const mainHand = itemBySlot(items, 'mainHand');
  const offHand = itemBySlot(items, 'offHand');

  const activeChannels = [
    head,
    firstItem([neck, shoulders, chest, belt]),
    firstItem([wrists, gloves]),
    cloak,
    legs,
    feet,
    mainHand,
    offHand,
    firstItem(items.filter((item) => item.slot.startsWith('ring') || item.slot.startsWith('relic') || item.visual === 'neck-eye')),
  ].filter(Boolean).length;

  return (
    <svg
      className={`exp-appearance-compositor ${className}`}
      viewBox="0 0 1024 1536"
      preserveAspectRatio="xMidYMax meet"
      aria-hidden="true"
      data-active-channels={activeChannels}
    >
      <CloakChannel item={cloak} />
      <LegsChannel item={legs} />
      <FeetChannel item={feet} />
      <TorsoChannel chest={chest} shoulders={shoulders} belt={belt} neck={neck} />
      <ArmsChannel wrists={wrists} gloves={gloves} />
      <HeadChannel item={head} />
      <OffHandChannel item={offHand} />
      <MainHandChannel item={mainHand} />
      <EffectChannel items={items} />
    </svg>
  );
}
