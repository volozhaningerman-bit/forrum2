# FORRUM Editor Controls V15.10

## Result

- font size now supports every whole value from 10 to 72 px;
- the slider keeps pointer capture while its selected text changes live;
- size and colour menus close on preset selection, outside pointer press, or Escape;
- Link, Photo, Quote, Code, List and Spoiler use clear 18 px line SVG icons plus labels;
- clicking a hashtag opens six accessible FORRUM presets;
- each hashtag preset controls text, background and border as one readable combination;
- the selected preset is included in the local draft and applied to the stored Tag after publication;
- FORRUM Preview has explicit, bordered title and description regions.

## Tag style behaviour

FORRUM already stores styleEnabled, textColor, backgroundColor and borderColor on Tag. V15.10 adds an authenticated author-only endpoint that can style only tags attached to the author’s newly created publication. Because Tag is shared, the chosen style remains consistent wherever that hashtag is rendered.

## Safety

- requires the exact installed V15.9 editor/form and unchanged V15.6 parser;
- preserves all legacy V15.9, V15.7 and V15.6 check contracts;
- rejects partial V15.10 marker states;
- validates static UX, accessibility, API tests, all workspaces and production build;
- repeat runs are verified no-ops before any write.
