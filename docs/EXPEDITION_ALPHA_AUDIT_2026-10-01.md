# Expedition Alpha — design, UX and alpha-readiness audit

Date: 2026-10-01  
Reference: approved bright post-technological medieval style + current live alpha

## Executive summary

The alpha is mechanically viable, but the live v0.7 screen still reads too much like a compact admin/dashboard UI. The approved reference reads as a game first: a large illustrated world, a visually distinct hero, readable loot, a strong expedition CTA and social content that feels embedded into the world.

The v0.8 pass therefore prioritizes hierarchy, legibility and game feel without expanding mechanics.

## 1. Visual hierarchy

### Findings
- The world scene is the strongest content but was not large enough relative to the side rails.
- Large unused dark areas made the game feel smaller than the browser window.
- Character, inventory and social blocks competed for equal visual weight.
- The main expedition CTA did not stand out enough from secondary controls.

### Changes
- Wider responsive game canvas.
- Larger world scene and world hero.
- Gold primary expedition CTA; teal remains a secondary/system accent.
- Larger location title and stronger world overlays.
- Increased desktop panel heights so the interface uses the viewport intentionally.

## 2. Typography and readability

### Findings
- Several production styles used 6–8 px text on desktop.
- Inventory names, rarity labels and equipment slots required effort to read.
- Important gameplay metadata looked like technical annotations.

### Changes
- Raised desktop minimum type sizes in inventory, equipment, depths, raid and community modules.
- Increased HUD and panel-title typography.
- Kept secondary metadata visually quieter without making it microscopic.
- Browser acceptance now fails if key item/slot typography becomes too small.

## 3. Character and equipment

### Findings
- The 16-slot system is useful but visually risked becoming a spreadsheet.
- The hero was readable, but equipment slots needed clearer hover/focus affordance.
- Visible paper-doll layers are essential because equipment is one of the game’s main retention/status systems.

### Changes
- Larger character portrait.
- More breathing room around paper-doll art.
- Larger equipment slot hit areas and labels.
- Better hover/focus states.
- Existing visible equipment layering preserved.

## 4. Expedition flow

### Findings
- The five depth cards were understandable, but lacked a clear group heading.
- The selected depth state was visually close to the general teal system color.
- The user’s primary loop should read instantly: depth → send → return → loot.

### Changes
- Added explicit “Глубина экспедиции” group label and current depth counter.
- Selected depth now uses the warm/gold game-action language.
- Expedition send CTA enlarged and moved visually ahead of secondary information.
- Expedition status uses live-region semantics for better feedback.

## 5. Inventory / loot

### Findings
- Inventory was functionally correct but too compressed.
- Serial-number uniqueness is a strong differentiator and must remain visible.
- Equip affordance needed stronger legibility.

### Changes
- Increased item-card height and typography.
- Stronger hover and rarity-specific border feedback.
- Kept serial number, power and equip state visible.
- Renamed the panel presentation to “Рюкзак” to feel more like a game surface while retaining the same inventory model.

## 6. Raid / social systems

### Findings
- The Iron Shepherd block is a good social hook, but text and stats were too small.
- Category Champion and Syndicate Relic are important differentiators but read like tiny technical cards.

### Changes
- Raid text, stats and CTA increased in size.
- Social row enlarged.
- Champion/Relic previews given more visual space.
- No new social mechanics added in this pass; only presentation and readability changed.

## 7. Alpha UX / feedback

### Findings
- Demo/server distinction existed, but the non-persistent guest state needed clearer wording.
- API failure, disabled and loading states already existed and should not be removed.
- Keyboard focus needed to remain obvious against the dark UI.

### Changes
- Guest footer copy explicitly explains that progress is not saved and that login is required to continue later.
- Strong focus-visible treatment on gameplay controls.
- Reduced-motion behavior retained.
- Expedition result gets status/live feedback semantics.

## 8. Responsive behavior

### Desktop target
- 1720×900 / 1920×1080: game-like three-column layout.
- World remains the dominant surface.
- 16 slots and inventory stay visible without horizontal overflow.

### 1366-class desktop
- Still treated as a full game UI rather than collapsing to a feed.
- Typography stays above the previous microscopic scale.

### Tablet/mobile
- Prioritize character and expedition loop.
- Inventory becomes wider grid.
- World hero overlay is removed on small screens to preserve content readability.

## 9. Accessibility

Required for alpha:
- keyboard-visible focus;
- no hidden actionable controls;
- no horizontal overflow in tested desktop widths;
- reduced-motion support;
- readable disabled states;
- aria-live feedback for expedition state / loot result.

## 10. Alpha acceptance criteria after v0.8

The build is acceptable for the next alpha step when:
1. a new user can identify the main expedition CTA immediately;
2. the world is the dominant visual surface;
3. key text is readable at normal desktop zoom;
4. all 16 equipment slots remain accessible;
5. equipping an item still visibly changes the hero;
6. the 5-depth progression is explicit;
7. raid join remains visible and clickable;
8. serial loot remains readable;
9. no horizontal overflow occurs on tested viewports;
10. build, typecheck, static/UX/a11y validation and Playwright expedition flow all pass.

## Deferred intentionally

Not part of this visual audit:
- market implementation;
- diplomacy/licenses;
- full category progression;
- full syndicate storage;
- animation system expansion;
- additional locations;
- additional raid bosses.

Those should follow only after the first expedition loop is visually and behaviorally stable.
