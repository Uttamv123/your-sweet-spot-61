# Requirements Document

## Introduction

This feature addresses 15 concrete performance issues in the The Code Reflections Vite + React + TypeScript SPA. The goal is to reduce initial load time, Time To Interactive (TTI), runtime GPU/CPU overhead, and layout instability — without changing any UI, layout, content, branding, routing, or functional behaviour. All changes are purely structural optimisations: stopping unnecessary animation work, correcting resource-loading order, splitting bundles more aggressively, and removing CSS rules that hurt rendering performance.

## Glossary

- **Application**: The Vite + React + TypeScript SPA for The Code Reflections agency website.
- **CtaSection**: The `CtaSection.tsx` component containing morphing blob and floating particle animations.
- **LeadMagnetSection**: The `LeadMagnetSection.tsx` component containing an infinite pulsing blob animation.
- **ProcessSection**: The `ProcessSection.tsx` component containing the `TimelineLine` sub-component with an animated dot.
- **TimelineLine**: The animated horizontal timeline component inside `ProcessSection`, including a travelling dot.
- **HeroSection**: The `HeroSection.tsx` entrance animation component for the homepage hero.
- **PortfolioSection**: The `PortfolioSection.tsx` component rendering three Unsplash project images.
- **ServicesSection**: The `ServicesSection.tsx` component with `TiltCard` sub-components.
- **TiltCard**: The interactive 3D tilt card component inside `ServicesSection` that creates `useMotionValue` and `useSpring` hooks per card.
- **Lenis**: The smooth-scroll library (`lenis`) used via the `useSmoothScroll` hook.
- **RAF_Loop**: The `requestAnimationFrame` loop started inside `useSmoothScroll` to drive Lenis.
- **Index_Page**: The `src/pages/Index.tsx` component, the homepage route rendered at `/`.
- **Bundle_Splitter**: The Vite `manualChunks` configuration in `vite.config.ts` that controls code-splitting.
- **Vendor_Chunk**: A named Rollup output chunk grouping third-party libraries.
- **Composited_Property**: A CSS property (e.g. `transform`, `opacity`) that can be animated on the GPU compositor thread without triggering layout or paint.
- **Non_Composited_Property**: A CSS property (e.g. `left`, `top`, `width`) whose animation triggers layout recalculation and reflow.
- **content-visibility**: A CSS property that skips rendering of off-screen elements to improve scroll performance.
- **contain-intrinsic-size**: The CSS hint that tells the browser the estimated size of a `content-visibility: auto` element when off-screen, to avoid layout shift.
- **will-change**: A CSS property that hints to the browser to promote an element to its own compositor layer.
- **IntersectionObserver**: The browser API (or Framer Motion's `useInView` hook) that notifies when an element enters or leaves the viewport.
- **Preload_Slot**: One of the limited number of high-priority resource hints (`<link rel="preload">`) the browser processes on initial parse.

---

## Requirements

### Requirement 1: Stop Off-Screen Infinite Animations — CtaSection

**User Story:** As a site visitor, I want the page to scroll smoothly without the GPU being occupied by off-screen animations, so that frame rate stays high while I read content.

#### Acceptance Criteria

1. WHEN the `CtaSection` is not intersecting the viewport, THE `CtaSection` SHALL suspend all `Infinity`-repeating `animate` transitions on the two blob `motion.div` elements, the six floating particle `motion.div` elements, and the shimmer `motion.span` element.
2. WHEN the `CtaSection` enters the viewport for the first time or subsequently re-enters the viewport, THE `CtaSection` SHALL begin (or restart) the suspended animations only in response to that explicit viewport intersection event, even if the section was already partially visible on page load.
3. THE `CtaSection` SHALL use `useInView` (or equivalent `IntersectionObserver`-based hook) with a `rootMargin` of at least `-50px` to gate animation playback.
4. IF the user's operating system has `prefers-reduced-motion: reduce` set, THEN THE `CtaSection` SHALL not play any looping animation regardless of viewport position.

### Requirement 2: Stop Off-Screen Infinite Animation — LeadMagnetSection

**User Story:** As a site visitor, I want animations that are far below the fold to not consume GPU resources, so that page interaction remains responsive.

#### Acceptance Criteria

1. WHEN the `LeadMagnetSection` blob `motion.div` is not intersecting the viewport, THE `LeadMagnetSection` SHALL stop its `scale`/`opacity` `Infinity` repeat animation.
2. WHEN the `LeadMagnetSection` enters the viewport (whether for the first time or after having previously left), THE `LeadMagnetSection` SHALL restart the blob animation from the beginning of its keyframe sequence.
3. THE `LeadMagnetSection` SHALL gate animation playback using `useInView` (or equivalent) with `once: false` so the animation pauses when scrolled away and resumes when scrolled back.

### Requirement 3: Replace Non-Composited CSS Animation on TimelineLine Dot

**User Story:** As a site visitor, I want the process timeline to animate without causing layout reflow, so that scroll performance is not degraded by CSS geometry recalculations.

#### Acceptance Criteria

1. THE `TimelineLine` dot SHALL animate using a Composited_Property (`transform: translateX` or Framer Motion's `x` motion value) instead of the Non_Composited_Property `left`.
2. WHEN the `TimelineLine` enters the viewport, THE `TimelineLine` dot SHALL animate from the left edge to the right edge of the timeline using only composited properties.
3. THE `TimelineLine` dot SHALL complete its traversal animation in 2.5 seconds with `easeInOut` easing as currently specified.

### Requirement 4: Ensure HeroSection Entrance Animations Are One-Shot Only

**User Story:** As a site visitor, I want the hero entrance to feel snappy on load without lingering compositor-layer overhead from filter animations after they complete.

#### Acceptance Criteria

1. THE `HeroSection` SHALL animate each `motion.span` and `motion.div` with `filter: blur` only once on initial page load (using `animate` targeting the final non-blurred state, not `whileInView` with `repeat`).
2. WHEN all `HeroSection` entrance animations have completed, THE `HeroSection` SHALL not retain any active animation subscriptions or running RAF callbacks for those elements.
3. THE `HeroSection` SHALL use `viewport: { once: true }` on any `whileInView`-triggered element so the filter animation cannot re-trigger on scroll.

### Requirement 5: Lazy-Load the Index Page

**User Story:** As a site visitor, I want the homepage to load as quickly as possible, so that Time To Interactive is minimised.

#### Acceptance Criteria

1. THE `Application` SHALL import `Index_Page` using `React.lazy()` so it is code-split into its own chunk separate from the root `App` bundle.
2. WHEN the user navigates to `/`, THE `Application` SHALL render `Index_Page` within the existing `<Suspense>` boundary already used for other lazy routes.
3. THE `Application` SHALL display the existing blank `<div className="min-h-screen bg-background" />` fallback while `Index_Page` is loading.

### Requirement 6: Expand Bundle Splitting to Cover All Large Vendor Libraries

**User Story:** As a site visitor loading the page for the first time, I want vendor bundles to be split so that only the code needed for the current page is parsed and executed, reducing TTI.

#### Acceptance Criteria

1. THE `Bundle_Splitter` SHALL place all 25+ `@radix-ui/*` packages into a dedicated `Vendor_Chunk` named `radix-ui`.
2. THE `Bundle_Splitter` SHALL place `@tanstack/react-query` into a dedicated `Vendor_Chunk` named `query`.
3. THE `Bundle_Splitter` SHALL place `lucide-react` into a dedicated `Vendor_Chunk` named `icons`.
4. THE `Bundle_Splitter` SHALL place `recharts` into a dedicated `Vendor_Chunk` named `charts`.
5. THE `Bundle_Splitter` SHALL place `@supabase/supabase-js` into a dedicated `Vendor_Chunk` named `supabase`.
6. THE `Bundle_Splitter` SHALL retain the existing `react-vendor`, `motion`, and `ui-vendor` chunks (or supersede `ui-vendor` with the new `radix-ui` chunk).

### Requirement 7: Load Google Fonts via `<link>` Instead of CSS `@import`

**User Story:** As a site visitor, I want fonts to load without blocking the initial render of the page, so that the page displays content faster.

#### Acceptance Criteria

1. THE `Application` HTML SHALL load the Google Fonts stylesheet via a `<link rel="stylesheet">` tag in the `<head>` of `index.html` rather than via a CSS `@import` statement.
2. THE `Application` index.css SHALL NOT contain a `@import url('https://fonts.googleapis.com/...')` rule.
3. THE `Application` HTML SHALL include `<link rel="preconnect" href="https://fonts.googleapis.com">` and `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>` before the Google Fonts `<link>` tag (already present, must be retained), and these preconnect tags SHALL remain regardless of how fonts are loaded.
4. WHEN both font families (`Space Grotesk` and `Inter`) are specified together in the `<link>` tag, THE `Application` SHALL request weight variants `300;400;500;600;700` for each family and include `display=swap`.

### Requirement 8: Add Lazy Loading and Responsive Sizing to PortfolioSection Images

**User Story:** As a site visitor, I want below-the-fold portfolio images to load only when needed, so that initial page load is faster and bandwidth is not wasted.

#### Acceptance Criteria

1. THE `PortfolioSection` SHALL add `loading="lazy"` to all three `<img>` elements displaying Unsplash project images.
2. THE `PortfolioSection` SHALL add `decoding="async"` to all three `<img>` elements.
3. THE `PortfolioSection` SHALL use exactly `w=600` as the Unsplash width parameter (replacing the current `w=800`), with no variation, while retaining `auto=format&fit=crop&q=80`.
4. THE `PortfolioSection` SHALL add explicit `width` and `height` attributes to every `<img>` element to prevent layout shift while the image loads.

### Requirement 9: Remove Global `backface-visibility: hidden` from All Elements

**User Story:** As a site visitor on a mobile device, I want the page to consume less GPU memory, so that the browser does not degrade performance due to excessive compositor layers.

#### Acceptance Criteria

1. THE `Application` index.css SHALL NOT apply `backface-visibility: hidden` or `-webkit-backface-visibility: hidden` to the universal selector `*`, `*::before`, or `*::after`.
2. WHERE `backface-visibility: hidden` is needed to prevent 3D-flicker on specific animated elements, THE `Application` SHALL apply it only to those specific component class selectors or inline styles.

### Requirement 10: Calibrate `contain-intrinsic-size` for Tall Sections

**User Story:** As a site visitor scrolling the page, I want sections to render without layout shift as they enter the viewport, so that the reading experience is smooth and content does not jump.

#### Acceptance Criteria

1. THE `Application` index.css SHALL set `contain-intrinsic-size` to a value that matches or exceeds the realistic rendered height of each section using `content-visibility: auto`.
2. THE `Application` SHALL use `contain-intrinsic-size: 1px 900px` as the default value for `main > section` and `main > div > section`, replacing the current `1px 600px`.
3. IF a section is known to be significantly taller than 900px, THEN THE `Application` SHALL apply a section-specific override using a targeted CSS selector with a more accurate intrinsic size estimate.

### Requirement 11: Use `https://` Protocol on HubSpot Script

**User Story:** As the site operator, I want all external scripts to use an explicit protocol, so that there are no mixed-content or protocol-relative URL ambiguities in any deployment environment.

#### Acceptance Criteria

1. THE `Application` index.html SHALL load the HubSpot tracking script using an explicit `https://` URL: `https://js-na2.hs-scripts.com/245585866.js`.

### Requirement 12: Pause Lenis RAF Loop When Tab Is Hidden

**User Story:** As a site visitor switching between browser tabs, I want the scroll engine to stop consuming CPU when the tab is not visible, so that battery life and system resources are preserved.

#### Acceptance Criteria

1. WHEN `document.visibilityState` changes to `"hidden"`, THE `Application` `useSmoothScroll` hook SHALL stop calling `requestAnimationFrame` for the Lenis RAF loop.
2. WHEN `document.visibilityState` changes to `"visible"`, THE `Application` `useSmoothScroll` hook SHALL resume the Lenis RAF loop by restarting the `requestAnimationFrame` cycle.
3. THE `Application` `useSmoothScroll` hook SHALL register a `visibilitychange` event listener on `document` and remove it on cleanup.
4. FOR ALL visibility state transitions, the RAF loop SHALL be in the correct state: running when visible, stopped when hidden.

### Requirement 13: Restrict `will-change` on `.hover-lift` to Hover State Only

**User Story:** As a site visitor on a page with many `.hover-lift` elements simultaneously visible, I want the browser to not promote all of them to compositor layers at once, so that GPU memory usage is not excessive on lower-end devices.

#### Acceptance Criteria

1. THE `Application` index.css SHALL NOT apply `will-change: transform, box-shadow` to the `.hover-lift` selector in its default (non-hover) state.
2. THE `Application` index.css SHALL apply `will-change: transform, box-shadow` only to the `.hover-lift:hover` selector, so a layer is promoted only for the element currently being hovered.

### Requirement 14: Reduce Motion Value Count in TiltCard

**User Story:** As a site visitor on a low-end device viewing the services section, I want the 3D tilt effect to not create excessive reactive motion values, so that the animation scheduler is not overloaded.

#### Acceptance Criteria

1. THE `ServicesSection` `TiltCard` component SHALL disable the `onMouseMove` tilt handler entirely on devices where the primary pointing device is coarse (touch screens), using a `window.matchMedia("(pointer: coarse)")` check or equivalent, so no unnecessary event processing occurs on those devices.
2. WHEN the pointer is coarse (touch device), THE `TiltCard` SHALL render without applying `rotateX`, `rotateY`, or `glareOpacity` transforms, and motion values SHALL be left at their initial zero state; fine pointer devices MAY have some transforms active while others are resetting or disabled during cleanup or reinitialization.
3. WHEN the pointer is fine (mouse/trackpad), THE `TiltCard` SHALL retain full 3D tilt behaviour as currently implemented.

### Requirement 15: Replace Favicon Preload with a Useful Preload Hint

**User Story:** As a site visitor, I want the browser's preload budget to be used for render-critical assets, so that fonts or the hero background image load faster instead of the favicon.

#### Acceptance Criteria

1. THE `Application` index.html SHALL NOT contain `<link rel="preload" as="image" href="/favicon.png" />`.
2. THE `Application` index.html SHALL preload the hero background image (`/src/assets/hero-bg.jpg` or its production-bundled equivalent) using `<link rel="preload" as="image">` if it is a statically referenced render-critical image.
3. IF the hero background image is not a static URL available at HTML parse time, THEN THE `Application` SHALL omit the hero image preload and simply remove the favicon preload without replacement, freeing the preload slot.
