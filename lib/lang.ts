"use client";

import { useSyncExternalStore } from "react";
import { LANG_KEY } from "./lang-script";

export type Lang = "si" | "en";

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-lang"] });
  return () => observer.disconnect();
}

function getSnapshot(): Lang {
  return document.documentElement.dataset.lang === "en" ? "en" : "si";
}

function getServerSnapshot(): Lang {
  return "si";
}

/** Current invitation language; re-renders when the toggle changes it. */
export function useLang(): Lang {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function setLang(lang: Lang) {
  const root = document.documentElement;
  root.dataset.lang = lang;
  root.lang = lang;
  try {
    localStorage.setItem(LANG_KEY, lang);
  } catch {
    // Storage can be unavailable (private mode); the toggle still works for this visit.
  }
}
