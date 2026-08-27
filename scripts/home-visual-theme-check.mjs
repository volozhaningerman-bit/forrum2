import fs from "node:fs";

const navPath =
  "apps/web/components/main-nav.tsx";
const themePath =
  "apps/web/components/theme-toggle.tsx";
const cssPath =
  "apps/web/app/globals.css";

for (const file of [
  navPath,
  themePath,
  cssPath,
]) {
  if (!fs.existsSync(file)) {
    throw new Error(
      `Required visual/theme file is missing: ${file}`,
    );
  }
}

const nav = fs.readFileSync(navPath, "utf8");
const theme = fs.readFileSync(themePath, "utf8");
const css = fs.readFileSync(cssPath, "utf8");

if (
  (
    nav.match(
      /import\s+\{\s*ThemeToggle\s*\}\s+from\s+["']\.\/theme-toggle["'];/g,
    ) ?? []
  ).length !== 1
) {
  throw new Error(
    "Expected exactly one ThemeToggle import.",
  );
}

if (
  (
    nav.match(/<ThemeToggle\s*\/>/g) ?? []
  ).length !== 1
) {
  throw new Error(
    "Expected exactly one ThemeToggle in MainNav.",
  );
}

for (const required of [
  "FORRUM_THEME_TOGGLE_V1",
  '"use client"',
  'type ForumTheme = "paper" | "graphite"',
  'const STORAGE_KEY = "forrum.theme"',
  "root.dataset.theme = theme",
  "root.dataset.forrumTheme = theme",
  'root.classList.toggle("dark", isGraphite)',
  "window.localStorage.setItem",
  'aria-pressed={isGraphite}',
  'className="forrum-theme-toggle"',
]) {
  if (!theme.includes(required)) {
    throw new Error(
      `ThemeToggle contract is missing: ${required}`,
    );
  }
}

const start =
  "/* FORRUM_VISUAL_THEME_START";
const end =
  "/* FORRUM_VISUAL_THEME_END */";

if (
  (
    css.match(
      /FORRUM_VISUAL_THEME_START/g,
    ) ?? []
  ).length !== 1
) {
  throw new Error(
    "Expected one visual-theme start marker.",
  );
}

if (
  (
    css.match(
      /FORRUM_VISUAL_THEME_END/g,
    ) ?? []
  ).length !== 1
) {
  throw new Error(
    "Expected one visual-theme end marker.",
  );
}

const block = css.slice(
  css.indexOf(start),
  css.indexOf(end) + end.length,
);

for (const required of [
  "--fvt-page: #ebe9e4",
  "--fvt-page: #101316",
  "--fvt-accent: #1769ff",
  "--fvt-accent: #397cff",
  "--fvt-texture:",
  ".forrum-theme-toggle",
  ".forrum-theme-toggle__icon",
  "background-image: var(--fvt-texture)",
  "[data-forrum-shell=\"header\"] nav > a",
  ".forrum-home-v16__new-topic:hover",
]) {
  if (!block.includes(required)) {
    throw new Error(
      `Visual-theme contract is missing: ${required}`,
    );
  }
}

// Main-page geometry belongs to the already-required
// home-scale-polish-check.mjs contract. The visual-theme block
// must validate visual tokens/states, not duplicate grid geometry.
if (!css.includes("FORRUM_HOME_SCALE_POLISH_START")) {
  throw new Error(
    "Home scale-polish contract is missing before visual-theme validation.",
  );
}

for (const forbidden of [
  "linear-gradient",
  "radial-gradient",
  "backdrop-filter",
  "filter: blur",
  "box-shadow:",
  "border-radius: 8px",
  "border-radius: 12px",
  "transition: all",
]) {
  if (block.includes(forbidden)) {
    throw new Error(
      `Rejected visual styling found: ${forbidden}`,
    );
  }
}

const darkStart =
  block.indexOf("html.dark,");
const shellStart =
  block.indexOf("html,\nbody");

if (
  darkStart < 0 ||
  shellStart < 0 ||
  shellStart <= darkStart
) {
  throw new Error(
    "Could not isolate Graphite token override.",
  );
}

const graphiteTokens =
  block.slice(darkStart, shellStart);

for (const structural of [
  "display:",
  "position:",
  "grid-template",
  "flex-direction:",
  "width:",
  "height:",
  "margin:",
  "padding:",
  "gap:",
  "inset:",
  "top:",
  "right:",
  "bottom:",
  "left:",
]) {
  if (graphiteTokens.includes(structural)) {
    throw new Error(
      `Graphite changes geometry: ${structural}`,
    );
  }
}

console.log(
  "FORRUM Visual Theme passed: Paper/Graphite tokens, persistent accessible toggle, retro-paper visual layer, one geometry.",
);
