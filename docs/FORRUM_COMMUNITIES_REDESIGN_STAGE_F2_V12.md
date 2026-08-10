# FORRUM Communities Redesign — Stage F.2 / V12

Corrects the interaction model on the Communities catalogue and its right
hierarchy panel.

Approved behavior, identical to the homepage category tree:
- community icon: navigate into the community;
- community name: navigate into the community;
- all remaining empty/content surface of the row: open/select hierarchy;
- chevron: visual indicator inside the same large expansion surface;
- Subscribe: independent action;
- hierarchy child cards follow the same icon/name vs expansion-surface rule.

Stage F.2 deliberately uses bounded structural anchors instead of exact
full-block whitespace matching, so the patch is resilient to the current
formatted Stage F JSX.
