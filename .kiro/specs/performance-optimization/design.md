# Design Document — Performance Optimization

## Overview

This document describes the implementation plan for 15 targeted performance improvements to the Code Reflections Vite + React + TypeScript SPA. All changes are structural optimizations with zero impact on UI, layout, content, branding, routing, or user-visible functionality.

**Goals:**
- Reduce Time to Interactive (TTI) by code-splitting the Index page and expanding vendor chunking
- Reduce runtime GPU/CPU overhead by gating infinite animations to viewport visibility and respecting `prefers-reduced-motion`
- Eliminate layout-reflow-causing CSS animations by replacing non-composited `left` with composited `transform` in `TimelineLine`
- Reduce unnecessary compositor layers by removing global `backface-visibility: hidden` and scoping `will-change` to hover state only
- Improve image loading by adding lazy/async attributes and reducing Unsplash bandwidth usage
- Fix resource-loading order by moving Google Fonts from CSS `@import` to `<link>` in `<head>`
- Preserve CPU/battery on hidden tabs by pausing Lenis RAF loop on `visibilitychange`
- Avoid wasting a preload slot on the favicon; free it for render-critical resources

**Affected files:**
| File | Change category |
|---|---|
| `src/components/CtaSection.tsx` | Animation gating |
| `src/components/LeadMagnetSection.tsx` | Animation gating |
| `src/components/ProcessSection.tsx` | Non-composited → composited animation |
| `src/components/HeroSection.tsx` | Confirmation / no change needed |
| `src/components/PortfolioSection.tsx` | Image loading attributes |
| `src/components/ServicesSection.tsx` | Touch-device optimization |
| `src/App.tsx` | Lazy-load Index page |
| `src/hooks/useSmoothScroll.ts` | Lenis RAF pause on hidden tab |
| `src/index.css` | CSS clean-up (global rules) |
| `vite.config.ts` | `manualChunks` expansion |
| `index.html` | Font loading, HubSpot URL, favicon preload |

---

## Architecture

The codebase is a Vite-bundled React SPA. There is no backend or server-side rendering involved in any of these changes. The optimization targets fall into four architectural layers:

```
┌─────────────────────────────────────────────────────────┐
│  HTML (index.html)                                      │
│  → Resource hints, font loading, script URLs            │
├─────────────────────────────────────────────────────────┤
│  CSS (index.css)                                        │
│  → Global compositor hints, content-visibility sizes   │
├─────────────────────────────────────────────────────────┤
│  React Components (src/components/)                     │
│  → Animation gating, image attrs, touch detection      │
├─────────────────────────────────────────────────────────┤
│  Build Config (vite.config.ts) + App Shell (App.tsx)    │
│  → Bundle splitting, lazy-loaded routes                 │
└─────────────────────────────────────────────────────────┘
```

No new dependencies are introduced. All viewport detection uses Framer Motion's `useInView`, which is already imported everywhere it is needed. `window.matchMedia` is used for media-query detection in `TiltCard` and `useSmoothScroll`.

---

## Components and Interfaces

### 1. `CtaSection.tsx` — Animation Gating

**Current problem:** Three groups of elements (`motion.div` blobs ×2, particle `motion.div` ×6, shimmer `motion.span` ×1) run `repeat: Infinity` animations continuously, including when the section is far off-screen.

**Design:**
- Add `useRef<HTMLDivElement>` on the outer `<section>` element.
- Call `useInView(ref, { once: false, margin: "-50px" })` to get a reactive `isInView` boolean.
- Read `window.matchMedia("(prefers-reduced-motion: reduce)").matches` once at component render time (not inside `useEffect`) and store in a `reducedMotion` const.
- Derive a combined gate: `const shouldAnimate = isInView && !reducedMotion`.
- Pass `animate={shouldAnimate ? <active-variant> : <static-variant>}` to every `Infinity`-repeating element.

**Code-level detail:**

```tsx
// New imports
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const CtaSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-50px" });
  const reducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const shouldAnimate = isInView && !reducedMotion;

  return (
    <section ref={sectionRef} className="py-28 relative overflow-hidden noise-overlay">
      {/* ... */}
      {/* Blob 1 */}
      <motion.div
        className="absolute top-1/2 left-1/2 ..."
        animate={shouldAnimate ? {
          scale: [1, 1.2, 0.9, 1.1, 1],
          x: [0, 50, -30, 20, 0],
          y: [0, -30, 20, -10, 0],
          borderRadius: ["50%", "40% 60% 50% 50%", "50% 40% 60% 50%", "60% 50% 40% 50%", "50%"],
        } : { scale: 1, x: 0, y: 0, borderRadius: "50%" }}
        transition={{ duration: 12, ease: "easeInOut", repeat: shouldAnimate ? Infinity : 0 }}
      />
      {/* Blob 2, particles ×6, shimmer: same pattern */}
      {/* ... */}
    </section>
  );
};
```

Key: when `shouldAnimate` is `false`, each element gets a single static target (no array keyframes, `repeat: 0`), so Framer Motion reaches the target instantly and stops scheduling frames.

---

### 2. `LeadMagnetSection.tsx` — Animation Gating

**Current problem:** The background glow `motion.div` inside the card runs `scale`/`opacity` `repeat: Infinity` unconditionally.

**Design:**
- Add `useRef<HTMLDivElement>` on the outer `<section>`.
- Call `useInView(ref, { once: false, margin: "-50px" })`.
- Conditionally pass animated vs. static `animate` prop, same pattern as CtaSection.

```tsx
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const LeadMagnetSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-50px" });

  return (
    <section ref={sectionRef} className="py-28 relative">
      {/* ... */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] ..."
        animate={isInView
          ? { scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }
          : { scale: 1, opacity: 0.5 }}
        transition={{ duration: 4, repeat: isInView ? Infinity : 0, ease: "easeInOut" }}
      />
      {/* ... */}
    </section>
  );
};
```

---

### 3. `ProcessSection.tsx` — Replace Non-Composited `left` with `x`

**Current problem:** The `TimelineLine` dot is animated via `left: "5%" → left: "95%"`. `left` is a non-composited property — it triggers layout recalculation on every frame.

**Design:**
- Remove `initial={{ left: "5%" }}` and `animate={{ left: "95%" }}`.
- The dot is absolutely positioned in a container where `left: 0` / `right: 0` spans the full line width. Use the container's width to compute the travel distance. The cleaner approach: position the dot at `left: 0` initially, then animate `x` from `0` to the container width minus the dot width. Since the container is 100% of the timeline, the exact pixel value is not known at render time.
- **Practical Framer Motion approach:** Use `x: "0%"` → `x: "calc(100% - 8px)"` on a wrapper that is 100% wide, OR simply set `left: 0` statically and animate `translateX` from `0%` to `calc(100% - 8px)`.
- The most idiomatic approach without JS measurement: wrap the dot in a full-width relative container and animate `x` from `0` to the string `"calc(100% - 8px)"` — Framer Motion supports CSS string values in the `x` motion value when the element has a known size.

**Code-level detail for `TimelineLine`:**

```tsx
const TimelineLine = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="hidden md:block absolute top-[28px] left-0 right-0 h-px z-0">
      <motion.div
        className="h-full w-full"
        style={{
          background: "linear-gradient(90deg, transparent 5%, hsl(250 60% 58% / 0.3) 20%, ...)",
          transformOrigin: "left",
        }}
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.3 }}
      />
      {/* Dot: use x instead of left */}
      {isInView && (
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-secondary shadow-glow-sm"
          style={{ left: 0 }}          // ← static position anchor
          initial={{ x: 0 }}
          animate={{ x: "calc(100% - 8px)" }}   // ← composited transform
          transition={{ duration: 2.5, ease: "easeInOut", delay: 0.8 }}
        />
      )}
    </div>
  );
};
```

> **Why `calc(100% - 8px)`:** The parent `div` is `left-0 right-0` (100% of the timeline container width). The dot is 8 px (`w-2`). Starting at `left: 0, x: 0` and ending at `x: calc(100% - 8px)` puts the right edge of the dot at the right edge of the container, mirroring the original `left: 5% → 95%` intent while only touching a composited property.

> **Alternative if string `calc` causes issues:** Use a `useEffect` + `useMotionValue` to measure `ref.current.offsetWidth` and animate to `containerWidth - 8`. This is more reliable across browsers and is the fallback approach.

---

### 4. `HeroSection.tsx` — Confirmation (No Changes Required)

**Audit findings:**
- All `motion.span` / `motion.div` word animations use `animate` (not `whileInView`), targeting `{ opacity: 1, y: 0, filter: "blur(0px)" }` — these are one-shot entrance animations.
- No element has `repeat: Infinity` or `repeat: >0` in its `transition`.
- The `<span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />` badge pulse uses a CSS class (`animate-pulse` from Tailwind). However, the global CSS in `index.css` already has `.animate-pulse-glow { animation: none !important; }` — note this is `animate-pulse-glow`, not Tailwind's `animate-pulse`. Tailwind's `animate-pulse` is a separate keyframe and is **not** suppressed.
- The CTA button uses `className="... animate-pulse-glow"` — this is suppressed by the global `animation: none !important` rule.
- The badge `animate-pulse` (Tailwind) runs continuously. However, it is a tiny element and Tailwind's `animate-pulse` only animates `opacity` — a compositor-only property that does not cause layout or paint. This is acceptable and requires no change.
- No `whileInView` elements in `HeroSection` need `viewport: { once: true }` because all entrance animations are plain `animate`, not `whileInView`.

**Conclusion:** Requirement 4 is already satisfied by the existing implementation. The design document confirms no code changes are needed for `HeroSection.tsx`.

---

### 5. `App.tsx` — Lazy-Load Index Page

**Current state:** `Index` is imported eagerly:
```tsx
import Index from "./pages/Index";
```
All other pages are already lazy. The `<Suspense>` fallback is already in place.

**Change:**
```tsx
// Remove eager import:
// import Index from "./pages/Index";

// Add lazy import alongside the other lazy pages:
const Index = lazy(() => import("./pages/Index"));
```

No other changes required. The existing `<Suspense fallback={<div className="min-h-screen bg-background" />}>` already wraps `<Routes>`, so `Index` will automatically use it.

---

### 6. `vite.config.ts` — Expand `manualChunks`

**Current state:** `manualChunks` has four entries covering `react-vendor`, `motion`, and a partial `ui-vendor` with only four Radix packages.

**Design:** Replace the object-form `manualChunks` with a **function form** so any `@radix-ui/*` package is caught by a wildcard match rather than requiring an exhaustive list. This is the idiomatic Rollup approach and is forward-compatible with new Radix packages.

```ts
manualChunks(id: string) {
  // Radix UI — match all 25+ @radix-ui/* packages
  if (id.includes("node_modules/@radix-ui/")) return "radix-ui";
  // React ecosystem
  if (id.includes("node_modules/react/") ||
      id.includes("node_modules/react-dom/") ||
      id.includes("node_modules/react-router-dom/")) return "react-vendor";
  // Animation
  if (id.includes("node_modules/framer-motion/") ||
      id.includes("node_modules/lenis/")) return "motion";
  // Data fetching
  if (id.includes("node_modules/@tanstack/react-query")) return "query";
  // Icons
  if (id.includes("node_modules/lucide-react/")) return "icons";
  // Charts
  if (id.includes("node_modules/recharts/")) return "charts";
  // Supabase
  if (id.includes("node_modules/@supabase/supabase-js/")) return "supabase";
  // Return undefined for everything else (Rollup default)
}
```

> **Note on `ui-vendor`:** The old `ui-vendor` chunk is superseded by the new `radix-ui` chunk that covers all Radix packages via the wildcard check. There is no need to retain a separate `ui-vendor` key.

---

### 7. `index.html` — Google Fonts, HubSpot, Favicon Preload

Three separate changes to the same file:

**7a. Google Fonts: move from `@import` (in `index.css`) to `<link>` in `<head>`**

Add after the existing preconnect tags:
```html
<link rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap" />
```

The two `<link rel="preconnect">` tags already present must be retained immediately before this tag:
```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?..." />
```

**7b. HubSpot script: replace `//js-na2.hs-scripts.com/...` with `https://js-na2.hs-scripts.com/...`**

Current:
```html
<script ... src="//js-na2.hs-scripts.com/245585866.js"></script>
```
Replace with:
```html
<script ... src="https://js-na2.hs-scripts.com/245585866.js"></script>
```

**7c. Remove favicon preload**

Current:
```html
<link rel="preload" as="image" href="/favicon.png" />
```
Remove entirely. The hero background image (`src/assets/hero-bg.jpg`) is imported via a JS module and gets a content-hash URL at build time (`/assets/hero-bg-XXXXXXXX.jpg`), so its final URL is not known at HTML parse time. Per requirement 15.3, no replacement preload is added.

---

### 8. `index.css` — CSS Clean-Up

Four targeted changes:

**8a. Remove `@import` for Google Fonts (top of file)**

Remove:
```css
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap');
```

**8b. Remove global `backface-visibility: hidden`**

Remove the entire rule:
```css
*, *::before, *::after {
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}
```
Keep the existing exception rule:
```css
img, video {
  backface-visibility: visible;
  -webkit-backface-visibility: visible;
}
```
(This rule becomes a no-op after the global rule is removed, but it is harmless to leave it or remove it too.)

**8c. Change `contain-intrinsic-size` from `600px` to `900px`**

Current:
```css
main > section,
main > div > section {
  content-visibility: auto;
  contain-intrinsic-size: 1px 600px;
}
```
Change to:
```css
main > section,
main > div > section {
  content-visibility: auto;
  contain-intrinsic-size: 1px 900px;
}
```

**8d. Move `will-change` on `.hover-lift` to `:hover` state only**

Current:
```css
.hover-lift {
  @apply transition-all duration-700 ease-out;
  will-change: transform, box-shadow;     /* ← remove from here */
}
```
Updated:
```css
.hover-lift {
  @apply transition-all duration-700 ease-out;
  /* will-change removed from default state */
}

.hover-lift:hover {
  will-change: transform, box-shadow;     /* ← add here */
  transform: translateY(-6px) translateZ(0);
  box-shadow: 0 20px 40px hsl(0 0% 0% / 0.25), 0 0 30px hsl(250 60% 58% / 0.08);
}
```

---

### 9. `PortfolioSection.tsx` — Image Attributes

**Current state:** `<img src={project.image} alt={project.title} className="..." />`

**Changes per image:**

```tsx
<img
  src={project.image}       // already has w=800 in the URL — change to w=600
  alt={project.title}
  loading="lazy"            // ← new
  decoding="async"          // ← new
  width={600}               // ← new (matches new Unsplash width param)
  height={400}              // ← new (3:2 aspect ratio for h-48 = 192px display height)
  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
/>
```

**URL change in the `projects` array:** Replace `w=800` with `w=600` in all three Unsplash image URLs:

```ts
// Before
"https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80"
// After
"https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=600&q=80"
```

Apply to all three project image URLs.

---

### 10. `useSmoothScroll.ts` — Lenis RAF Pause on Tab Hide

**Current problem:** The Lenis RAF loop calls `requestAnimationFrame(raf)` unconditionally inside the callback, meaning it runs forever even when the browser tab is hidden.

**Design:** Track whether the loop should be running via a flag. On `visibilitychange`, stop or restart accordingly.

```ts
const useSmoothScroll = () => {
  useEffect(() => {
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const lenis = new Lenis({
      duration: 0.9,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: !reduced,
      touchMultiplier: 1.5,
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
    startLoop(); // initial start

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
```

**Key points:**
- `rafId` is tracked so `cancelAnimationFrame` can stop the loop cleanly.
- `startLoop` guards against double-starting.
- The cleanup function calls `stopLoop()` before `lenis.destroy()` to ensure no orphaned RAF callbacks fire after destroy.

---

### 11. `ServicesSection.tsx` — TiltCard Touch Detection

**Current problem:** On touch/coarse-pointer devices, `onMouseMove` and `onMouseLeave` fire unreliably (or not at all) but the Framer Motion motion values (`rotateX`, `rotateY`, `glareOpacity`) and spring hooks are initialized regardless, creating unnecessary reactive graph entries.

**Design:**
- Detect at component render time whether the pointer is coarse using `window.matchMedia("(pointer: coarse)").matches`.
- If coarse, skip attaching `onMouseMove` / `onMouseLeave` handlers entirely (pass `undefined`).
- Keep the motion values initialized (removing them would require a Hook call-count change), but since they stay at zero and no handler updates them, no spring computations fire.
- Optionally (recommended): skip applying `rotateX`, `rotateY` to `style` on coarse devices to prevent Framer Motion from subscribing to those values at all.

```tsx
const TiltCard = ({ children, className, delay }: { children: React.ReactNode; className?: string; delay: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 30 });
  const glareOpacity = useSpring(0, { stiffness: 300, damping: 30 });

  // Detect coarse pointer once at render time (SSR-safe)
  const isCoarsePointer =
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: coarse)").matches;

  const handleMouse = isCoarsePointer ? undefined : (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
    glareOpacity.set(0.15);
  };

  const handleLeave = isCoarsePointer ? undefined : () => {
    x.set(0);
    y.set(0);
    glareOpacity.set(0);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      // Only apply tilt transforms on fine-pointer devices
      style={
        isCoarsePointer
          ? { transformStyle: "preserve-3d", perspective: 800 }
          : { rotateX, rotateY, transformStyle: "preserve-3d", perspective: 800 }
      }
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      className={className}
    >
      {children}
      {/* Only render glare layer on fine-pointer devices */}
      {!isCoarsePointer && (
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            opacity: glareOpacity,
            background: "linear-gradient(135deg, hsl(250 60% 58% / 0.3), transparent 60%)",
          }}
        />
      )}
    </motion.div>
  );
};
```

---

## Data Models

No new data models are introduced. The following existing state patterns are affected:

**Animation gate state (CtaSection, LeadMagnetSection):**
- `isInView: boolean` — derived from Framer Motion `useInView` hook, reactive to IntersectionObserver.
- `reducedMotion: boolean` — evaluated once at render from `window.matchMedia`.
- `shouldAnimate: boolean` — computed as `isInView && !reducedMotion`. Drives `animate` prop values.

**RAF loop state (useSmoothScroll):**
- `rafId: number | null` — mutable ref tracking the active `requestAnimationFrame` handle.

**Pointer type (TiltCard):**
- `isCoarsePointer: boolean` — evaluated once at render from `window.matchMedia("(pointer: coarse)")`.

**Bundle chunks (vite.config.ts):**
| Chunk name | Packages |
|---|---|
| `react-vendor` | `react`, `react-dom`, `react-router-dom` |
| `motion` | `framer-motion`, `lenis` |
| `radix-ui` | All `@radix-ui/*` packages (25+) |
| `query` | `@tanstack/react-query` |
| `icons` | `lucide-react` |
| `charts` | `recharts` |
| `supabase` | `@supabase/supabase-js` |

---

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system — essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Animation gate — inactive when off-screen or reduced-motion

*For any* combination of `isInView` (false) or `reducedMotion` (true), every `Infinity`-repeating motion element in `CtaSection` and `LeadMagnetSection` SHALL have its `animate` prop set to a static single-value state (no keyframe array, `repeat` = 0 or absent), so no looping animation frame is scheduled.

**Validates: Requirements 1.1, 1.4, 2.1**

### Property 2: Animation gate — active when in viewport and motion allowed

*For any* state where `isInView` is true and `reducedMotion` is false, every `Infinity`-repeating motion element in `CtaSection` and `LeadMagnetSection` SHALL have its `animate` prop set to the keyframe array variant with `repeat: Infinity`.

**Validates: Requirements 1.2, 2.2**

### Property 3: PortfolioSection image attributes completeness

*For any* image element rendered by `PortfolioSection`, the element SHALL have `loading="lazy"`, `decoding="async"`, a `width` attribute, a `height` attribute, and an `src` URL containing `w=600` (not `w=800`).

**Validates: Requirements 8.1, 8.2, 8.3, 8.4**

### Property 4: Bundle chunk routing — Radix UI wildcard

*For any* module ID string that contains the substring `node_modules/@radix-ui/`, the `manualChunks` function SHALL return the string `"radix-ui"`.

**Validates: Requirements 6.1**

### Property 5: Google Fonts URL completeness

*For any* `<link rel="stylesheet">` element in `index.html` pointing to `fonts.googleapis.com`, the `href` attribute SHALL contain `family=Space+Grotesk:wght@300;400;500;600;700`, `family=Inter:wght@300;400;500;600;700`, and `display=swap`.

**Validates: Requirements 7.4**

### Property 6: Lenis RAF loop visibility invariant

*For any* sequence of `visibilitychange` events, after each event the RAF loop state SHALL be consistent: running (`rafId !== null`) when `document.visibilityState === "visible"`, stopped (`rafId === null`) when `document.visibilityState === "hidden"`.

**Validates: Requirements 12.1, 12.2, 12.4**

### Property 7: TiltCard coarse-pointer handler suppression

*For any* render of `TiltCard` in an environment where `window.matchMedia("(pointer: coarse)").matches` is true, the rendered `motion.div` SHALL have `onMouseMove` and `onMouseLeave` equal to `undefined`, and `rotateX`/`rotateY` SHALL NOT be present in the `style` prop.

**Validates: Requirements 14.1, 14.2**

---

## Error Handling

### Animation gating (`useInView`)
- `useInView` from Framer Motion uses `IntersectionObserver` internally. If `IntersectionObserver` is not available (very old browsers), Framer Motion falls back gracefully — `isInView` defaults to `false`, meaning animations stay paused. This is acceptable behavior (reduced visual fidelity is preferable to crashes).

### `window.matchMedia` calls
- All `window.matchMedia` calls are guarded with `typeof window !== "undefined"` to avoid SSR/build-time errors. This project does not use SSR, but the guard is defensive practice.
- If `matchMedia` returns `null` (unsupported), the fallback is `false` for `reducedMotion` (animations play) and `false` for `isCoarsePointer` (tilt is enabled). Both are safe defaults.

### Lenis RAF loop (`visibilitychange`)
- The `startLoop` guard (`if (rafId === null)`) prevents double-starting if `visibilitychange` fires `"visible"` while the loop is already running.
- `stopLoop` checks `rafId !== null` before calling `cancelAnimationFrame` to avoid passing `null` to the browser API.
- In cleanup, `stopLoop()` is called before `lenis.destroy()` to ensure the callback does not fire after the Lenis instance is torn down.

### `manualChunks` function form
- Returning `undefined` (implicit, when no condition matches) is the correct Rollup behavior — the module goes into the default chunk. No error handling needed.

### Image attributes
- `width={600}` and `height={400}` are intrinsic size hints. If an image is a different natural aspect ratio, the `object-cover` CSS class handles the display — no layout breakage.

---

## Testing Strategy

### Dual testing approach

Each correctness property above maps to a property-based test. Additionally, example-based unit tests cover specific configuration values, one-off code structure checks, and code-path branching that does not require randomized input.

### Property-based testing

**Library:** [fast-check](https://github.com/dubzzz/fast-check) (TypeScript-native, works with Vitest).

Each property test runs a minimum of 100 iterations.

**Tag format:** `// Feature: performance-optimization, Property N: <property text>`

| Property | Test file | What varies | fast-check arbitraries |
|---|---|---|---|
| P1: Animation gate inactive | `CtaSection.test.tsx` | `isInView: false` or `reducedMotion: true` combinations | `fc.constantFrom(false)` for isInView, `fc.boolean()` for reducedMotion |
| P2: Animation gate active | `CtaSection.test.tsx` | `isInView: true`, `reducedMotion: false` | constant true / false |
| P3: Portfolio image attrs | `PortfolioSection.test.tsx` | All three images checked | iterate `fc.integer({min:0,max:2})` for project index |
| P4: Radix chunk routing | `vite.config.test.ts` | Random `@radix-ui/*` package names | `fc.constantFrom(...allRadixPackages)` |
| P5: Fonts URL completeness | `index.html.test.ts` | Parse link href | static, verified as example |
| P6: Lenis visibility invariant | `useSmoothScroll.test.ts` | Arbitrary sequences of `"hidden"` / `"visible"` events | `fc.array(fc.constantFrom("hidden", "visible"), {minLength: 1, maxLength: 20})` |
| P7: TiltCard coarse handler | `ServicesSection.test.tsx` | coarse=true environment | mock matchMedia |

### Unit / example-based tests

These cover requirements that do not require generalized input:

| Requirement | Test type | File | What is checked |
|---|---|---|---|
| Req 3.1 – dot uses `x` not `left` | Example | `ProcessSection.test.tsx` | `animate` prop of dot element has `x`, not `left` |
| Req 5.1 – Index is lazy | Example | `App.test.tsx` | `typeof Index` is a lazy component (checks `$$typeof`) |
| Req 6.2–6.5 – specific chunk names | Example | `vite.config.test.ts` | `manualChunks` returns correct name for exact IDs |
| Req 7.1–7.3 – fonts in HTML | Example | `index.html.test.ts` | `<link rel="stylesheet">` present; `@import` absent; preconnects precede fonts |
| Req 9.1 – no global backface | Example | `index.css.test.ts` | Parse CSS AST; no `*` rule contains `backface-visibility` |
| Req 10.2 – intrinsic size 900px | Example | `index.css.test.ts` | `contain-intrinsic-size: 1px 900px` present |
| Req 11.1 – HubSpot https | Example | `index.html.test.ts` | script `src` starts with `https://` |
| Req 12.3 – listener cleanup | Example | `useSmoothScroll.test.ts` | `addEventListener` / `removeEventListener` called with `visibilitychange` |
| Req 13.1–13.2 – will-change on :hover only | Example | `index.css.test.ts` | `.hover-lift` has no `will-change`; `.hover-lift:hover` does |
| Req 14.3 – tilt on fine pointer | Example | `ServicesSection.test.tsx` | Fine pointer: `onMouseMove` is defined |
| Req 15.1 – no favicon preload | Example | `index.html.test.ts` | No `<link rel="preload" href="/favicon.png">` in head |

### CSS testing approach
CSS files are tested by parsing them with [postcss](https://postcss.org/) (already in `devDependencies` via Tailwind) and walking the AST to assert presence/absence of specific declarations.

### HTML testing approach
`index.html` is tested by parsing with a lightweight HTML parser (e.g. `node-html-parser`) to assert presence/absence of specific elements and attribute values.

### No integration tests needed
All changes are pure client-side structural modifications with no server interactions, so no integration tests against external services are required.

### Running tests
```bash
# Single run (CI / pre-commit)
npx vitest --run

# Watch mode during development
npx vitest
```
