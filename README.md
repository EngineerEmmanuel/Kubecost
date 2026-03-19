# Kubecost Frontend Challenge

## Feature Chosen

**Cost Visibility** — KPI cards section showcasing Cost Monitoring, Infrastructure Savings, and Accurate Cost Data.

I chose this feature because it maps directly to Kubecost's core value proposition: giving teams clear, real-time visibility into cloud spending. Rather than building a static marketing section, I wanted the data to feel live and meaningful.

---

## Approach to Animation

Three layers of animation work together:

**1. Scroll-triggered staggered entrance**
Cards use Framer Motion's `useInView` hook with `once: true` so the animation fires once when the section enters the viewport. Each card slides up from 40px below its final position and fades in, with a 150ms stagger between cards. The easing curve (`[0.25, 0.46, 0.45, 0.94]`) gives a natural ease-out feel without bounce.

**2. Count-up metrics**
Once each card lands, its primary metric counts up from 0 to the real value using a custom `useCountUp` hook driven by `requestAnimationFrame`. The count starts 400ms after the card appears so the number animates after the card settles, not during — keeping motion focused and readable. The easing is an ease-out cubic curve for natural deceleration.

**3. Border trace on mount**
Each card has an inline SVG `<rect>` with `pathLength="1"` that draws itself around the card using `stroke-dashoffset` animation. Setting `pathLength="1"` normalises the stroke length so the animation is size-independent — changing card dimensions won't break it.

**4. Hover feedback**
Cards scale to 1.03 with a soft teal glow shadow on hover via Framer Motion's `whileHover`, giving tactile feedback without being distracting.

`prefers-reduced-motion` is respected — Framer Motion handles this automatically for JS animations, and the CSS border animation is disabled via a `@media (prefers-reduced-motion: reduce)` rule.

---

## Data Fetching & Caching

Data is fetched from [DummyJSON](https://dummyjson.com/products) and transformed into meaningful cloud cost metrics:

- **Cost Monitoring** — total cost, savings percentage, budget alert status
- **Save 70% on Infrastructure** — amount saved, services optimised, cost reduction
- **Accurate Cost Data** — data points tracked, accuracy score, last updated

**Caching** is handled by TanStack Query (`@tanstack/react-query`):

- Data is cached by the `["cost-data"]` query key
- On first load, a loading state is shown while the request resolves — skeleton placeholder cards matching the card dimensions prevent layout shift
- On revisit or re-render, the cached result is returned instantly with no redundant network request

---

## Component Structure

```
app/
  page.tsx          — CARDS config, BorderSVG, AnimatedMetric, FeatureCard, Home
  hooks/
    useCostData.ts  — data fetching and transformation
  globals.css       — animation keyframes, card-border styles
```

The `CARDS` array drives all three cards from a single config — adding or removing a card is one object, not duplicated JSX. The `FeatureCard` component is self-contained with its own scroll-awareness and count-up trigger logic.

---

## Libraries Used

- **Next.js 15** (App Router) — framework
- **Framer Motion** — scroll-triggered entrance, hover interactions
- **TanStack Query v5** — data fetching and caching
- **Tailwind CSS v4** — styling
- **TypeScript** — type safety throughout

---

## Tradeoffs & Decisions

- Used inline SVG inside each card for the border animation rather than CSS `::before`/`::after` pseudo-elements. Tailwind v4's CSS pipeline has inconsistent support for `@property` and `conic-gradient` masking, so the SVG `stroke-dashoffset` approach is more reliable across browsers.
- `pathLength="1"` on the SVG `<rect>` decouples the animation from actual pixel dimensions — the border trace always completes a full loop regardless of card size.
- Skeleton loading cards are shown during the initial fetch instead of a text spinner, matching the final card dimensions exactly to avoid layout shift.
- The count-up hook uses `requestAnimationFrame` directly rather than a third-party library to keep the bundle lean.

---

## What I Would Improve With More Time

- Add a design token system with CSS variables for colors and spacing, referenced from a `tokens.ts` file
- Implement container queries for per-card responsive behaviour
- Add `color-mix()` for dynamic hover color variations
- Deeper mobile optimisation — single column stacked layout on small screens with adjusted typography
