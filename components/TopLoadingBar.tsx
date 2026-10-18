"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export default function TopLoadingBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isFirstRender = useRef(true);
  const isNavigatingRef = useRef(false);

  const clearTimers = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
  }, []);

  const start = useCallback(() => {
    clearTimers();
    isNavigatingRef.current = true;
    setVisible(true);
    setProgress(8);
    // Creep toward 90% while we wait for the destination route to render;
    // the last 10% only completes once navigation is actually done.
    intervalRef.current = setInterval(() => {
      setProgress((p) => {
        if (p >= 90) return p;
        const remaining = 90 - p;
        return p + Math.max(0.5, remaining * 0.1);
      });
    }, 150);
  }, [clearTimers]);

  const finish = useCallback(() => {
    if (!isNavigatingRef.current && !visible) return;
    isNavigatingRef.current = false;
    clearTimers();
    setProgress(100);
    hideTimeoutRef.current = setTimeout(() => {
      setVisible(false);
      setProgress(0);
    }, 250);
  }, [clearTimers, visible]);

  // The destination route has rendered once pathname or search params change — finish the bar.
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    finish();
  }, [pathname, searchParams, finish]);

  // Start the bar on same-origin link clicks and on programmatic navigation (router.push/replace).
  useEffect(() => {
    function isModifiedClick(e: MouseEvent) {
      return (
        e.defaultPrevented ||
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      );
    }

    function handleClick(e: MouseEvent) {
      if (isModifiedClick(e)) return;
      const target = (e.target as HTMLElement)?.closest("a");
      if (!target) return;

      const href = target.getAttribute("href");
      if (!href || href.startsWith("#")) return;
      if (target.target === "_blank" || target.hasAttribute("download")) return;

      let url: URL;
      try {
        url = new URL(href, window.location.href);
      } catch {
        return;
      }
      if (url.origin !== window.location.origin) return;

      const isSameLocation =
        url.pathname === window.location.pathname &&
        url.search === window.location.search;
      // Same-page navigation: no actual loading happens, so don't show the bar.
      if (isSameLocation) return;

      start();
    }

    document.addEventListener("click", handleClick);

    // Patch history so programmatic navigation (e.g. router.push after a form submit) also triggers the bar.
    const originalPushState = window.history.pushState;
    const originalReplaceState = window.history.replaceState;

    window.history.pushState = function (
      ...args: Parameters<typeof window.history.pushState>
    ) {
      // Defer to avoid scheduling state updates during React's insertion phase.
      setTimeout(() => start(), 0);
      return originalPushState.apply(window.history, args);
    };
    window.history.replaceState = function (
      ...args: Parameters<typeof window.history.replaceState>
    ) {
      setTimeout(() => start(), 0);
      return originalReplaceState.apply(window.history, args);
    };

    return () => {
      document.removeEventListener("click", handleClick);
      window.history.pushState = originalPushState;
      window.history.replaceState = originalReplaceState;
      clearTimers();
    };
  }, [start, clearTimers]);

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-[9999] h-[3px] pointer-events-none"
      style={{ opacity: visible ? 1 : 0, transition: "opacity 200ms ease" }}
    >
      <div
        className="h-full bg-primary-container"
        style={{
          width: `${progress}%`,
          transition:
            progress === 100 ? "width 150ms ease-out" : "width 250ms ease-out",
        }}
      />
    </div>
  );
}