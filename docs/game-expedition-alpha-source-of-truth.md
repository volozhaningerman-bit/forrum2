# 4rrum Game Alpha — source of truth

Status: **locked alpha foundation**  
Working codename: **Expedition**  
Public title: **TBD**  
Route for hidden alpha: `/applications/games/expedition-alpha`

This document is the canonical reference for the first 4rrum game until a later decision explicitly replaces it.

## 1. Product goal

The first 4rrum game must be simple enough to understand quickly, but social enough that it makes sense specifically inside a forum.

Core loop:

1. player has energy;
2. spends energy to send the character on expeditions;
3. repeated expeditions into the same location unlock deeper and harder layers;
4. character returns with XP, resources and numbered loot;
5. loot can improve the player, later be traded, or be contributed to shared systems;
6. locations contain raid bosses that are intended to be beaten together;
7. categories and syndicates provide persistent shared progression.

The player does **not** click to attack and does not micromanage combat.

## 2. Setting

A colorful illustrated medieval world that exists long after the collapse of a highly technological civilization.

Modern society is gone. Castles, workshops, settlements and handmade equipment returned, but the world is covered with remnants of the old age:

- ruined industrial zones;
- reactors;
- machine components;
- strange energy sources;
- ancient weapons;
- mechanical or biomechanical constructs.

The visual tone is adventurous and readable rather than grim realism.

## 3. Visual language — locked

Use the approved bright cartoon illustration direction:

- expressive, readable silhouettes;
- stylized 2D / 2.5D game art;
- not anime-heavy;
- not realistic dark fantasy;
- not office / corporate styling;
- strong item readability on the character;
- medieval craft mixed with recognisable old-world technology;
- UI stays dark enough for item art and rarity accents to read clearly.

### Base character rule

Male and female characters begin in deliberately poor, damaged clothing: rags, wraps, simple belt, worn footwear.

The base model must still be carefully designed and appealing.

Every visible equipment item must change the character's appearance. The system is modular: equipment is layered over a fixed character rig instead of generating a new full character for every combination.

## 4. Equipment

Alpha target: **16 functional slots**.

1. Head
2. Neck
3. Shoulders
4. Cloak
5. Chest
6. Wrists
7. Gloves
8. Belt
9. Legs
10. Feet
11. Ring I
12. Ring II
13. Relic I
14. Relic II
15. Main hand
16. Off hand

Two-handed weapons may occupy both hand slots later.

Highly visible slots must visibly alter the avatar. Small slots such as rings may additionally produce readable detail, glow or accessory treatment in close character views.

## 5. Item rarity

Exactly four rarity tiers in the alpha:

1. Common
2. Uncommon
3. Rare
4. Epic

Rarity must not be communicated only by border color. Shape language, material quality, technological detail and silhouette should become more distinctive with rarity.

## 6. Numbered item instances

Every loot item is an individual instance.

Example:

> Old-world visor #38 / 100

Rules:

- item template and item instance are separate entities;
- each instance receives a serial number;
- a template may have a fixed or capped circulation;
- rarer templates generally have fewer issued copies;
- serial number never changes when ownership changes;
- ownership history must be architecturally possible from the first server-backed implementation.

The goal is not one best-in-slot set. The game should have many items with similar power but different visuals and secondary properties so strong players still look different.

## 7. Player progression

MVP progression contains:

- player level;
- XP;
- energy;
- equipment;
- inventory;
- basic combat power;
- location progress / depth.

Do not add a large talent tree in the first alpha.

## 8. Expeditions

The primary solo action.

A location has several depths. Repeated successful expeditions unlock deeper layers.

Deeper layers:

- cost more or equal energy depending on tuning;
- are harder;
- have better loot pools;
- can reveal bosses and rare finds.

The player selects a location/depth and sends the character. Combat is simulated automatically.

The first onboarding expedition should resolve quickly so the user understands the loop immediately.

## 9. Launch location

First playable region: **Rust Outskirts**.

Initial depth structure:

1. Outskirts entrance
2. Scrap yards
3. Old quarters
4. Industrial yard
5. Reactor zone

The art can evolve across depth while retaining one clear regional identity.

## 10. Raid bosses

Bosses are social content, not routine solo checkpoints.

First reference boss: **Iron Shepherd**.

Expected raid flow:

1. boss becomes available / discovered;
2. a raid window is announced;
3. users commit their characters before the start;
4. server resolves the encounter;
5. participants receive shared and personal loot according to the raid rules.

The goal is to create real forum messages such as:

> “We go at 21:00, two slots left.”

No real-time MMO combat is required.

## 11. Categories

Forum categories can become large in-game factions.

A category can eventually own:

- a Champion;
- shared construction;
- shared storage;
- shared contribution progress;
- category competition.

The game must never reward raw post spam.

## 12. Category Champion

Users do not kill their own Champion. They develop it together.

Reference Champion: **Iron Herald**.

The Champion has levels and visible evolution. Higher levels must materially change silhouette and visual status, not merely increase a number.

The first art reference uses five milestone forms.

Category-vs-category Champion battles are automatic and belong to a later alpha step after basic personal progression and raids work.

## 13. Syndicates

Syndicates are player clans inside categories.

Future systems:

- members;
- shared page / discussion;
- contribution rating;
- shared storage;
- syndicate relic;
- competition between syndicates.

Reference syndicate relic: **Ark Core**, visually evolving through several stages.

## 14. Shared economy

Later economic decisions should create tension between:

- improve yourself;
- contribute to your category/syndicate;
- sell to another player.

Planned systems include:

- player market;
- shared storage;
- shared construction;
- category trade agreements;
- licences / access rights.

Trade agreements and licences are **not part of the first playable slice**.

## 15. Art system

Production assets should be separate masters, not a single giant baked sprite sheet.

Asset groups:

- base male;
- base female;
- equipment by slot;
- locations;
- bosses;
- category Champions;
- syndicate relics;
- resources;
- UI icons.

The first implementation may use temporary CSS/vector stand-ins only where an approved production asset has not yet been exported. Such stand-ins must be isolated and replaceable.

## 16. Micro-animation

Allowed and desired:

- character idle/breathing;
- small equipment secondary motion;
- weapon sway;
- impact flash;
- loot reveal;
- rarity reveal;
- boss idle/hit states;
- Champion idle/evolution accent;
- relic pulse/activation;
- UI transitions.

Do not build expensive cinematic animation for alpha.

## 17. Server authority

Anything economically meaningful must eventually be server authoritative:

- energy;
- XP;
- item issuance;
- serial numbers;
- inventory;
- equipment;
- expedition resolution;
- raids;
- market ownership;
- category and syndicate contributions.

`localStorage` is not acceptable for tradable or scarce production items.

The first hidden UI slice may use in-memory demo state while backend contracts are being introduced, but it must not pretend this is production persistence.

## 18. First playable vertical slice

The first code milestone should prove only the core feeling:

- base character in rags;
- 16 visible equipment slots in UI;
- four rarity tiers;
- one location with at least three selectable depths;
- energy spend;
- expedition state;
- deterministic return with XP/resources/loot;
- inventory;
- equipping a returned item changes the visible character treatment;
- Iron Shepherd raid teaser/state;
- hooks/sections reserved for category and syndicate systems.

No market, diplomacy, crafting tree, PvP or world war is required before this loop is enjoyable.

## 19. Acceptance rule

A new user should understand within minutes:

> spend energy → send expedition → get loot → equip it → look stronger/different → go deeper → see why other players matter.

If that loop is not satisfying, do not expand the meta systems yet.


## Appearance system (Alpha 0.14)

The equipment model and the visible character appearance are deliberately separated.

- Every item still owns its gameplay slot, stats, rarity, serial number and circulation.
- The client derives an `appearanceId` from the item's visual key and slot.
- Many different items may reuse the same appearance family. New loot therefore does not require a unique body sprite for every item.
- The hero is composed through a bounded set of visual channels instead of one body overlay per equipment slot:
  `head`, `torso`, `arms`, `cloak`, `legs`, `feet`, `mainHand`, `offHand`, `effect`.
- Neck, shoulders and belt are composed into the torso channel.
- Wrists and gloves share the arms channel.
- Rings and relics affect the `effect` channel rather than being drawn as tiny literal objects on the body.
- Portrait and world hero use the same normalized 2:3 compositor geometry.
- The female base stays clean until its own geometry is authored; the male compositor must never be stretched over the female silhouette.
- There is **no transmog / cosmetic override system**. The appearance is always derived from the actually equipped items.

This architecture is intended to scale to hundreds of item instances and many item templates without adding hundreds of simultaneously mounted DOM/paper-doll layers.
