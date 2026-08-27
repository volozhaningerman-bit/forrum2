"use client";

// FORRUM_THEME_TOGGLE_V1
// FORRUM_THEME_TOGGLE_V23
import { useEffect, useState } from "react";

type ForumTheme = "paper" | "graphite";

const STORAGE_KEY = "forrum.theme";

function applyTheme(theme: ForumTheme) {
  const root = document.documentElement;
  const isGraphite = theme === "graphite";

  root.dataset.theme = theme;
  root.dataset.forrumTheme = theme;
  root.classList.toggle("dark", isGraphite);
  root.style.colorScheme = isGraphite ? "dark" : "light";
}

function readInitialTheme(): ForumTheme {
  const root = document.documentElement;
  const current =
    root.dataset.forrumTheme ??
    root.dataset.theme;

  if (current === "paper" || current === "graphite") {
    return current;
  }

  const stored =
    window.localStorage.getItem(STORAGE_KEY);

  if (stored === "paper" || stored === "graphite") {
    return stored;
  }

  return root.classList.contains("dark")
    ? "graphite"
    : "paper";
}

export function ThemeToggle() {
  const [theme, setTheme] =
    useState<ForumTheme>("paper");

  useEffect(() => {
    const initial = readInitialTheme();

    applyTheme(initial);
    setTheme(initial);

    const handleStorage = (event: StorageEvent) => {
      if (event.key !== STORAGE_KEY) {
        return;
      }

      if (
        event.newValue !== "paper" &&
        event.newValue !== "graphite"
      ) {
        return;
      }

      applyTheme(event.newValue);
      setTheme(event.newValue);
    };

    window.addEventListener(
      "storage",
      handleStorage,
    );

    return () => {
      window.removeEventListener(
        "storage",
        handleStorage,
      );
    };
  }, []);

  const isGraphite = theme === "graphite";
  const targetTheme: ForumTheme =
    isGraphite ? "paper" : "graphite";

  const toggleTheme = () => {
    applyTheme(targetTheme);

    window.localStorage.setItem(
      STORAGE_KEY,
      targetTheme,
    );

    setTheme(targetTheme);
  };

  return (
    <button
      type="button"
      className="forrum-theme-toggle"
      data-theme-state={theme}
      aria-label={
        isGraphite
          ? "Включить светлую тему Paper"
          : "Включить тёмную тему Graphite"
      }
      aria-pressed={isGraphite}
      title={
        isGraphite
          ? "Paper"
          : "Graphite"
      }
      onClick={toggleTheme}
    >
      <span
        className="forrum-theme-toggle__icon"
        aria-hidden="true"
      />
    </button>
  );
}
