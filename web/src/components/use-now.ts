"use client";

import { useSyncExternalStore } from "react";

let now: number | undefined;
const subscribe = () => () => {};

// The viewer's clock, or null while prerendering so cached HTML never depends on the time
export function useNow() {
  return useSyncExternalStore(
    subscribe,
    () => (now ??= Date.now()),
    () => null,
  );
}
