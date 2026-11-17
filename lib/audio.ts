"use client";

import { useSyncExternalStore } from "react";

/**
 * Tiny audio controller shared by the cover (which starts the music) and the
 * floating music button (which toggles it).
 */

export type MusicState = "idle" | "playing" | "paused" | "unavailable";

let state: MusicState = "idle";
let music: HTMLAudioElement | null = null;
let resumeWhenVisible = false;
const listeners = new Set<() => void>();

function setState(next: MusicState) {
  state = next;
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useMusicState(): MusicState {
  return useSyncExternalStore(
    subscribe,
    () => state,
    () => "idle" as const,
  );
}

function fadeIn(audio: HTMLAudioElement, target: number, ms: number) {
  const steps = 20;
  let step = 0;
  audio.volume = 0;
  const id = setInterval(() => {
    step += 1;
    // iOS ignores volume changes; that's fine, the music just starts at full volume.
    audio.volume = Math.min(target, (target * step) / steps);
    if (step >= steps) clearInterval(id);
  }, ms / steps);
}

function onVisibilityChange() {
  if (!music) return;
  if (document.hidden && !music.paused) {
    music.pause();
    resumeWhenVisible = true;
  } else if (!document.hidden && resumeWhenVisible) {
    resumeWhenVisible = false;
    music.play().catch(() => {});
  }
}

/**
 * Must be called from the "Open" click handler: browsers (iOS Safari especially)
 * only allow audio that starts inside a user gesture. The background track is
 * started muted right away and un-muted once the intro has played.
 */
export function startInvitationAudio({ intro, music: src }: { intro: string | null; music: string | null }) {
  if (intro) {
    const introAudio = new Audio(intro);
    introAudio.volume = 0.85;
    introAudio.play().catch(() => {});
  }

  if (!src || music) {
    if (!src) setState("unavailable");
    return;
  }

  const track = new Audio(src);
  track.loop = true;
  track.preload = "auto";
  track.muted = true;
  music = track;

  track
    .play()
    .then(() => {
      setTimeout(
        () => {
          track.currentTime = 0;
          track.muted = false;
          fadeIn(track, 0.55, 2000);
          setState("playing");
        },
        intro ? 2600 : 0,
      );
    })
    .catch(() => {
      music = null;
      setState("unavailable");
    });

  document.addEventListener("visibilitychange", onVisibilityChange);
}

export function toggleMusic() {
  if (!music) return;
  if (music.paused) {
    music
      .play()
      .then(() => setState("playing"))
      .catch(() => {});
  } else {
    music.pause();
    resumeWhenVisible = false;
    setState("paused");
  }
}
