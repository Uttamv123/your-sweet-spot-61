# Bugfix Requirements Document

## Introduction

The `#services` section (and the page as a whole) at `https://thecodereflections.com` scores
poorly on Core Web Vitals. The four defects being addressed are:

1. **LCP (1,363 ms)** — The Unsplash background image in `ServicesSection` is injected via
   CSS `background-image` in a React component's inline style, so it is invisible to the HTML
   parser and loads with "Low" priority, causing a 573 ms discovery delay.
2. **CLS (0.24)** — Dynamic content insertion (Framer Motion `whileInView` reveals and
   third-party script injection) and images/containers without reserved dimensions cause late
   layout shifts at ~3,559 ms.
3. **TTFB (520 ms)** — The initial server response from the Netlify CDN is slow.
4. **Main Thread (252 ms task)** — `index-CNCjFDJx.js` is evaluated synchronously during HTML
   parsing, blocking the critical rendering path and delaying the LCP resource fetch.

---

## Bug Analysis

### Current Behavior (Defect)

1.1 WHEN a browser navigates to the page THEN the system loads the Services section Unsplash
background image with "Low" priority and a 573 ms discovery delay because it is only
referenced inside a React component's inline `style` attribute, making it invisible to the
browser's preload scanner.

1.2 WHEN the page first renders THEN the system reports an LCP of 1,363 ms, exceeding the
"Good" threshold of 2,500 ms only because other elements paint first — the intended LCP
element (the services background image) is not preloaded, causing it to arrive late.

1.3 WHEN the page loads THEN the system allows `index-CNCjFDJx.js` to be evaluated
synchronously during HTML parsing, producing a 252 ms main-thread task that delays the
browser from discovering and fetching the LCP image.

1.4 WHEN the page renders THEN the system produces a Cumulative Layout Shift score of 0.24,
exceeding the "Good" threshold of 0.1, because Framer Motion `whileInView` animations reveal
content after initial paint without reserving space, and images/containers lack explicit
dimensions.

1.5 WHEN a browser requests the page THEN the system returns an initial HTML response with a
520 ms TTFB, which delays the start of all subsequent resource fetching.

---

### Expected Behavior (Correct)

2.1 WHEN a browser navigates to the page THEN the system SHALL make the LCP Unsplash
background image discoverable in the initial HTML via a `<link rel="preload"
fetchpriority="high" as="image">` tag, eliminating the 573 ms discovery delay.

2.2 WHEN the LCP image is preloaded THEN the system SHALL reduce the LCP measurement to
below 2,500 ms (targeting ≤ 2,000 ms) by ensuring the image fetch begins as early as
possible in the loading waterfall.

2.3 WHEN scripts are loaded THEN the system SHALL defer non-critical JavaScript evaluation
(including code-splitting `index-CNCjFDJx.js` to separate critical from non-critical logic)
so that no single script task blocks the main thread for more than 50 ms during initial HTML
parsing.

2.4 WHEN layout-shifting elements are rendered THEN the system SHALL reserve explicit
dimensions (via `aspect-ratio`, `min-height`, or placeholder styling) for all images and
dynamic containers so that the CLS score is below 0.1.

2.5 WHEN third-party scripts (HubSpot, analytics) are loaded THEN the system SHALL ensure
they use `async` or `defer` attributes so they do not contribute to main-thread blocking
during the critical rendering path.

2.6 WHEN the server handles page requests THEN the system SHALL respond with an initial HTML
document within a TTFB of ≤ 400 ms by enabling appropriate caching headers and CDN
optimisations at the Netlify layer.

---

### Unchanged Behavior (Regression Prevention)

3.1 WHEN the Services section is displayed THEN the system SHALL CONTINUE TO render the
Unsplash background image visually with the same appearance (opacity, `bg-cover bg-center`
positioning) as before the fix.

3.2 WHEN a user interacts with the Services section cards THEN the system SHALL CONTINUE TO
apply the 3D tilt hover effect, ambient glow, and sheen sweep animations as currently
implemented.

3.3 WHEN the page loads THEN the system SHALL CONTINUE TO render all sections
(Hero, TrustBar, ProblemSection, AboutSection, ServicesSection, and all others) in the
correct order without visual regressions.

3.4 WHEN a user clicks "Book a Free Call" in the Services section THEN the system SHALL
CONTINUE TO open the Calendly modal as currently implemented.

3.5 WHEN Framer Motion `whileInView` entrance animations are triggered THEN the system SHALL
CONTINUE TO animate section headings and cards into view with their existing easing and delay
values; only the space reservation strategy (preventing CLS) changes, not the animation
itself.

3.6 WHEN the HubSpot chat widget loads THEN the system SHALL CONTINUE TO function correctly
for visitors, with only the loading timing changed to non-blocking (async/defer).

3.7 WHEN the page is built with Vite THEN the system SHALL CONTINUE TO produce a valid
production build (`vite build`) with no new TypeScript or ESLint errors introduced by the
performance fixes.

---

## Bug Condition Pseudocode

### Bug Condition Functions

```pascal
// BUG 1: LCP image not preloaded
FUNCTION isLCPDiscoveryBug(page)
  INPUT: page — the rendered HTML document
  OUTPUT: boolean
  RETURN NOT EXISTS <link rel="preload" as="image"> IN page.head
         WHERE href CONTAINS "images.unsplash.com/photo-1461749280684"
END FUNCTION

// BUG 2: Render-blocking script evaluation
FUNCTION isMainThreadBlockingBug(scripts)
  INPUT: scripts — list of script loading tasks
  OUTPUT: boolean
  RETURN EXISTS task IN scripts
         WHERE task.duration > 50ms AND task.type = "ScriptEvaluation"
         AND task.timing = "DuringHTMLParsing"
END FUNCTION

// BUG 3: Layout shift without reserved dimensions
FUNCTION isCLSBug(element)
  INPUT: element — a DOM element that shifts after initial paint
  OUTPUT: boolean
  RETURN element.causesLayoutShift = true
         AND NOT element.hasReservedDimensions
END FUNCTION

// BUG 4: Slow TTFB
FUNCTION isTTFBBug(response)
  INPUT: response — the initial server HTML response
  OUTPUT: boolean
  RETURN response.ttfb > 400ms
END FUNCTION
```

### Fix-Checking Properties

```pascal
// Property: LCP image is preloaded with high priority
FOR ALL page WHERE isLCPDiscoveryBug(page) DO
  page' ← applyFix(page)
  ASSERT EXISTS <link rel="preload" fetchpriority="high" as="image"> IN page'.head
  ASSERT page'.lcp <= 2000ms
END FOR

// Property: Main thread is not blocked during HTML parsing
FOR ALL scripts WHERE isMainThreadBlockingBug(scripts) DO
  scripts' ← applyFix(scripts)
  ASSERT FOR ALL task IN scripts': task.duration <= 50ms OR task.timing != "DuringHTMLParsing"
END FOR

// Property: No layout shifts from unreserved containers
FOR ALL element WHERE isCLSBug(element) DO
  element' ← applyFix(element)
  ASSERT element'.hasReservedDimensions = true
  ASSERT page.cls < 0.1
END FOR
```

### Preservation Property

```pascal
// Preservation: Non-buggy behavior is unchanged
FOR ALL X WHERE NOT isLCPDiscoveryBug(X)
             AND NOT isMainThreadBlockingBug(X)
             AND NOT isCLSBug(X)
             AND NOT isTTFBBug(X) DO
  ASSERT F(X) = F'(X)   // visual output, interactions, and animations are identical
END FOR
```
