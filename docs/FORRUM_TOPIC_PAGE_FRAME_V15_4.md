# FORRUM Topic Page Frame V15.4

## Failure fixed

V15.3 failed before commit/push because the patch tried to insert a custom
`TopicCommunityContext` type by matching a fragile two-line boundary around the
end of `Publication` and `const reactions`.

The current repository was inspected again. V15.4 no longer patches that area.

## V15.4 approach

- The approved `/communities/[slug]` CategoryPage is not modified.
- No V14 regression checker is rewritten.
- TopicPage gets its own isolated category-tree component.
- TopicPage state uses an inline ancestor type.
- Breadcrumb replacement uses structural start/end positions:
  `publication-breadcrumbs` -> next `<article`.
- The existing TOPIC bookmark endpoint is reused.
- No fake topic-subscription endpoint is introduced.
- POST pages retain the old `publication-layout`.
- Only TOPIC gets the new two-column frame.

## Stage scope

This stage implements only the TopicPage frame:
- category tree;
- full breadcrumbs;
- title/meta header;
- save/bookmark action;
- removal of the old TopicPage right rail visually;
- removal of the duplicate old TOPIC header visually.

The following remain for later stages:
- post/author row redesign;
- reactions/quotes/actions;
- unread divider and topic pagination;
- reply editor redesign;
- create-topic editor;
- topic subscription backend.
