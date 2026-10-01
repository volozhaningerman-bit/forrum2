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
    primary: '#586b4b',
    secondary: '#2f3d32',
    edge: '#9aaa69',
    accent: '#d0a45e',
    glow: 'rgba(126,192,118,.30)',
  },
  rare: {
    primary: '#3e6178',
    secondary: '#243b4b',
    edge: '#7caecb',
    accent: '#67d9f1',
    glow: 'rgba(72,170,225,.34)',
  },
  epic: {
    primary: '#654f78',
    secondary: '#352b46',
    edge: '#ad83cf',
    accent: '#ff9c54',
    glow: 'rgba(185,117,255,.34)',
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
      <path d="M365 416 Q319 484 300 625 L268 1135 L352 1070 L404 1150 L438 740 L430 438 Z"
        fill={theme.secondary} stroke={theme.edge} strokeWidth="15" />
      <path d="M659 416 Q705 484 724 625 L756 1135 L672 1070 L620 1150 L586 740 L594 438 Z"
        fill={theme.secondary} stroke={theme.edge} strokeWidth="15" />
      <path d="M385 452 Q512 510 639 452" fill="none" stroke={theme.accent} strokeWidth="18" opacity=".55" />
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
            <path d="M372 444 Q512 376 652 444 L632 785 Q512 844 392 785 Z"
              fill={theme.secondary} stroke={theme.edge} strokeWidth="20" />
            <path d="M411 472 Q512 425 613 472 L598 721 Q512 770 426 721 Z"
              fill={theme.primary} stroke={theme.edge} strokeWidth="12" />
            <path d="M512 430 V776" stroke={theme.accent} strokeWidth="14" opacity=".55" />
          </>
        ) : family === 'torso.guard' ? (
          <>
            <path d="M386 452 Q512 397 638 452 L620 772 Q512 821 404 772 Z"
              fill={theme.primary} stroke={theme.edge} strokeWidth="18" />
            <path d="M420 492 H604 M411 588 H613 M407 682 H617"
              fill="none" stroke={theme.secondary} strokeWidth="28" opacity=".82" />
          </>
        ) : (
          <path d="M401 454 Q512 410 623 454 L610 770 Q512 807 414 770 Z"
            fill={theme.primary} fillOpacity=".84" stroke={theme.edge} strokeWidth="15" />
        )
      ) : null}

      {shoulders ? (
        <>
          <path d="M347 457 Q394 401 450 425 L437 514 Q385 527 337 495 Z"
            fill={theme.secondary} stroke={theme.edge} strokeWidth="15" />
          <path d="M677 457 Q630 401 574 425 L587 514 Q639 527 687 495 Z"
            fill={theme.secondary} stroke={theme.edge} strokeWidth="15" />
        </>
      ) : null}

      {belt ? (
        <>
          <path d="M392 764 Q512 789 632 764 L628 826 Q512 850 396 826 Z"
            fill={theme.secondary} stroke={theme.edge} strokeWidth="13" />
          <rect x="477" y="771" width="70" height="68" rx="10" fill={theme.accent} stroke={theme.edge} strokeWidth="10" />
          <rect x="494" y="788" width="36" height="34" rx="5" fill={theme.secondary} />
        </>
      ) : null}

      {neck ? (
        <>
          <path d="M445 405 Q512 442 579 405" fill="none" stroke={theme.edge} strokeWidth="16" strokeLinecap="round" />
          <circle cx="512" cy="450" r="21" fill={theme.accent} stroke={theme.secondary} strokeWidth="10" />
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
          <path d="M310 674 L354 694 L333 793 L287 773 Z" fill={theme.primary} stroke={theme.edge} strokeWidth="12" />
          <path d="M714 674 L670 694 L691 793 L737 773 Z" fill={theme.primary} stroke={theme.edge} strokeWidth="12" />
        </>
      ) : null}
      {gloves ? (
        <>
          <path d="M284 774 Q327 752 352 788 L337 876 Q298 900 270 858 Z" fill={theme.secondary} stroke={theme.edge} strokeWidth="12" />
          <path d="M740 774 Q697 752 672 788 L687 876 Q726 900 754 858 Z" fill={theme.secondary} stroke={theme.edge} strokeWidth="12" />
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
      <path d="M406 824 Q458 842 496 821 L478 1168 L395 1168 Z"
        fill={theme.secondary} fillOpacity=".78" stroke={theme.edge} strokeWidth="13" />
      <path d="M618 824 Q566 842 528 821 L546 1168 L629 1168 Z"
        fill={theme.secondary} fillOpacity=".78" stroke={theme.edge} strokeWidth="13" />
      <path d="M410 934 L480 952 M614 934 L544 952" stroke={theme.accent} strokeWidth="11" opacity=".55" />
    </g>
  );
}

function FeetChannel({ item }: { item?: ExpeditionAppearanceItem }) {
  if (!item) return null;
  const theme = themeOf(item);
  return (
    <g data-channel="feet">
      <path d="M382 1128 H485 L478 1370 Q423 1420 344 1384 L355 1326 L394 1288 Z"
        fill={theme.secondary} stroke={theme.edge} strokeWidth="15" />
      <path d="M642 1128 H539 L546 1370 Q601 1420 680 1384 L669 1326 L630 1288 Z"
        fill={theme.secondary} stroke={theme.edge} strokeWidth="15" />
      <path d="M371 1194 H481 M543 1194 H653" stroke={theme.accent} strokeWidth="12" opacity=".6" />
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
      <path d="M210 610 Q327 652 354 744 L329 1024 Q281 1110 207 1155 Q133 1110 85 1024 L60 744 Q87 652 210 610 Z"
        fill={theme.secondary} fillOpacity=".9" stroke={theme.edge} strokeWidth="18" />
      <path d="M210 688 Q286 716 305 770 L286 984 Q252 1037 210 1065 Q168 1037 134 984 L115 770 Q134 716 210 688 Z"
        fill={theme.primary} stroke={theme.edge} strokeWidth="11" />
      <circle cx="210" cy="862" r="44" fill={theme.accent} opacity=".75" />
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
