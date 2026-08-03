# FORRUM v0.20.2-rc4 — final UX and logic audit

## Audit goal

Review v0.17–v0.20 together for errors, duplicated mechanics, visual noise, misleading data, unnecessary navigation and broken transitions.

## Community workspace

Accepted:
- management lives in the selected community instead of a new global dashboard;
- five task tabs keep reports, content, team and structure separated;
- parent-team permissions inherit only downward;
- public users do not see management actions they cannot use.

Rejected as noise:
- a separate top-level “Curator” navigation item;
- a second report-content system separate from normal topics;
- public “community score” or percentage health rating.

## Events and governance

Accepted:
- one existing global Events hub with Events/Polls tabs;
- creation on a separate route;
- explicit eligibility and quorum rules;
- event detail returns to its community context.

Rejected as noise:
- creation forms on the public events feed;
- separate global navigation entries for polls, elections and calendar;
- invented attendance or countdown urgency.

## Projects and services

Accepted:
- one portfolio model with a kind field;
- portfolio shown in the profile and contextual directories;
- confirmed interactions can point to a specific card.

Rejected as noise:
- a new marketplace before a real supply base exists;
- projects and services in the main header;
- public drafts or archived work.

## Promotion and points

Accepted:
- exact price breakdown before confirmation;
- hard inventory limits;
- visible commercial label;
- short refund grace period and recorded cancellation reason;
- administration sees orders and can correct an error with a reason.

Rejected as manipulative or unnecessary:
- fake scarcity timers;
- paying above the limit;
- hidden demand multiplier;
- real-money terminology in the alpha;
- withdrawals, automatic salaries and payouts.

## Navigation audit

- 43 application page routes discovered.
- Every literal internal href in app/components resolved to an existing route.
- Projects/services/portfolio were not added to global navigation.
- Community workspace remains contextual.
- No `window.prompt`, `window.confirm` or `alert` remains in the web interface.

## Visual-noise audit

- no new global header entries;
- administrative order history stays in the existing Promotion tab;
- price breakdown appears only after a user requests a quote;
- empty states replace decorative demo cards;
- forms use progressive disclosure and required reasons only for consequential actions.

## Remaining UX risks requiring a browser

- density of the community workspace on 320–390 px screens;
- long Russian titles in event and portfolio cards;
- keyboard focus order in inline cancellation/refund forms;
- real loading transitions and layout shift;
- visual distinction between administrative and commercial pinning after live data exists.
