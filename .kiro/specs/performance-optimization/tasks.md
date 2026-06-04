# Implementation Plan: Performance Optimization

## Overview

15 targeted structural optimizations across 11 files. No UI, layout, or content changes. All tasks are file-specific and build on the previous step. Testing framework uses Vitest + fast-check + postcss + node-html-parser.

## Tasks

- [ ] 1. Install test dependencies and set up test infrastructure
  - Add `fast-check`, `node-html-parser`, and `@testing-library/react` to `devDependencies` in `package.json` if not already present (postcss is already installed via Tailwind)
  - Create `src/__tests__/` directory by adding the first test file
  - Verify `vitest` is configured in `vite.config.ts` with a `test` block that includes `globals: true` and `environment: "jsdom"`
  - _Requirements: All test-related requirements_

- [ ] 2. Expand `manualChunks` in `vite.config.ts`
  - [ ] 2.1 Replace the existing object-form `manualChunks` with a function form
    - Remove the current `manualChunks` object (which has `react-vendor`, `motion`, and partial `ui-vendor` entries)
    - Add function-form `manualChunks(id: string)` that returns: `"radix-ui"` for any `id` containing `node_modules/@radix-ui/`, `"react-vendor"` for `react/`, `react-dom/`, `react-router-dom/`, `"motion"` for `framer-motion/` and `lenis/`, `"query"` for `@tanstack/react-query`, `"icons"` for `lucide-react/`, `"charts"` for `recharts/`, `"supabase"` for `@supabase/supabase-js/`
    - Return `undefined` implicitly for all other module IDs
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 6.6_

  - [ ]* 2.2 Write property test for Radix chunk routing (Property 4)
    - **Property 4: Bundle chunk routing — Radix UI wildcard**
    - Create `src/__tests__/vite.config.test.ts`
    - Import the `manualChunks` function from `vite.config.ts` (export it or extract it)
    - Use `fc.constantFrom(...allRadixPackages)` to generate random `@radix-ui/*` package node_modules paths and assert return value is `"radix-ui"`
    - **Validates: Requirements 6.1**

  - [ ]* 2.3 Write unit tests for specific chunk name correctness
    - In `src/__tests__/vite.config.test.ts`, add example-based assertions for `@tanstack/react-query` → `"query"`, `lucide-react` → `"icons"`, `recharts` → `"charts"`, `@supabase/supabase-js` → `"supabase"`
    - _Requirements: 6.2, 6.3, 6.4, 6.5_

- [ ] 3. Lazy-load `Index` page in `App.tsx`
  - [ ] 3.1 Convert `Index` from eager to lazy import in `src/App.tsx`
    - Remove the top-level `import Index from "./pages/Index"` statement
    - Add `const Index = lazy(() => import("./pages/Index"))` alongside the other `lazy()` calls
    - Confirm the existing `<Suspense fallback={<div className="min-h-screen bg-background" />}>` wrapper is in place around `<Routes>`; no change needed if it is
    - _Requirements: 5.1, 5.2, 5.3_

  - [ ]* 3.2 Write unit test confirming Index is a lazy component
    - Create `src/__tests__/App.test.tsx`
    - Import `Index` (via dynamic import of `App.tsx` internals or by directly importing the lazy constant) and assert `(Index as any).$$typeof === Symbol.for("react.lazy")` or equivalent
    - _Requirements: 5.1_

- [ ] 4. Update `index.html` — fonts, HubSpot, favicon preload
  - [ ] 4.1 Add Google Fonts `<link rel="stylesheet">` tag to `index.html`
    - Locate the two existing `<link rel="preconnect">` tags in `<head>`
    - Immediately after them, add `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap" />`
    - Ensure the preconnect tags remain directly before this new `<link>` tag
    - _Requirements: 7.1, 7.3, 7.4_

  - [ ] 4.2 Fix HubSpot script protocol in `index.html`
    - Find the `<script>` tag whose `src` begins with `//js-na2.hs-scripts.com/245585866.js`
    - Replace with `https://js-na2.hs-scripts.com/245585866.js`
    - _Requirements: 11.1_

  - [ ] 4.3 Remove favicon preload from `index.html`
    - Find and delete `<link rel="preload" as="image" href="/favicon.png" />`
    - Do not add any replacement preload (hero image URL is not statically known at parse time)
    - _Requirements: 15.1, 15.3_

  - [ ]* 4.4 Write unit tests for `index.html` structure
    - Create `src/__tests__/index.html.test.ts`
    - Parse `index.html` with `node-html-parser`
    - Assert: `<link rel="stylesheet">` pointing to `fonts.googleapis.com` is present; preconnect tags appear before the stylesheet link; HubSpot `<script src>` starts with `https://`; no `<link rel="preload" href="/favicon.png">` exists
    - **Property 5: Google Fonts URL completeness** — assert the `href` contains `family=Space+Grotesk:wght@300;400;500;600;700`, `family=Inter:wght@300;400;500;600;700`, and `display=swap`
    - **Validates: Requirements 7.1, 7.3, 7.4, 11.1, 15.1**

- [ ] 5. Remove Google Fonts `@import` from `src/index.css`
  - [ ] 5.1 Delete the `@import url('https://fonts.googleapis.com/...')` line from the top of `src/index.css`
    - Remove the entire `@import url(...)` line; no other line should be modified
    - _Requirements: 7.2_

- [ ] 6. Clean up global CSS in `src/index.css`
  - [ ] 6.1 Remove global `backface-visibility: hidden` rule from `src/index.css`
    - Delete the entire `*, *::before, *::after { -webkit-backface-visibility: hidden; backface-visibility: hidden; }` rule block
    - Leave the existing `img, video { backface-visibility: visible; -webkit-backface-visibility: visible; }` rule in place (it becomes a no-op but is harmless)
    - _Requirements: 9.1_

  - [ ] 6.2 Update `contain-intrinsic-size` from `600px` to `900px` in `src/index.css`
    - Find the rule `main > section, main > div > section { content-visibility: auto; contain-intrinsic-size: 1px 600px; }`
    - Change `1px 600px` to `1px 900px`
    - _Requirements: 10.1, 10.2_

  - [ ] 6.3 Move `will-change` on `.hover-lift` from default state to `:hover` state in `src/index.css`
    - Remove `will-change: transform, box-shadow` from the `.hover-lift` rule
    - Add a `.hover-lift:hover` rule (or extend the existing one if present) that includes `will-change: transform, box-shadow`
    - Ensure the existing `transform: translateY(-6px) translateZ(0)` and `box-shadow` declaration remain inside `.hover-lift:hover`
    - _Requirements: 13.1, 13.2_

  - [ ]* 6.4 Write unit tests for `index.css` rules
    - Create `src/__tests__/index.css.test.ts`
    - Parse `src/index.css` using `postcss` and walk the AST
    - Assert: no rule with selector `*` or `*::before` or `*::after` contains a `backface-visibility` declaration; `contain-intrinsic-size: 1px 900px` is present; `.hover-lift` rule does NOT have `will-change`; `.hover-lift:hover` rule DOES have `will-change: transform, box-shadow`
    - _Requirements: 9.1, 10.2, 13.1, 13.2_

- [ ] 7. Checkpoint — verify build passes and CSS tests pass
  - Run `npx vitest --run` to confirm tests from steps 2–6 pass
  - Run `npx vite build` (or check no TypeScript errors) to confirm `vite.config.ts` and `App.tsx` changes compile cleanly
  - Ensure all tests pass; ask the user if questions arise.

- [ ] 8. Gate infinite animations in `CtaSection.tsx`
  - [ ] 8.1 Add viewport-awareness and reduced-motion gate to `src/components/CtaSection.tsx`
    - Add `import { useRef } from "react"` (if not already imported)
    - Add `import { useInView } from "framer-motion"` (if not already imported)
    - Add `const sectionRef = useRef<HTMLDivElement>(null)` at the top of the component body
    - Attach `ref={sectionRef}` to the outer `<section>` element
    - Add `const isInView = useInView(sectionRef, { once: false, margin: "-50px" })`
    - Add `const reducedMotion = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches`
    - Add `const shouldAnimate = isInView && !reducedMotion`
    - For each of the 9 `Infinity`-repeating elements (2 blobs, 6 particles, 1 shimmer): replace the `animate` prop with a conditional — keyframe array when `shouldAnimate` is true, static single-value when false; replace `repeat: Infinity` with `repeat: shouldAnimate ? Infinity : 0`
    - _Requirements: 1.1, 1.2, 1.3, 1.4_

  - [ ]* 8.2 Write property tests for CtaSection animation gate (Properties 1 & 2)
    - Create `src/__tests__/CtaSection.test.tsx`
    - Mock `useInView` and `window.matchMedia` to inject controlled `isInView` / `reducedMotion` values
    - **Property 1: Animation gate inactive when off-screen or reduced-motion** — Use `fc.boolean()` for `reducedMotion` with `isInView: false` (and `isInView` boolean with `reducedMotion: true`); for each rendered element with `repeat: Infinity`, assert the `animate` prop is a single static value (not an array) and `transition.repeat` is 0 or absent
    - **Property 2: Animation gate active when in viewport and motion allowed** — With `isInView: true` and `reducedMotion: false`, assert each element's `animate` prop is an array and `transition.repeat` is `Infinity`
    - **Validates: Requirements 1.1, 1.2, 1.4, 2.1, 2.2**

- [ ] 9. Gate infinite animation in `LeadMagnetSection.tsx`
  - [ ] 9.1 Add viewport-awareness gate to `src/components/LeadMagnetSection.tsx`
    - Add `import { useRef } from "react"` (if not already imported)
    - Add `import { useInView } from "framer-motion"` (if not already imported)
    - Add `const sectionRef = useRef<HTMLDivElement>(null)` at the top of the component body
    - Attach `ref={sectionRef}` to the outer `<section>` element
    - Add `const isInView = useInView(sectionRef, { once: false, margin: "-50px" })`
    - For the glow blob `motion.div`: change `animate` to `isInView ? { scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] } : { scale: 1, opacity: 0.5 }` and change `transition` to `{ duration: 4, repeat: isInView ? Infinity : 0, ease: "easeInOut" }`
    - _Requirements: 2.1, 2.2, 2.3_

- [ ] 10. Replace non-composited `left` animation with `x` in `ProcessSection.tsx`
  - [ ] 10.1 Update the `TimelineLine` dot animation to use composited `x` in `src/components/ProcessSection.tsx`
    - Locate the `TimelineLine` component and find the animated dot `motion.div`
    - Remove `initial={{ left: "5%" }}` and `animate={{ left: "95%" }}` from the dot
    - Add `style={{ left: 0 }}` as a static inline style to anchor the dot at the left edge
    - Add `initial={{ x: 0 }}` and `animate={{ x: "calc(100% - 8px)" }}` to the dot's Framer Motion props
    - Retain the existing `transition={{ duration: 2.5, ease: "easeInOut", delay: 0.8 }}` unchanged
    - _Requirements: 3.1, 3.2, 3.3_

  - [ ]* 10.2 Write unit test confirming dot uses `x` not `left`
    - Create `src/__tests__/ProcessSection.test.tsx`
    - Render `ProcessSection` with `useInView` mocked to return `true`
    - Find the dot element and assert its Framer Motion `animate` prop contains an `x` key and does NOT contain a `left` key
    - _Requirements: 3.1_

- [ ] 11. Update `PortfolioSection.tsx` image attributes
  - [ ] 11.1 Add `loading`, `decoding`, `width`, `height` attributes and reduce Unsplash image width in `src/components/PortfolioSection.tsx`
    - In the `projects` array, change every Unsplash URL from `w=800` to `w=600` (3 URLs total)
    - On the `<img>` element, add `loading="lazy"`, `decoding="async"`, `width={600}`, `height={400}`
    - Leave all existing `className` and `alt` props unchanged
    - _Requirements: 8.1, 8.2, 8.3, 8.4_

  - [ ]* 11.2 Write property test for PortfolioSection image attributes (Property 3)
    - Create `src/__tests__/PortfolioSection.test.tsx`
    - Render `PortfolioSection` and query all `<img>` elements
    - **Property 3: PortfolioSection image attributes completeness** — Use `fc.integer({ min: 0, max: 2 })` to index into rendered images; for each, assert `loading === "lazy"`, `decoding === "async"`, `width` and `height` attributes are present, and `src` contains `w=600` and does not contain `w=800`
    - **Validates: Requirements 8.1, 8.2, 8.3, 8.4**

- [ ] 12. Pause Lenis RAF loop on tab visibility change in `useSmoothScroll.ts`
  - [ ] 12.1 Refactor `src/hooks/useSmoothScroll.ts` to track `rafId` and handle `visibilitychange`
    - Replace the current unconditional `requestAnimationFrame(raf)` pattern with a `rafId: number | null` variable initialized to `null`
    - Extract `startLoop` function: guard with `if (rafId === null)`, then set `rafId = requestAnimationFrame(raf)`; inside `raf`, update `rafId = requestAnimationFrame(raf)` each callback
    - Extract `stopLoop` function: guard with `if (rafId !== null)`, call `cancelAnimationFrame(rafId)`, set `rafId = null`
    - Add `handleVisibilityChange` function: call `stopLoop()` when `document.visibilityState === "hidden"`, call `startLoop()` when `"visible"`
    - Add `document.addEventListener("visibilitychange", handleVisibilityChange)` after `startLoop()` initial call
    - In the existing `useEffect` cleanup (`return () => { ... }`), call `stopLoop()` before `lenis.destroy()`, and add `document.removeEventListener("visibilitychange", handleVisibilityChange)`
    - _Requirements: 12.1, 12.2, 12.3, 12.4_

  - [ ]* 12.2 Write property test for Lenis RAF visibility invariant (Property 6)
    - Create `src/__tests__/useSmoothScroll.test.ts`
    - Mock `requestAnimationFrame`, `cancelAnimationFrame`, and `Lenis`
    - **Property 6: Lenis RAF loop visibility invariant** — Use `fc.array(fc.constantFrom("hidden", "visible"), { minLength: 1, maxLength: 20 })` to generate random sequences of visibility state changes; after each event, assert RAF is running (`rafId !== null` / `requestAnimationFrame` was called and not cancelled) when state is `"visible"`, and stopped when `"hidden"`
    - **Validates: Requirements 12.1, 12.2, 12.4**

  - [ ]* 12.3 Write unit test confirming `visibilitychange` listener is registered and cleaned up
    - In `src/__tests__/useSmoothScroll.test.ts`, spy on `document.addEventListener` and `document.removeEventListener`
    - Mount the hook, assert `addEventListener` was called with `"visibilitychange"`
    - Unmount the hook, assert `removeEventListener` was called with `"visibilitychange"`
    - _Requirements: 12.3_

- [ ] 13. Add coarse-pointer guard to `TiltCard` in `ServicesSection.tsx`
  - [ ] 13.1 Add `window.matchMedia("(pointer: coarse)")` detection to `TiltCard` in `src/components/ServicesSection.tsx`
    - Add `const isCoarsePointer = typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches` at the top of the `TiltCard` component body
    - Change `onMouseMove` handler assignment to: `const handleMouse = isCoarsePointer ? undefined : (e: React.MouseEvent) => { ... }`
    - Change `onMouseLeave` handler assignment to: `const handleLeave = isCoarsePointer ? undefined : () => { ... }`
    - Change the `style` prop on the `motion.div` to conditionally omit `rotateX` and `rotateY` when `isCoarsePointer` is true: `style={isCoarsePointer ? { transformStyle: "preserve-3d", perspective: 800 } : { rotateX, rotateY, transformStyle: "preserve-3d", perspective: 800 }}`
    - Conditionally render the glare `motion.div` only when `!isCoarsePointer`
    - Keep all motion values (`x`, `y`, `rotateX`, `rotateY`, `glareOpacity`) initialized unconditionally (Hook call count must not change)
    - _Requirements: 14.1, 14.2, 14.3_

  - [ ]* 13.2 Write property test for TiltCard coarse-pointer handler suppression (Property 7)
    - Create `src/__tests__/ServicesSection.test.tsx`
    - Mock `window.matchMedia` to return `{ matches: true }` for `"(pointer: coarse)"`
    - **Property 7: TiltCard coarse-pointer handler suppression** — Render a `TiltCard`, find the root `motion.div`, assert `onMouseMove` is `undefined`, `onMouseLeave` is `undefined`, and neither `rotateX` nor `rotateY` is in the `style` prop
    - Mock `window.matchMedia` to return `{ matches: false }` and assert `onMouseMove` is defined (fine pointer test)
    - **Validates: Requirements 14.1, 14.2, 14.3**

- [ ] 14. Checkpoint — run full test suite and type check
  - Run `npx vitest --run` to confirm all tests pass
  - Run `npx tsc --noEmit` to confirm no TypeScript errors introduced
  - Ensure all tests pass; ask the user if questions arise.

- [ ] 15. Confirm HeroSection requires no changes
  - [ ] 15.1 Audit `src/components/HeroSection.tsx` and confirm no `repeat: Infinity` transitions exist
    - Open `HeroSection.tsx` and verify every `motion.span` and `motion.div` targets a final static state (no looping keyframe array)
    - Confirm no `whileInView` element is missing `viewport: { once: true }` — if any are found, add `viewport={{ once: true }}`
    - No file modification is expected; this task is complete when the audit confirms the design document's conclusion
    - _Requirements: 4.1, 4.2, 4.3_

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP delivery
- All changes are zero-UI-impact: no visual, layout, or routing differences
- The design document already specifies exact code snippets for each change; refer to it during implementation
- `fast-check` and `node-html-parser` must be installed before running tests (task 1)
- The `manualChunks` function must be exported from `vite.config.ts` to be unit-testable (task 2.2)
- Checkpoints at tasks 7 and 14 validate incremental progress before moving to the next group

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["2.1", "3.1", "4.1", "4.2", "4.3", "5.1", "6.1", "6.2", "6.3"] },
    { "id": 1, "tasks": ["2.2", "2.3", "3.2", "4.4", "6.4", "8.1", "9.1", "10.1", "11.1", "12.1", "13.1", "15.1"] },
    { "id": 2, "tasks": ["8.2", "10.2", "11.2", "12.2", "12.3", "13.2"] }
  ]
}
```
