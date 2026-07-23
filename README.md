# 90's Kids Mandi House

Single-page site for **90's Kids Mandi House** — Arabian fine dining on Thiruvallur St, Potheri, Kattankulathur, TN.

*Serving Moments. For Every You.*

## Stack

Zero build step. Plain HTML, CSS and vanilla JS, served straight off the filesystem.

```
index.html          all sections
css/styles.css      design tokens + every rule
js/menu-data.js     menu + signature dishes (single source of truth)
js/main.js          carousel, filtering, FAQ, mobile nav, scroll spy
images/             dish and gallery photography
vercel.json         clean URLs + image caching
```

## Run locally

```bash
python -m http.server 5566
```

Then open <http://localhost:5566>.

## Editing the menu

All prices and dishes live in `js/menu-data.js`. Nothing is hardcoded in the
HTML — edit that one file and both the menu grid and the signature carousel
update.

Tiered items use `{ half, full, family }`. Single-price items use `{ single }`.

## Design system

Built against a fixed token set. **No colour, font size, radius or spacing
value outside these tokens appears anywhere in the CSS**, and the rendered DOM
has been audited to confirm it.

### Colour

| Token | Value | Role |
|---|---|---|
| Brand Yellow | `#fec33b` | Page background, header bar, hero strip |
| Deep Navy | `#1b242e` | All text, headings, logo; inverted panels |
| Coral Orange | `#e24b25` | Primary CTAs, eyebrow taglines, active states |
| White | `#ffffff` | Label text on coral buttons |
| Dark Brown | `#a13b00` | Secondary buttons, prices |
| Black | `#000000` | Hairline borders and controls only |

### Type

Display face is `obviously-narrow` at weight 800; body is `Varela Round`.
Sizes are fixed: 91.264 / 62.08 / 48 / 35.968 / 28.288 / 19.072 px.

> **Note:** `obviously` and `obviously-narrow` are Adobe Fonts and require a
> Typekit kit ID. They are declared first in every font stack, with **Anton**
> as the loaded stand-in. Add your kit `<link>` in `index.html` beside the
> Google Fonts link and the display type switches over automatically.

### Shape and depth

Radii are 6.4px (buttons), 8px (cards), 12px (panels), 0px (hairlines).

Flat by design — **no shadows, no gradients, no elevation anywhere**. All
hierarchy comes from colour contrast and the type scale.

### Motion

Animation uses **transform and opacity only** — nothing animates layout or
introduces depth, so the flat design holds. Travel distances reuse the spacing
tokens, and the 3px nav underline matches the outline-width in the design
system's interaction evidence.

- Hero content rises in on load, staggered
- Sections, cards and FAQ rows reveal on scroll, cascading within a group
- Stat numbers count up when they enter view, keeping the `04` padding
- Photos scale gently inside clipped frames on hover; cards lift
- Buttons, tabs and carousel arrows lift on hover
- Menu cards replay their entrance on tab switch, so filtering reads as a
  transition rather than a hard swap
- FAQ rows animate open via `grid-template-rows`, and the `+` rotates into an `x`

**Degradation is deliberate:**

- Reveal styles are armed by a `.js` class set inline in `<head>`. With JS
  off, nothing is ever hidden in the first place.
- If `IntersectionObserver` never delivers, a 2s failsafe reveals everything —
  the page cannot be stranded blank.
- Stat numbers are the final values in the HTML, so they read correctly with
  no JS at all.
- `prefers-reduced-motion: reduce` collapses every duration and forces reveal
  elements visible.
- Hover lifts are switched off below 768px, where they'd otherwise stick after
  a tap.

### Responsive

Breakpoints step type down through *other token sizes* rather than arbitrary
values: the 91.264px hero becomes 62.08px on tablet and 48px on mobile.
Verified at 375px with zero horizontal overflow.

## Deployment

Deployed on Vercel as a static site. Pushes to `main` deploy automatically.

## Contact

Thiruvallur St, Potheri, Kattankulathur, TN
+91 92072 73292 (call or WhatsApp) · 11:00 AM – 11:00 PM, all days

---

© 2025 90's Kids Mandi House.
