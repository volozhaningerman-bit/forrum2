# FORRUM Topic Post Surface V15.5

V15.4 successfully introduced the TopicPage frame. The deployed TopicPage still
showed large white surfaces because the legacy publication/editor CSS was still
active.

This stage is intentionally CSS-only.

Changes:
- dark compact first post;
- left author zone;
- readable dark topic body;
- compact reactions/actions;
- dark comments;
- comments appear before the reply composer;
- compact discussion header;
- mobile fallback.

Protected:
- CategoryPage;
- TopicPage TypeScript and behavior;
- Topic tree TypeScript;
- editor implementation;
- API / Prisma;
- global header;
- homepage;
- Communities catalogue.

The reply/create editor is the next separate stage.
