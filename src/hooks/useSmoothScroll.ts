import { useEffect } from "react";
import Lenis from "lenis";

const useSmoothScroll = () => {
  useEffect(() => {
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Detect touch/mobile — Lenis smooth-scroll on touch devices fights native
    // momentum and causes jank. Use native scrolling there instead.
    const isTouch =
      typeof window !== "undefined" &&
      (window.matchMedia("(hover: none) and (pointer: coarse)").matches ||
        window.innerWidth < 1024);

    if (isTouch) {
      // Native smooth scrolling for anchor jumps only.
      const handleAnchorClick = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        const anchor = target.closest("a[href^='#']");
        if (anchor) {
          const href = anchor.getAttribute("href");
          if (href && href !== "#") {
            const el = document.querySelector(href) as HTMLElement | null;
            if (el) {
              e.preventDefault();
              const top = el.getBoundingClientRect().top + window.scrollY - 80;
              window.scrollTo({ top, behavior: reduced ? "auto" : "smooth" });
            }
          }
        }
      };
      document.addEventListener("click", handleAnchorClick);
      return () => document.removeEventListener("click", handleAnchorClick);
    }

    const lenis = new Lenis({
      duration: 0.9,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: !reduced,
      wheelMultiplier: 1,
    });

    let rafId: number | null = null;

    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    const startLoop = () => {
      if (rafId === null) {
        rafId = requestAnimationFrame(raf);
      }
    };

    const stopLoop = () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        stopLoop();
      } else {
        startLoop();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    startLoop();

    // Integrate with anchor links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a[href^='#']");
      if (anchor) {
        const href = anchor.getAttribute("href");
        if (href && href !== "#") {
          const el = document.querySelector(href);
          if (el) {
            e.preventDefault();
            lenis.scrollTo(el as HTMLElement, { offset: -80 });
          }
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);

    return () => {
      stopLoop();
      lenis.destroy();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      document.removeEventListener("click", handleAnchorClick);
    };
  }, []);
};

export default useSmoothScroll;
