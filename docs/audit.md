# Audit Report — Salla Theme Prototype

**Date:** 2026-10-22 | **Auditor:** Claude Code (claude-sonnet-4-6)

---

## Summary

`npm install && npm run build` passes cleanly — zero errors, zero warnings, 426 modules, 583ms build. Dev server starts with no console errors. Section independence is well-implemented: no section knows its position, no cross-section imports, no external margins, error boundaries in place. The three most impactful issues are: **(1)** the marquee scrolls in the wrong direction for RTL Arabic — visible immediately in the demo; **(2)** multiple CSS files use primitive tokens (`--clr-*`) and raw `rgba` literals, bypassing the two-layer token system in every overlay and placeholder; **(3)** all 12 section CSS files use `max-width` breakpoints (desktop-first), directly contrary to the documented "mobile-first: الأساس موبايل والـ queries بـ min-width" rule.

---

## Findings

### Blockers

**None.** `npm install && npm run build` is clean. The dev server (`npm run dev`) produces no runtime errors.

---

### High

---

#### H-1 — Marquee scroll direction is inverted for RTL

**File:** `src/sections/Marquee/Marquee.jsx:33–34`

**Problem:**
```js
'--mq-direction': settings.direction === 'ltr' ? 'reverse' : 'normal',
```
The keyframe runs `translateX(0) → translateX(50%)` — physically scrolls the track **to the right** (+X). With `animation-direction: normal` for RTL, the track moves right, meaning content enters from the **left** and exits on the **right**. For Arabic, new content should enter from the right (reading-start) and exit on the left. The LTR case is also wrong: it gets `reverse` (moves left), which is the RTL-correct direction.

Both directions are swapped.

**Impact if left:** The demo marquee runs backwards — immediately visible to any Arabic speaker viewing the prototype.

**Fix:** Swap the condition:
```js
'--mq-direction': settings.direction === 'rtl' ? 'reverse' : 'normal',
```

---

#### H-2 — Primitive color tokens used directly in component CSS

**Files:**
- `src/components/ui.css:129` — `var(--clr-sand-200)`, `var(--clr-ink-200)` in the `ui-media` fallback gradient
- `src/sections/HeroSlider/HeroSlider.css:32` — `var(--clr-ink-800)` as media placeholder background
- `src/sections/ShoppableHero/ShoppableHero.css:6` — `var(--clr-ink-800)` as frame background

**Problem:** All three use `--clr-*` primitives directly in component rules. The two-layer rule in `docs/design-tokens.md §1`: *"Primitive — القيمة الخام. لا تُستخدم مباشرة في الـ components."*

**Impact if left:** A brand identity change that remaps primitives (e.g., changes `--clr-ink-800`) will silently skip these elements. At Salla port time, each requires a manual grep hunt.

**Fix:**
| Current | Replace with |
|---|---|
| `var(--clr-ink-800)` (placeholder / dark bg) | `var(--color-bg-inverse)` |
| `linear-gradient(135deg, var(--clr-sand-200), var(--clr-ink-200))` | `linear-gradient(135deg, var(--color-bg-muted), var(--color-skeleton))` — or add a `--color-media-placeholder` semantic token |

---

#### H-3 — Hard-coded `rgba` color literals bypass the token system

**Files and lines:**

| File | Line(s) | Value |
|---|---|---|
| `HeroSlider.css` | 44 | `rgba(20, 22, 26, 0.78/0.45/0.15)` — hero scrim |
| `ShoppableHero.css` | 25 | `rgba(20, 22, 26, 0.7)` — shop scrim |
| `EditorialCards.css` | 75 | `rgba(20, 22, 26, 0.72/0.05)` — card overlay |
| `HeroSlider.css` | 139–149 | `rgba(255, 255, 255, 0.4/0.75/0.14)` — indicator colours |
| `Footer.css` | 85, 88 | `rgba(255, 255, 255, 0.06/0.4)` — input bg / placeholder |

`rgba(20, 22, 26, x)` is the raw decomposition of `--clr-ink-900` (`#14161a`). None of these appear in `tokens.css` and none can be updated via the token system.

**Impact if left:** Any overlay or scrim colour becomes a silent hardcode. The promise of "changing the brand from `tokens.css` only" breaks everywhere an overlay appears.

**Fix:** Add three overlay tokens to `tokens.css`:
```css
--color-scrim-dark:   rgba(20, 22, 26, 0.72);  /* hero / editorial overlay */
--color-scrim-mid:    rgba(20, 22, 26, 0.45);  /* lighter scrim */
--color-surface-glass: rgba(255, 255, 255, 0.06); /* input on dark bg */
```
Use `var(--color-scrim-dark)` etc. everywhere. For indicator whites, use `var(--color-text-inverse)` at the appropriate opacity via a CSS `opacity` or `color-mix()`.

---

#### H-4 — Raw z-index integers in JSX

**File:** `src/sections/Faq/Faq.jsx:39`

```jsx
<span className="faq__avatar" key={ch} style={{ zIndex: 4 - i }}>
```

Produces z-index values 3, 2, 1, 0. Architecture rule (`docs/design-tokens.md §9`): *"ممنوع أي z-index برقم مباشر."*

**Impact if left:** Stacking order lives outside `tokens.css`. If `--z-raised` is ever bumped or a nearby element uses a token value, the avatars may slip under or over incorrectly.

**Fix:** Remove the inline `zIndex` entirely. Reverse the DOM render order of the avatar array (render last letter first) so the first letter in the list sits on top by natural DOM stacking order — no z-index needed.

---

### Medium

---

#### M-1 — Hard-coded pixel values outside the token scale

**Files and values:**

| File | Line | Value | Closest Token |
|---|---|---|---|
| `AboutUs.css` | 35 | `border: 6px solid` | no 6px token (`--space-1` = 4px, `--space-2` = 8px) |
| `BrandTimeline.css` | 38 | `box-shadow: 0 0 0 4px` | `--space-1` = 4px |
| `Testimonials.css` | 13 | `font-size: 10rem` | no type token at 10rem |
| `Faq.css` | 56 | `margin-inline-start: -10px` | no token (intentional overlap) |

**Impact if left:** Cumulative erosion of token discipline; values diverge silently during port.

**Fix:**
- `4px` ring shadow → `var(--space-1)` — exact match.
- `6px` border → add comment: `/* intentional: between --space-1 (4px) and --space-2 (8px) */` — or define `--space-1-5: 6px` if the value recurs.
- `10rem` quote mark and `-10px` avatar overlap → add `/* intentional decorative value, not from token scale */` so future readers don't "fix" them.

---

#### M-2 — FeaturedProduct gallery flip uses `direction: ltr` hack

**File:** `src/sections/FeaturedProduct/FeaturedProduct.css:9–13`

```css
.fp__layout--end {
  direction: ltr;
}
.fp__layout--end > * {
  direction: rtl;
}
```

`direction: ltr` swaps grid column order visually (it forces RTL grid to lay out columns left-to-right). The `> *` reset only reaches direct children — it does not protect any nested element that uses logical properties (`padding-inline-start`, `text-align: start`, etc.).

**Impact if left:** Fragile. Any future nested element added between the grid and a `> *` child (e.g., a wrapper div around the swatches) inherits LTR direction silently. Makes the Salla port riskier.

**Fix:** Use CSS `order` to swap positions without touching `direction`:
```css
.fp__layout--end .fp__gallery { order: 2; }
/* remove the direction rules entirely */
```

---

#### M-3 — Editorial cards hover arrow animation is silently broken

**File:** `src/sections/EditorialCards/EditorialCards.css:117–119`

```css
.ed__card:hover .ed__link svg {
  transform: rotate(180deg) translateX(3px);
}
```

The `<Chevron>` component renders the SVG with `style={{ transform: 'rotate(180deg)' }}` as an **inline style**. CSS rule specificity (0,2,1) is lower than inline style specificity (1,0,0,0). The CSS hover rule is silently overridden — the animation never fires.

**Impact if left:** A designed hover animation (arrow nudge on card link) is completely invisible. The `ed__link` element has no animated feedback on hover.

**Fix:** Remove the `style` prop from `<Chevron>` and control rotation exclusively through a CSS class. For example, add `.chevron--end { transform: rotate(180deg); }` to `ui.css` and apply `className="chevron--end"` to the `Chevron` in `EditorialCards.jsx`. The CSS hover rule can then override cleanly.

---

#### M-4 — HeroSlider scrim gradient uses a physical direction keyword

**File:** `src/sections/HeroSlider/HeroSlider.css:44`

```css
background: linear-gradient(to left, rgba(...) 0%, rgba(...) 45%, rgba(...) 100%);
```

`to left` is a physical direction. In an LTR context (content on the left), the dark side of the gradient would be on the wrong side.

**Impact if left:** Correct for this RTL-only demo. Would silently darken the wrong side if the Salla theme is ever applied to an LTR storefront.

**Fix:** `linear-gradient(to inline-start, ...)` — supported in all modern browsers. No behaviour change for RTL.

---

#### M-5 — ShoppableHero hotspot and card transforms assume RTL-only

**File:** `src/sections/ShoppableHero/ShoppableHero.css:63, 128–131`

```css
/* hotspot centering */
.shop__spot {
  transform: translate(50%, -50%); /* RTL: inset-inline-start يبدأ من اليمين */
}

/* card popup centering */
.shop__card {
  inset-inline-start: 50%;
  transform: translateX(50%);
}
```

In RTL, `inset-inline-start` maps to `right`. The `translate(50%,-50%)` centers the spot on its RTL anchor coordinate, and `translateX(50%)` centers the card popup on the dot. Both are mathematically correct **for RTL only**. In LTR, `inset-inline-start` maps to `left`, and `translateX(50%)` would push the card well past center instead of centering it.

**Impact if left:** Both transforms are correct in the demo. A future LTR port would show mispositioned hotspot dots and off-center popup cards.

**Fix for the port:** Introduce a direction-sign custom property:
```css
:root { --dir-sign: 1; }   /* RTL */
[dir="ltr"] { --dir-sign: -1; }

.shop__spot { transform: translate(calc(50% * var(--dir-sign)), -50%); }
.shop__card { transform: translateX(calc(50% * var(--dir-sign))); }
```
For now: add a `/* RTL-only */` comment to each rule so the assumption is documented.

---

#### M-6 — `SectionHead` `eyebrow` prop is dead

**File:** `src/components/ui.jsx:34–46`

`SectionHead` accepts and renders an `eyebrow` prop, but zero sections pass it. The sections that show eyebrows (HeroSlider, FeaturedProduct, AboutUs) handle them as local markup inside the section component.

**Impact if left:** Ambiguous interface for the Salla port. Is `data.eyebrow` a section-level setting (goes through `SectionHead`) or a section-private element? If a new section developer adds an eyebrow via `<SectionHead eyebrow={...}>`, they get one pattern; if they follow the existing sections, they get a different one.

**Fix:** Make a team decision:
- **Option A (simpler):** Delete the `eyebrow` prop from `SectionHead` and document: *eyebrows are section-local markup.*
- **Option B (consistent):** Migrate HeroSlider, FeaturedProduct, and AboutUs eyebrows to use `<SectionHead eyebrow={data.eyebrow} ...>`.

Either takes less than an hour. Pick one before porting.

---

#### M-7 — HeroSlider uses `<h1>` for slide titles

**File:** `src/sections/HeroSlider/HeroSlider.jsx:78`

```jsx
<h1 className="hero__title">{slide.title}</h1>
```

The core architecture promise is that sections can be freely reordered or hidden. A page without HeroSlider (or with it reordered to position 2+) has no `<h1>`, or has an `<h1>` in a non-first section. Section independence makes this a structural risk, not merely an edge case.

**Impact if left:** Incorrect heading hierarchy after reorder. Screen readers and search engines use `<h1>` as the page landmark.

**Fix:**
1. Change `<h1>` → `<h2>` in HeroSlider.
2. Add a visually-hidden `<h1>` (site name: "أورورا") inside `<Header>` so the hierarchy is always present regardless of which sections are visible:
```jsx
<h1 className="visually-hidden">أورورا</h1>
```

---

#### M-8 — All breakpoints use `max-width` (desktop-first), contrary to documented convention

**Affects:** All 12 section CSS files + `Header.css` + `Footer.css`

Every responsive media query in the project uses `max-width`:
```css
@media (max-width: 1024px) { ... }
@media (max-width: 768px)  { ... }
@media (max-width: 640px)  { ... }
```

`docs/design-tokens.md §5`: *"المشروع mobile-first: الأساس موبايل والـ queries بـ min-width."*

**Impact if left:** Not a runtime bug; the CSS is functionally equivalent. However, the stated architecture is not followed — extending the code during the Salla port will mix `max-width` and `min-width` queries, making the responsive system inconsistent and harder to maintain.

**Fix:** For all new sections going forward, use `min-width`. Before the Salla port, schedule one pass to convert existing breakpoints: invert the base rules and queries (mobile styles stay outer; add `@media (min-width: Xpx)` for larger-screen overrides). No visual change required — purely a structural refactor.

---

### Low

---

#### L-1 — `SectionList` returns a raw array without Fragment

**File:** `src/sections/SectionRenderer.jsx:66`

```jsx
export function SectionList({ sections }) {
  return sections.map((section) => <SectionRenderer key={section.id} section={section} />);
}
```

Works in React 16+ since each element has a `key`. Some linters and strict-mode tools flag it.

**Fix:** `return <>{sections.map(...)}</>;`

---

#### L-2 — Marquee uses array index as key for duplicated items

**File:** `src/sections/Marquee/Marquee.jsx:38`

```jsx
{track.map((item, i) => (
  <div className="mq__item" key={i} ...>
```

`track` is `[...items, ...items]`. The second copy's indices (e.g., `4–7`) differ from the first copy (`0–3`), so keys are technically unique. But it's an antipattern — if items ever become dynamic (re-fetched from API), index-based keys can cause incorrect reconciliation.

**Fix:** `key={i < items.length ? `orig-${i}` : `clone-${i - items.length}`}`

---

#### L-3 — Header mobile menu state not reset on desktop resize

**File:** `src/layout/Header.jsx`

If a user opens the mobile menu, then resizes the window above 900px, `menuOpen` remains `true`. CSS hides `.hd__mobile`, but returning to mobile viewport will show the menu already expanded — without the user having opened it.

**Fix:**
```js
useEffect(() => {
  const close = () => { if (window.innerWidth > 900) setMenuOpen(false); };
  window.addEventListener('resize', close, { passive: true });
  return () => window.removeEventListener('resize', close);
}, []);
```

---

#### L-4 — `Button` component has no default `type="button"`

**File:** `src/components/ui.jsx:7–31`

`Button` with `as="button"` (the default) spreads `...rest` but does not default `type` to `"button"`. Browsers treat `<button>` without `type` as `type="submit"` inside a `<form>`. Currently no unstyled `Button` sits inside a form, but it is a footgun for future development.

**Fix:**
```jsx
const Tag = as;
const extraProps = as === 'button' ? { type: 'button', ...rest } : rest;
// allow explicit override: <Button type="submit">
```
Or simply: `{...rest}` with `type={rest.type ?? (as === 'button' ? 'button' : undefined)}`.

---

#### L-5 — `RailNav` wrapper uses inline styles instead of a CSS class

**File:** `src/components/ui.jsx:170`

```jsx
<div style={{ display: 'inline-flex', gap: 'var(--space-2)' }}>
```

Every other layout rule in `ui.css` uses CSS classes. Inline styles cannot be overridden without `!important`.

**Fix:** Add `.ui-railnav { display: inline-flex; gap: var(--space-2); }` to `ui.css` and apply `className="ui-railnav"` to the wrapper.

---

## Section Independence Verification

The following was checked against the stated architecture rules:

| Rule | Status | Notes |
|---|---|---|
| No section knows its position | ✅ | `SectionRenderer` passes only `id`, `settings`, `data` — no `index` or `siblings` |
| No cross-section imports | ✅ | All shared components are in `src/components/`. No section imports another section. |
| No external margins between sections | ✅ | `.section` uses `padding-block` only. No `margin-block` anywhere at section level. |
| No `:nth-child` / `+` / `~` at section level | ✅ | `stats__card:nth-child(even)` is *within* StoreStats — not between sections. Not a violation. |
| No shared state | ✅ | Every section manages its own local state (`useState`). |
| Error boundary per section | ✅ | `SectionBoundary` wraps every `SectionComponent` in `SectionRenderer`. |
| Motion is per-section via `whileInView` | ✅ | No global scroll timeline; each section animates independently. |
| Reorder test | ✅ | Reversing or removing sections in `homepageSections` array causes no CSS or JS breakage. `FeaturedProduct.gallery` is `position: sticky` relative to viewport, not to adjacent sections — stays correct after reorder. |

**One exception worth watching (M-7):** `<h1>` in `HeroSlider` is a heading-hierarchy issue that surface when the section is reordered or hidden.

---

## Suggested Fix Order

Priority is: highest visible impact first, then Salla-port risk, then cleanup.

1. **H-1 — Marquee direction** — 1-line change in `Marquee.jsx`. Fixes the most immediately visible demo bug.

2. **M-3 — Dead hover animation in EditorialCards** — Move `Chevron` rotation from inline style to CSS class. 2-file fix; restores a designed interaction.

3. **H-4 — Faq avatar z-index** — Remove inline `zIndex` from Faq.jsx, reverse DOM order of avatars.

4. **M-7 — HeroSlider `<h1>` → `<h2>`** — 1-line fix + add visually-hidden `<h1>` to Header. Preserves heading hierarchy regardless of section order.

5. **M-2 — FeaturedProduct direction hack** — Replace `direction: ltr/rtl` with `order: 2` on the gallery. Removes the fragile RTL technique before more nested content is added.

6. **H-2 + H-3 — Token cleanup (primitives + rgba)** — Define 3–4 overlay tokens in `tokens.css`; replace all `--clr-*` direct uses and raw `rgba(20,22,26,...)` values. Highest long-term value for the Salla port.

7. **M-4 — Physical gradient direction in HeroSlider** — Change `to left` → `to inline-start`. 1-line fix, future-proofs for LTR.

8. **M-8 — Breakpoint convention** — New sections: write `min-width` from now on. Existing sections: convert before Salla port as a one-pass refactor.

9. **M-1 — Hard-coded pixel values** — Replace `4px` shadow ring with `var(--space-1)`; add comments to intentional outliers (`6px`, `10rem`, `-10px`).

10. **M-5 — RTL-only hotspot transforms** — No code change needed for the demo. Add `/* RTL-only */` comments and document for the Salla port.

11. **M-6 — Dead `SectionHead` eyebrow prop** — Team decision (delete or migrate). < 1 hour either way; do it before the port.

12. **L-1 – L-5 — React tidying** — Fragment wrapper, stable marquee keys, mobile-menu resize reset, Button `type` default, RailNav CSS class. Low priority; good to clean up before the Salla port review.
