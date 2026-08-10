# FORRUM Communities Redesign — Stage A / V12

First implementation stage for the approved Communities redesign.

## Audit

- `/communities` already loads the real active category tree from `GET /communities`.
- The response already contains hierarchy (`parent`), subscription counts/state, publication counts and the current curator.
- Existing subscription endpoints are reused later; no duplicate data model is introduced.
- Existing `/communities/proposals` is the current proposal screen.
- A dedicated curator route does not currently exist; the existing homepage participation screen remains the known curator application UI until a separate route is explicitly approved.

## Stage A

- Adds the Communities redesign page marker.
- Uses the approved homepage nav set on `/communities`: Main, Communities, News, Media, Events.
- Keeps the News unread indicator.
- Reuses the exact approved homepage Stage B header CSS, scoped to `/communities`.
- Applies the same graphite/green tokens as the approved homepage.
- Removes the obsolete second left `Направления` sidebar.
- Hides the global footer only on the `/communities` catalogue page.
- Does not redesign the page heading, local search, catalogue rows or hierarchy panel yet.
- Does not change API/schema or the approved homepage component.
