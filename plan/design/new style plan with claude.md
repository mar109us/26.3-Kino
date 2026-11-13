# New style plan with Claude — neumorphic redesign

## Context
Remake the Kino seat-booking look in a neumorphic style with earthy colours.
All new styling lives in the empty `neumorphic.css`; `style.css` stays untouched as a backup.

## Decisions (from questionnaire)
- Palette: earthy/grounded. Surface sand `#e6dccd`, dark shadow `#c2b5a3`, light shadow `#fbf5ec`, text dark brown `#3e3328`, accent olive `#5f6f3a`, accent hover `#4e5c2f`, error terracotta `#a4452c`.
- Selected seat/showing: pressed in (inset shadow) + olive accent text.
- Taken seat: flat (no shadow) + faded (low opacity), `not-allowed` cursor.

## Files
1. `index.html` — change `href="style.css"` to `href="neumorphic.css"`. Only that line.
2. `neumorphic.css` — full stylesheet using the same class names as `view.js` (`.page`, `.showings`, `.showing`, `.selected`, `.screen`, `.hall`, `.row`, `.seat.free/.taken/.selected`, `.legend`, `.summary`, `.form`, `.reserve`, `.message`). No JS changes needed.
   - `:root` with CSS variables for colours + two shadows (`--shadow-out`, `--shadow-in`) so every element reuses them.
   - Raised (outset) by default: page, showings, free seats, reserve button.
   - Pressed (inset): selected states, inputs, summary box, screen bar.
   - `:active` on buttons switches to inset, so clicks feel pressed.
   - Desktop-first `max-width` media query for small screens. `gap` for siblings, no `!important`.
3. `plan/design/new style plan with claude.md` — copy of this plan.
4. `plan/design/claude-evaluation.md` — evaluation of how we planned: questionnaire answers, what you decided vs. what I suggested, what went well / could improve. Updated each time we plan more for the neumorphic design.

## Verification
Open `index.html` in the browser: check showing select, seat toggle (free → selected → free), taken seats not clickable-looking, legend matches seats, form + error message readable.

---

# Neumorphic round 2 — more horizontal breathing room

## Context
Palette approved. Elements feel cramped side by side; soft shadows of neighbours touch.
Goal: about 1.5x more **horizontal** space. Vertical spacing stays exactly as it is.

## Changes — only `neumorphic.css` (left/right values only)
| Where | Now | New |
| --- | --- | --- |
| `.page` max-width | 560px | 600px (keeps 3 showings on one row with bigger gaps) |
| `.page` side padding | 2rem | 3rem |
| `.showings` gap | 12px | 18px |
| `.row` gap (between seats) | 8px | 12px |
| `.row-label` margin-right | 4px | 8px |
| `.legend` gap | 0.6rem | 0.9rem |
| `.legend` label margin-right | 1rem | 1.5rem |
| `.summary` side padding | 1.1rem | 1.6rem |
| `.form input` side padding | 0.8rem | 1.2rem |

Small-screen media query (`max-width: 480px`) stays the same, so phones don't overflow.

## Docs
- `plan/design/new style plan with claude.md` — add this round as a new section.
- `plan/design/claude-evaluation.md` — add "Round 2": you approved the palette, and narrowed my vertical+horizontal question to horizontal only.

## Verification
Reload `index.html`: shadows of neighbouring seats/showings no longer touch, 3 showings still on one row, page height unchanged.

---

# Neumorphic round 3 — conical dimple on clickable buttons

## Context
You want clickable buttons to show a slight indent that runs like a cone toward the centre, while still looking raised.

## Decisions (questionnaire)
- Type: radial dimple, where the centre is slightly darker and fades to the surface colour at the edges.
- Applies to free seats, showing buttons and the Reserver button.
- Selected or pressed buttons keep the flat inset and drop the cone, so the two states stay easy to tell apart.

## Changes (only in `neumorphic.css`)
1. Add one new variable in `:root`:
   `--dimple: radial-gradient(ellipse at center, #d9cebd 0%, var(--surface) 70%);`
   `ellipse` makes the cone follow the button's shape, so it works for the round seats and the wide Reserver button.
2. Set `background: var(--dimple);` on `.showing`, `.seat.free` and `.reserve`. They keep their outer shadow.
3. Set `background: var(--surface);` on the pressed states (`.showing:active`, `.showing.selected`, `.seat.free:active`, `.reserve:active`) so the cone disappears when a button is pushed in. `.seat.selected` already uses the flat surface.
4. The legend's "Ledig" dot gets the dimple automatically through `.seat.free`, so the legend still matches the seats.

## Docs
- Add this round to `plan/design/new style plan with claude.md`.
- Add "Round 3" to `plan/design/claude-evaluation.md`.

## Verification
Reload the page and check:
- Free seats, showings and Reserver have a soft dark centre.
- Clicking a seat makes it flat and pressed in, with no cone.
- Taken seats stay flat and faded.

---

# Neumorphic round 4 — fix the dimple: reversed inner shadow

## Context
Round 3's radial gradient was wrong because it didn't follow the light. In neumorphism the light comes from the top-left:
- A raised outer shadow is dark at the bottom-right and light at the top-left.
- An indent inside the button must be the reverse: dark at the top-left and light at the bottom-right.

You chose a gentle slope: a small offset with a big blur, so the shadow fades toward the centre like a soft cone.

## Changes (only in `neumorphic.css`)
1. In `:root`:
   - Remove `--dimple`.
   - Add `--shadow-dimple: inset 2px 2px 8px var(--shadow-dark), inset -2px -2px 8px var(--shadow-light);`
2. Clickable buttons combine the outer shadow with the inner one, separated by a comma:
   - `.showing` and `.seat.free` get `box-shadow: var(--shadow-out-small), var(--shadow-dimple);`
   - `.reserve` gets `box-shadow: var(--shadow-out), var(--shadow-dimple);`
3. Remove every `background: var(--dimple)` and the extra `background: var(--surface)` lines from Round 3. Without the gradient the buttons already use the sand surface, so those lines aren't needed.
4. Pressed and selected states keep only `--shadow-in`, which has no outer rim, so they still look clearly pushed in.

## Docs
- Add this round to `plan/design/new style plan with claude.md`.
- Add "Round 4" to `plan/design/claude-evaluation.md`. It records that Round 3 misread "inner shadow" and that your correction (the reversed light) fixed it.

## Verification
Reload the page and check:
- Clickable buttons have a raised rim with a soft dish inside: dark at the top-left and light at the bottom-right.
- Selected buttons are flat and pressed in, with no rim.
- Taken seats are unchanged.

---

# Neumorphic round 5 — move the indent away from the edge

## Context
In Round 4 the inner shadow starts at the button's edge, so it reads like a border.
An inset `box-shadow` always starts at the edge, so the indent needs its own smaller box inside the button.
You chose a fixed flat rim of 5px before the indent starts.

## Changes (only in `neumorphic.css`)
1. Remove `var(--shadow-dimple)` from the `box-shadow` of `.showing`, `.seat.free` and `.reserve`. They go back to just their outer shadow.
2. Give these 3 buttons `position: relative;` and `z-index: 0;`. This lets the inner box be placed inside the button and stay behind the text.
3. Add one shared rule for the inner box:
   ```css
   .showing::before,
   .seat.free::before,
   .reserve::before {
       content: "";
       position: absolute;
       inset: 5px;
       z-index: -1;
       border-radius: inherit;
       box-shadow: var(--shadow-dimple);
   }
   ```
   - `inset: 5px` places the box 5px in from every edge, which makes the flat rim.
   - `border-radius: inherit` makes the dish follow the button's own shape.
4. Pressed and selected states remove the dish with `.showing.selected::before`, `.showing:active::before`, `.seat.free:active::before` and `.reserve:active::before` set to `content: none;`. Selected seats stop being `.free`, so they lose it automatically.
5. The legend's "Ledig" dot is a `<span>`, not a button, but it still matches `.seat.free`. At 20×18px it gets a tiny dish, which is fine, and the legend still matches the seats.
6. Keep `--shadow-dimple` (reversed light, 2px offset and 8px blur) unchanged.

## Docs
- Add this round to `plan/design/new style plan with claude.md`.
- Add "Round 5" to `plan/design/claude-evaluation.md`.

## Verification
Reload the page and check:
- Each clickable button has a flat 5px rim and then a soft dish, dark at the top-left and light at the bottom-right.
- Seat numbers and showing text are still readable on top.
- Clicking a button makes it flat and pressed in, with no dish.

---

# Neumorphic round 6 — soften the edge of the indent

## Context
The Round 5 indent still has a sharp line where it starts. An inset shadow is always fully dark right at its box's edge, so the edge of the `::before` box shows as a hard line.

## Change (only in `neumorphic.css`)
- Add `filter: blur(2px);` to `.showing::before, .seat.free::before, .reserve::before`. This blurs the whole inner box, including its edge, so the flat rim fades into the dish.

## Verification
Reload the page and check that there is no hard line between the rim and the dish on seats or showings.

---

# Neumorphic round 7 — remove the indent

## Context
Rounds 3–6 tried to add an indent to the clickable buttons. Every version looked wrong, so you scrapped the idea.

## Change (only in `neumorphic.css`)
- Remove `--shadow-dimple`, the `::before` rules, and the `position` and `z-index` lines added for them. The buttons go back to the Round 2 look: raised outer shadow only.

---

# Neumorphic round 8 — seat and legend colours

## Context
The legend dots should carry clear colours: Ledig stays the light sand ("white"), Valgt becomes an earthy green, and Opptatt becomes an earthy orange with dominant red. The seats get the same colours so the legend matches them.

## Changes (only in `neumorphic.css`)
- In `:root`, add `--seat-selected: #6b7d45` (moss green) and `--seat-taken: #b04a2c` (rust).
- `.seat.selected`: green fill and light sand text. It keeps the inset shadow.
- `.seat.taken`: rust fill and light sand text. Its shadow stays off, and the 0.4 opacity is removed so the red stays strong.
- Remove the `.legend .seat.taken` grey override. The legend dots now use the seat rules directly.

---

# Neumorphic round 9 — adjust seat colours

## Changes (only in `neumorphic.css`)
- Opptatt: revert to the Round 1 look. The seat is flat and faded (`opacity: 0.4`), and the legend dot is filled with `--shadow-dark`. `--seat-taken` is removed.
- Valgt: the moss green (`--seat-selected`) now colours the seat number instead of the background. The background is back to sand, with the inset shadow.

---

# Neumorphic round 10 — glowing selected seats

## Change (only in `neumorphic.css`)
- `.seat.selected` gets `text-shadow: 0 0 3px var(--seat-selected), 0 0 8px var(--seat-selected);`. Two soft green layers with no offset make the number look lit from inside, like the light on a real button.

---

# Neumorphic round 11 — darker palette, no green on seats

## Changes (only in `neumorphic.css`)
- Selected seats: remove the green colour and the glow, and remove `--seat-selected`. They keep bold text and the inset shadow. The olive accent elsewhere stays.
- Palette one step darker (mid-tone sand, not dark mode):
  - `--surface` from `#e6dccd` to `#cbbfae`
  - `--shadow-dark` from `#c2b5a3` to `#a89a87`
  - `--shadow-light` from `#fbf5ec` to `#e6dccd`
  - `--text-soft` from `#75685a` to `#5f5244`

---

# Neumorphic round 12 — full-width hall and screen

## Changes (only in `neumorphic.css`)
- `.screen`: remove the 2.5rem side margins, so the screen bar is as wide as the other elements.
- `.hall`: change `align-items` from `center` to `stretch`, so each row fills the full width.
- New rule `.row .seat { flex-grow: 1; }`: seats share the extra width equally. It is scoped to `.row`, so the legend dots keep their small size.

---

# Neumorphic round 13 — seat shape and wider row gaps

## Changes (only in `neumorphic.css`)
- `.seat` `border-radius` from `10px 10px 6px 6px` to `14px 14px 3px 3px`: a round backrest on top and a nearly square seat at the bottom.
- `.row` `gap` from 12px to 20px. Seats still use `flex-grow: 1`, so they shrink to make room for the gaps, and rows stay full width.

---

# Neumorphic round 14 — "LERRET" inside the screen bar

## Changes
- `view.js` `createHall()`: merge the empty `.screen` div and the `.screen-label` div into one, `<div class="screen">LERRET</div>`.
- `neumorphic.css`:
  - `.screen` drops its fixed 10px height. It gets a small vertical padding, and the label's text styles (centred, small, letter-spacing, soft colour), so the bar grows to fit the word.
  - The `.screen-label` rule is removed.

---

# Neumorphic round 15 — fields and summary side by side

## Decisions
- The fields (Navn, Telefonnummer) go on the left and the summary (seats, price) on the right, each taking half the width.
- Both halves are inset boxes. The inputs inside are raised slightly (`--shadow-out-small`) so they stay visible.
- The Reserver button stays full width below.

## Changes
- `view.js`:
  - `createForm()` wraps a `.fields` div (the 2 labels and inputs) and `${createSummary()}` in a `.checkout` div, above the button. The 2 `<br>` tags are removed; spacing comes from CSS.
  - `updateView()` no longer calls `createSummary()` itself.
- `neumorphic.css`:
  - `.checkout` is a flex row with an 18px gap.
  - `.fields` and `.summary` are `flex: 1` inset boxes, and the summary lines are stacked in a column.
  - Inputs are raised, and the last input has no bottom margin.
  - At 480px wide and below, `.checkout` stacks the two halves.

---

# Neumorphic round 16 — inputs indented again

## Change (only in `neumorphic.css`)
- `.form input` goes back from `--shadow-out-small` (raised) to `--shadow-in` (indent).

---

# Neumorphic round 17 — one shared checkout area

## Changes (only in `neumorphic.css`)
- `.checkout` becomes the single inset area, with padding, rounded corners and `--shadow-in`. The gap between the halves goes up to 2rem.
- `.fields` and `.summary` lose their own padding, corners and shadow. They are now just the two halves.
- `.summary` uses `align-items: flex-end` without `justify-content: center`, so seats and price sit in the top-right corner.

---

# Neumorphic round 18 — no effect on the checkout area

## Change (only in `neumorphic.css`)
- `.checkout` loses its inset shadow, rounded corners and padding. Only the indented inputs keep the neumorphic effect, and the area lines up with the Reserver button edges.

---

# Neumorphic round 19 — divider above the checkout area

## Changes
- `view.js` `createForm()`: add `<hr class="divider">` as the first element in the form.
- `neumorphic.css`: `.divider` is a thin, full-width inset groove (6px high, rounded, `--shadow-in`) with no border and 1.5rem space below. It looks like the screen bar.

---

# Neumorphic round 20 — divider matches the screen bar

## Change (only in `neumorphic.css`)
- `.divider` copies the screen bar's look: 1.45rem high (the bar's text line plus its padding), `border-radius: 12px`, `--shadow-in` and 1.25rem space below.

---

# Neumorphic round 21 — Nunito font and more vertical space

## Decisions
- Font: Nunito from Google Fonts, a rounded font that suits the soft shadows. This is the project's first external dependency, which you approved.
- Vertical spacing about 1.5x, the same factor as the horizontal round.

## Changes
- `index.html`: add a `preconnect` and a Nunito `<link>` before `neumorphic.css`.
- `neumorphic.css`:
  - `body` uses `"Nunito", sans-serif`.
  - Vertical margins, gaps and padding go up about 1.5x. That covers the page padding, h1, showings, showing info, screen bar margin, seat-row gap, legend, divider margin, checkout, the label and input spacing, the summary gap and the message.
  - `.showing-info` gets its own bottom margin, so the title no longer touches the screen bar when no showing is selected.
  - Your own edits are kept: the screen bar padding (15px) and the divider height (0.6rem).

---

# Neumorphic round 22 — no card around the app

## Change (only in `neumorphic.css`)
- `.page` loses `box-shadow`, `border-radius` and `background`. The app now sits directly on the body surface. It keeps `max-width`, `margin: 0 auto` and padding for centring and spacing.

---

# Neumorphic round 23 — back to the lighter palette

## Change (only in `neumorphic.css`)
- Undo the Round 11 darkening and return to the Round 1 sand palette:
  - `--surface` `#e6dccd`
  - `--shadow-dark` `#c2b5a3`
  - `--shadow-light` `#fbf5ec`
  - `--text-soft` `#75685a`

---

# Neumorphic round 24 — larger fonts

## Change (only in `neumorphic.css`)
- `body` `font-size` goes to `1.125rem` (18px). Buttons, inputs, the summary, the row letters and the showing titles inherit it.
- Explicit sizes go up:
  - h1 from `1.6rem` to `2rem`
  - showing time from `0.85rem` to `0.95rem`
  - screen bar from `0.75rem` to `0.9rem`
  - seat numbers from `0.8rem` to `1rem`
  - legend from `0.85rem` to `1rem`
  - labels from `0.9rem` to `1rem`
- Spacing is untouched: `rem` follows the `<html>` size, not `body`, so margins and padding stay the same.

---

# Neumorphic round 25 — subtle page gradient

## Change (only in `neumorphic.css`)
- A new variable, `--page-gradient: linear-gradient(145deg, #ebe2d5, var(--surface) 50%, #e0d5c5)`. It is lighter at the top-left (toward the light) and slightly darker at the bottom-right, the same direction as every shadow.
- `body` uses it, with:
  - `background-attachment: fixed`, so the gradient fills the window and doesn't repeat or stretch when scrolling
  - `min-height: 100vh`, so it covers the full window
  - `box-sizing: border-box`, so the padding doesn't add a scrollbar

---

# Neumorphic round 26 — stronger page gradient

## Change (only in `neumorphic.css`)
- Push both ends of `--page-gradient` further apart: the light end goes from `#ebe2d5` to `#f4ede3`, and the dark end from `#e0d5c5` to `#d5c8b5`. The middle stays `--surface`.

---

# Neumorphic round 27 — transparent buttons and inputs

## Change (only in `neumorphic.css`)
- Every `background: var(--surface)` (showings, seats, inputs, Reserver) becomes `background: transparent`. The fixed page gradient shows through, so each element blends into the background at its spot on the page.
- The legend's grey "Opptatt" dot keeps its own `--shadow-dark` fill.

---

# Neumorphic round 28 — usability: selected seats, hover/focus, legend

## Context
You asked how to make the app more user-friendly. You chose 3 seat improvements and none of the checkout ones.

## 1. Mark selected seats clearly (`neumorphic.css`)
- `.seat.selected` adds `color: var(--accent);` to its existing bold text and inset shadow.
- This is the same olive as the selected showing title, so "selected" means the same thing everywhere.
- Note: in Round 11 you removed the *moss green* (with glow) from seats. This is the plain olive accent with no glow. If it feels like a step back, we drop it.

## 2. Hover and keyboard focus (`neumorphic.css`)
- Hover lift: `.seat.free:hover` and `.showing:not(.selected):hover` switch to the bigger `--shadow-out`, so the button seems to rise toward you. Seat hover keeps its accent text colour.
- Focus ring: a new shared rule, so Tab users can see where they are:
  ```css
  .showing:focus-visible,
  .seat:focus-visible,
  .reserve:focus-visible {
      outline: 2px solid var(--accent);
      outline-offset: 3px;
  }
  ```
  `:focus-visible` shows the ring only for keyboard use, not on mouse clicks.

## 3. Bigger, matching legend (`view.js` + `neumorphic.css`)
- `createLegend()` in `view.js`: each legend seat gets a sample number, `<span class="seat free">1</span>`, so it looks like a real seat.
- `.legend .seat` is seat-sized (40×32px) with `display: inline-flex` to centre the number.
- Remove the `.legend .seat.taken` grey fill, so the "Opptatt" sample looks exactly like a taken seat in the hall: a faded number with no shape.

## Docs
- Add this round to `plan/design/new style plan with claude.md`.
- Add "Round 28" to `plan/design/claude-evaluation.md`.

## Verification
Reload the page and check:
- Selected seats have olive numbers.
- Hovering a free seat or a showing lifts it.
- Tabbing through the page shows an olive ring.
- The 3 legend samples look identical to free, selected and taken seats in the hall.

---

# Neumorphic round 29 — legend and seats share one shape

## Context
The hall seats stretched with `flex-grow`, so they were wider than the fixed-size legend samples. The "Opptatt" sample had no number and no shape, so it was invisible. (You removed the sample numbers from the legend yourself.)

## Changes (only in `neumorphic.css`)
- `.seat` gets a fixed `width: 46px` (it was 36px plus `flex-grow`). The `.row .seat { flex-grow: 1 }` rule is removed.
- `.row` gets `justify-content: space-between`, so the rows still span the full width. The extra space goes into the gaps (20px minimum) instead of the seats.
- `.legend .seat` drops its own width and height, so it uses `.seat`'s 46×32px and has exactly the same shape.
- `.legend .seat.taken` gets the `--shadow-dark` fill back. Together with the taken seats' 0.4 opacity, it shows as a faint flat seat.

---

# Neumorphic round 30 — taken seats as dark, empty indents

## Change (only in `neumorphic.css`)
- `.seat.taken`:
  - `box-shadow: var(--shadow-in)` makes it indented.
  - `background: rgba(62, 51, 40, 0.06)` is a 6% layer of the text brown, so it's slightly darker but the page gradient still shows through.
  - `color: transparent` hides the number.
  - `opacity: 0.4` is removed, because it would also fade the shadow.
- The `.legend .seat.taken` grey fill is removed. The legend now uses the same taken-seat rule as the hall.

---

# Neumorphic round 31 — taller seats

## Change (only in `neumorphic.css`)
- `.seat` goes from 46×32px to 42×46px, a bit taller than wide like the front of a cinema seat. The backrest radius goes from 14px to 18px, and the bottom corners from 3px to 4px.
- On small screens (≤480px) seats go from 28×26px to 28×32px, keeping the same proportion.
- The legend follows automatically, because it uses `.seat`'s size.

---

# Neumorphic round 32 — showing info in two columns

## Changes
- `view.js` `createShowingInfo()`: wrap the time and price `<p>` tags in a `<div class="showing-details">`.
- `neumorphic.css`:
  - `.showing-info` is a flex row with `space-between`, so the title sits on the left and the details on the right. Both are vertically centred, with no container effect.
  - `.showing-details` is right-aligned. The gap between the two lines goes from 0.4rem to 0.2rem.
  - With no showing selected, only "Ingen forestilling valgt" shows, on the left.

---

# Neumorphic round 33 — less space above the title

## Change (only in `neumorphic.css`)
- `.page` top padding goes from `2.25rem` to `0`. That padding was meant for the inside of the old card (removed in Round 22). The body's own `2rem` top padding stays, so the title keeps some room from the window edge.

---

# Neumorphic round 34 — summary row above side-by-side fields

## Changes
- `view.js` `createForm()`:
  - `${createSummary()}` moves first in `.checkout`.
  - Each label and input pair is wrapped in its own `<div class="field">` inside `.fields`.
- `neumorphic.css`:
  - `.checkout` becomes a column: the summary row on top and the fields row below, 1.5rem apart.
  - `.summary` is a row with `space-between`: "Valgte seter" on the left and "Totalpris" on the right.
  - `.fields` is a row with a 2rem gap, and each `.field` is `flex: 1`, so Navn and Telefonnummer get half the width each.
  - The input bottom margin and the `.form input:last-child` rule are removed, because the inputs are no longer stacked.
  - On small screens (≤480px), `.fields` stacks the two fields again.

---

# Neumorphic round 35 — glow-tube effect on selections

## Decisions
- Colour: warm nixie orange.
- Scope: selected seats, the selected showing title and the legend "Valgt" sample.

## Changes (only in `neumorphic.css`)
- New variables in `:root`:
  - `--glow` `#e0762b`
  - `--glow-core` `#ffb46b`
  - `--glow-halo` `#c4561a`
  - `--text-glow`, three `text-shadow` layers: a hot core at 2px, the glow at 6px, and a halo at 14px
- `.seat.selected` and `.showing.selected .showing-title` use `color: var(--glow)` and `text-shadow: var(--text-glow)`. The glow starts at the text itself.
- `.legend .seat.selected::after` adds a "•" dot in CSS, so the empty legend sample has something to glow. `view.js` stays as you left it, with no numbers in the legend.

---

# Neumorphic round 36 — dark "tube" behind the glow

## Context
The Round 35 glow on light sand looked blurry. A glow needs darkness around it to read as light.

## Changes (only in `neumorphic.css`)
- New variables:
  - `--tube` `#3a2f25`, a dark brown "glass"
  - `--tube-text` `#cbbba5`, for secondary text on the tube
  - `--shadow-tube`, an inset shadow in dark browns so the dark fill still looks pressed in
- New section before the media query: `.seat.selected` and `.showing.selected` get the tube fill and the tube shadow. It comes last, so it wins over the earlier `--shadow-in` rules.
- `.showing.selected .showing-time` uses `--tube-text`, so the date stays readable on the dark fill.
- The legend "Valgt" sample gets the dark tube with a glowing dot automatically, because it is a `.seat.selected`.

---

# Neumorphic round 37 — glow tube like the reference (variant B)

## Context
The black tube from Round 36 looked bad. Your reference photo shows thin, almost white-yellow filaments with orange bloom, inside glass lit warm orange from within (not black).

## Changes
- `index.html`: the Nunito link also loads weight 300 (thin), for filament-like digits.
- `neumorphic.css`:
  - Remove `--tube`, `--tube-text` and `--shadow-tube`, plus the `.showing.selected .showing-time` rule.
  - `--glow-core` becomes `#fff1d6`, a pale filament colour. It is now the text colour.
  - `--text-glow` is orange bloom only: 2px and 6px `--glow`, then a 14px halo.
  - A new `--tube-light` radial gradient: bright amber in the centre that fades to transparent at 75%, like light filling the glass. The sand still shows at the edges.
  - `.seat.selected` and `.showing.selected` use `--tube-light` with the normal `--shadow-in`.
  - The selected seat number and showing title use weight 300, the filament colour and the orange bloom.

---

# Neumorphic round 38 — the showing title glows on its own

## Change (only in `neumorphic.css`)
- `.showing.selected` no longer gets `--tube-light`, so the button keeps a transparent background with the normal inset shadow.
- `.showing.selected .showing-title` uses `color: var(--glow)` (orange) with `--text-glow`, and keeps its normal bold weight so it stays readable.
- Selected seats keep the amber inner light, because their digit sits in the centre, where the light is.

---

# Neumorphic round 39 — drop the glow, muted yellow selections, steadier background

## Changes
- `index.html`: the Nunito link goes back to weights 400 and 700 (300 was only needed for the glow).
- `neumorphic.css`:
  - Remove every glow piece: `--glow`, `--glow-core`, `--glow-halo`, `--text-glow`, `--tube-light`, the glowing title and seat text rules, and the legend dot `::after`.
  - New `--selected: #e6d08e`, a muted yellow. `.seat.selected` and `.showing.selected` get it as background, with the normal inset shadow. The text is unchanged (same colour and weight as unselected).
  - Page gradient: move it from `body` (with `background-attachment: fixed` and `min-height`) to a `body::before` layer with `position: fixed; inset: 0; z-index: -1`. This layer always covers the window and never scrolls or repeats, and it works in every browser. The `fixed` approach is known to break in some browsers, Safari in particular.

---

# Neumorphic round 40 — no autofill colour on inputs

## Change (only in `neumorphic.css`)
- New `.form input:-webkit-autofill` rule:
  - `-webkit-text-fill-color: var(--text)` keeps the text colour.
  - `transition: background-color 600000s` delays the browser's light-blue autofill background for about a week, so in practice it never appears. Browsers don't let you override that colour directly.

---

# Neumorphic round 41 — align the showing title with the details

## Change (only in `neumorphic.css`)
- `.showing-info` `align-items` goes from `center` to `baseline`. The title's text line now lines up with the first line on the right (the date) instead of floating between the two lines.
