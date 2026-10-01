'use client';

export type ExpeditionAppearanceBody = 'male' | 'female';

export type ExpeditionAppearanceItem = {
  slot: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'legendary' | 'relic';
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
    primary: '#615d58',
    secondary: '#393a3b',
    edge: '#899198',
    accent: '#b6bdc2',
    glow: 'rgba(166,176,184,.18)',
  },
  uncommon: {
    primary: '#5d5b52',
    secondary: '#383a33',
    edge: '#55b875',
    accent: '#7bdd96',
    glow: 'rgba(85,184,117,.24)',
  },
  rare: {
    primary: '#5b5660',
    secondary: '#36313c',
    edge: '#9a69c7',
    accent: '#c88bff',
    glow: 'rgba(174,104,226,.27)',
  },
  legendary: {
    primary: '#625b4d',
    secondary: '#3e3628',
    edge: '#d0a33c',
    accent: '#ffd96b',
    glow: 'rgba(224,174,67,.30)',
  },
  relic: {
    primary: '#5b5a61',
    secondary: '#31323b',
    edge: '#7cecff',
    accent: '#ff88d7',
    glow: 'rgba(124,236,255,.34)',
  },
};

const rarityOrder: Record<ExpeditionAppearanceItem['rarity'], number> = {
  common: 0,
  uncommon: 1,
  rare: 2,
  legendary: 3,
  relic: 4,
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
  'relic-prismatic': 'effect.prismatic',
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
      <g data-channel="head" data-rarity={item.rarity}>
        <path d="M423 302 Q425 218 468 180 Q512 148 556 180 Q599 218 601 302"
          fill="none" stroke={theme.secondary} strokeWidth="32" strokeLinecap="round" opacity=".76" />
        <path d="M447 298 Q512 259 577 298" fill="none" stroke={theme.edge} strokeWidth="8" strokeLinecap="round" />
        <path d="M470 279 H493 M531 279 H554" stroke={theme.accent} strokeWidth="7" strokeLinecap="round" opacity=".65" />
      </g>
    );
  }

  if (family === 'head.mask') {
    return (
      <g data-channel="head" data-rarity={item.rarity}>
        <path d="M456 257 Q512 223 568 257 L559 329 Q512 355 465 329 Z"
          fill={theme.secondary} fillOpacity=".72" stroke={theme.edge} strokeWidth="8" />
        <path d="M478 284 H496 M528 284 H546" stroke={theme.accent} strokeWidth="8" strokeLinecap="round" />
      </g>
    );
  }

  return (
    <g data-channel="head" data-rarity={item.rarity}>
      <path d="M432 331 Q410 278 430 226 Q444 191 478 169 M546 169 Q580 191 594 226 Q614 278 592 331"
        fill="none" stroke={theme.secondary} strokeWidth="24" strokeLinecap="round" opacity=".72" />
      <path d="M440 319 Q424 273 443 231 Q456 201 482 184 M542 184 Q568 201 581 231 Q600 273 584 319"
        fill="none" stroke={theme.edge} strokeWidth="6" strokeLinecap="round" opacity=".84" />
      <path d="M447 328 Q512 347 577 328" fill="none" stroke={theme.accent} strokeWidth="5" strokeLinecap="round" opacity=".5" />
    </g>
  );
}

function CloakChannel({ item }: { item?: ExpeditionAppearanceItem }) {
  if (!item) return null;
  const theme = themeOf(item);
  return (
    <g data-channel="cloak" data-rarity={item.rarity} opacity=".9">
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
    <g data-channel="torso" data-rarity={source.rarity}>
      {chest ? (
        family === 'torso.heavy' ? (
          <>
            <path d="M430 470 Q512 434 594 470 L583 667 Q512 693 441 667 Z"
              fill={theme.secondary} fillOpacity=".66" stroke={theme.edge} strokeWidth="10" />
            <path d="M462 500 Q512 476 562 500 L555 620 Q512 640 469 620 Z"
              fill="none" stroke={theme.accent} strokeWidth="7" opacity=".52" />
          </>
        ) : family === 'torso.guard' ? (
          <>
            <path d="M438 478 Q512 446 586 478 L577 653 Q512 678 447 653 Z"
              fill={theme.primary} fillOpacity=".46" stroke={theme.edge} strokeWidth="8" />
            <path d="M460 518 H564 M458 570 H566 M456 620 H568"
              fill="none" stroke={theme.accent} strokeWidth="6" opacity=".5" />
          </>
        ) : (
          <>
            <path d="M438 486 L490 531 L469 678" fill="none" stroke={theme.primary} strokeWidth="9" strokeLinecap="round" opacity=".82" />
            <path d="M586 486 L534 531 L555 678" fill="none" stroke={theme.primary} strokeWidth="9" strokeLinecap="round" opacity=".82" />
            <path d="M486 532 H538" stroke={theme.accent} strokeWidth="5" strokeLinecap="round" opacity=".58" />
          </>
        )
      ) : null}

      {shoulders ? (
        <>
          <path d="M374 477 Q404 449 443 454" fill="none" stroke={theme.edge} strokeWidth="14" strokeLinecap="round" opacity=".72" />
          <path d="M650 477 Q620 449 581 454" fill="none" stroke={theme.edge} strokeWidth="14" strokeLinecap="round" opacity=".72" />
          <path d="M381 478 Q406 460 435 465 M643 478 Q618 460 589 465"
            fill="none" stroke={theme.accent} strokeWidth="5" strokeLinecap="round" opacity=".55" />
        </>
      ) : null}

      {belt ? (
        <>
          <path d="M423 755 Q512 767 601 755" fill="none" stroke={theme.secondary} strokeWidth="12" strokeLinecap="round" opacity=".88" />
          <rect x="498" y="747" width="28" height="22" rx="4" fill="none" stroke={theme.accent} strokeWidth="5" />
        </>
      ) : null}

      {neck ? (
        <>
          <path d="M470 414 Q512 431 554 414" fill="none" stroke={theme.edge} strokeWidth="5" strokeLinecap="round" opacity=".72" />
          <circle cx="512" cy="443" r="9" fill={theme.accent} stroke={theme.secondary} strokeWidth="4" />
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
    <g data-channel="arms" data-rarity={source.rarity}>
      {wrists ? (
        <>
          <path d="M307 735 L338 744 M717 735 L686 744" fill="none" stroke={theme.edge} strokeWidth="11" strokeLinecap="round" opacity=".8" />
          <path d="M311 748 L337 756 M713 748 L687 756" fill="none" stroke={theme.accent} strokeWidth="4" strokeLinecap="round" opacity=".56" />
        </>
      ) : null}
      {gloves ? (
        <>
          <path d="M291 806 Q316 785 341 807 M733 806 Q708 785 683 807" fill="none" stroke={theme.secondary} strokeWidth="13" strokeLinecap="round" opacity=".78" />
          <path d="M296 824 Q316 812 336 825 M728 824 Q708 812 688 825" fill="none" stroke={theme.edge} strokeWidth="5" strokeLinecap="round" opacity=".66" />
        </>
      ) : null}
    </g>
  );
}

function LegsChannel({ item }: { item?: ExpeditionAppearanceItem }) {
  if (!item) return null;
  const theme = themeOf(item);
  return (
    <g data-channel="legs" data-rarity={item.rarity}>
      <path d="M406 965 Q442 978 477 966 M618 965 Q582 978 547 966"
        fill="none" stroke={theme.secondary} strokeWidth="14" strokeLinecap="round" opacity=".64" />
      <path d="M410 1010 Q444 1022 475 1011 M614 1010 Q580 1022 549 1011"
        fill="none" stroke={theme.edge} strokeWidth="6" strokeLinecap="round" opacity=".62" />
      <path d="M419 1063 L470 1076 M605 1063 L554 1076" stroke={theme.accent} strokeWidth="5" opacity=".48" />
    </g>
  );
}

function FeetChannel({ item }: { item?: ExpeditionAppearanceItem }) {
  if (!item) return null;
  const theme = themeOf(item);
  return (
    <g data-channel="feet" data-rarity={item.rarity}>
      <path d="M392 1190 Q430 1202 475 1191 M632 1190 Q594 1202 549 1191"
        fill="none" stroke={theme.secondary} strokeWidth="17" strokeLinecap="round" opacity=".72" />
      <path d="M389 1264 Q430 1280 472 1268 M635 1264 Q594 1280 552 1268"
        fill="none" stroke={theme.edge} strokeWidth="7" strokeLinecap="round" opacity=".7" />
      <path d="M399 1214 H469 M555 1214 H625" stroke={theme.accent} strokeWidth="4" opacity=".5" />
    </g>
  );
}

function MainHandChannel({ item }: { item?: ExpeditionAppearanceItem }) {
  if (!item) return null;
  const theme = themeOf(item);
  const family = item.appearanceId;

  if (family === 'weapon.spear') {
    return (
      <g data-channel="mainHand" data-rarity={item.rarity}>
        <path d="M710 574 L663 1270" stroke={theme.secondary} strokeWidth="11" strokeLinecap="round" opacity=".9" />
        <path d="M718 476 L738 560 L694 548 Z" fill={theme.edge} stroke={theme.secondary} strokeWidth="5" />
        <path d="M711 508 L721 547" stroke={theme.accent} strokeWidth="5" />
      </g>
    );
  }

  if (family === 'weapon.hammer') {
    return (
      <g data-channel="mainHand" data-rarity={item.rarity}>
        <path d="M690 676 L658 1244" stroke={theme.secondary} strokeWidth="14" strokeLinecap="round" opacity=".88" />
        <path d="M647 608 H752 V677 H647 Z" fill={theme.primary} fillOpacity=".76" stroke={theme.edge} strokeWidth="7" />
        <circle cx="700" cy="642" r="17" fill={theme.accent} opacity=".72" />
      </g>
    );
  }

  return (
    <g data-channel="mainHand" data-rarity={item.rarity}>
      <path d="M674 796 L665 1215" stroke={theme.secondary} strokeWidth="10" strokeLinecap="round" opacity=".9" />
      <path d="M682 657 L695 679 L673 1112 L658 1137 L660 1100 Z"
        fill={family === 'weapon.blade' ? theme.accent : '#d8e4e8'} fillOpacity=".9" stroke={theme.edge} strokeWidth="5" />
      <path d="M646 1110 L690 1124" stroke={theme.edge} strokeWidth="11" strokeLinecap="round" />
    </g>
  );
}

function OffHandChannel({ item }: { item?: ExpeditionAppearanceItem }) {
  if (!item) return null;
  const theme = themeOf(item);
  return (
    <g data-channel="offHand" data-rarity={item.rarity}>
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
  const strongest = [...effects].sort((a, b) => rarityOrder[b.rarity] - rarityOrder[a.rarity])[0];
  const theme = themeOf(strongest);
  const intensity = Math.min(.42, .12 + effects.length * .07);

  return (
    <g data-channel="effect" data-rarity={strongest.rarity} pointerEvents="none">
      <ellipse cx="512" cy="1398" rx="225" ry="48" fill={theme.glow} opacity={intensity + .18} />
      <circle cx="512" cy="615" r="31" fill={theme.accent} opacity={intensity + .18} />
      <circle cx="512" cy="615" r="58" fill="none" stroke={theme.accent} strokeWidth="9" opacity={intensity} />
      {strongest.rarity === 'relic' ? (
        <>
          <circle cx="512" cy="615" r="76" fill="none" stroke="#7cecff" strokeWidth="7" opacity=".32" strokeDasharray="20 18" />
          <circle cx="512" cy="615" r="91" fill="none" stroke="#ff88d7" strokeWidth="6" opacity=".28" strokeDasharray="12 24" />
          <path d="M350 1040 Q512 1138 674 1040" fill="none" stroke="#ffd96b" strokeWidth="9" opacity=".30" strokeDasharray="16 22" />
        </>
      ) : null}
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
