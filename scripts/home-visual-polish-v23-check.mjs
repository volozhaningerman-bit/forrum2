import fs from "node:fs";

const themePath =
  "apps/web/components/theme-toggle.tsx";
const cssPath =
  "apps/web/app/globals.css";

for (const path of [
  themePath,
  cssPath,
]) {
  if (!fs.existsSync(path)) {
    throw new Error(
      `V23 required file is missing: ${path}`,
    );
  }
}

const theme =
  fs.readFileSync(themePath, "utf8");
const css =
  fs.readFileSync(cssPath, "utf8");

for (const required of [
  "FORRUM_THEME_TOGGLE_V1",
  "FORRUM_THEME_TOGGLE_V23",
  '"use client"',
  'type ForumTheme = "paper" | "graphite"',
  'const STORAGE_KEY = "forrum.theme"',
  "window.localStorage.setItem",
  'aria-pressed={isGraphite}',
  'className="forrum-theme-toggle"',
  'className="forrum-theme-toggle__icon"',
]) {
  if (!theme.includes(required)) {
    throw new Error(
      `V23 ThemeToggle contract missing: ${required}`,
    );
  }
}

for (const forbidden of [
  'className="sr-only"',
]) {
  if (theme.includes(forbidden)) {
    throw new Error(
      `V23 old/visible label contract remains: ${forbidden}`,
    );
  }
}

const start =
  "/* FORRUM_VISUAL_POLISH_V23_START";
const end =
  "/* FORRUM_VISUAL_POLISH_V23_END */";

if (
  (
    css.match(
      /FORRUM_VISUAL_POLISH_V23_START/g,
    ) ?? []
  ).length !== 1
) {
  throw new Error(
    "Expected exactly one V23 polish start marker.",
  );
}

if (
  (
    css.match(
      /FORRUM_VISUAL_POLISH_V23_END/g,
    ) ?? []
  ).length !== 1
) {
  throw new Error(
    "Expected exactly one V23 polish end marker.",
  );
}

if (!css.includes("FORRUM_VISUAL_THEME_START")) {
  throw new Error(
    "V21 visual-theme base contract is missing.",
  );
}

if (!css.includes("FORRUM_HOME_SCALE_POLISH_START")) {
  throw new Error(
    "Scale-polish geometry contract is missing.",
  );
}

const block = css.slice(
  css.indexOf(start),
  css.indexOf(end) + end.length,
);

for (const required of [
  "font-size: 24px !important",
  ".forrum-theme-toggle {",
  "font-size: 0",
  "overflow: hidden",
  "width: 28px",
  "font-family: inherit",
  "border-left-style: dotted",
  "border-top-style: dotted",
  ".forrum-home-v16__new-topic-title::before",
  "image-rendering: pixelated",
]) {
  if (!block.includes(required)) {
    throw new Error(
      `V23 visual contract missing: ${required}`,
    );
  }
}

for (const forbiddenThemeSelector of [
  "html.dark",
  'data-theme="dark"',
  'data-theme="graphite"',
  'data-forrum-theme="graphite"',
]) {
  if (block.includes(forbiddenThemeSelector)) {
    throw new Error(
      `V23 contains theme-specific geometry: ${forbiddenThemeSelector}`,
    );
  }
}

for (const forbidden of [
  "linear-gradient",
  "radial-gradient",
  "backdrop-filter",
  "filter: blur",
  "box-shadow:",
  "transition: all",
  "border-radius: 8px",
  "border-radius: 12px",
]) {
  if (block.includes(forbidden)) {
    throw new Error(
      `Rejected V23 visual styling: ${forbidden}`,
    );
  }
}

console.log(
  "FORRUM Visual Polish V23 passed.",
);
