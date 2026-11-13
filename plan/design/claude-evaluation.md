# Claude evaluation — neumorphic design

This file evaluates how we plan the neumorphic redesign together.
Add a new section each time we plan something new for the design.

## Round 1 — first neumorphic redesign (2026-11-13)

### Goal
Remake the whole Kino look in neumorphic style in `neumorphic.css`, keeping `style.css` as a backup.

### How we planned
1. You set the goal and the rules up front: file names, where the CSS lives, and that `index.html` should point to the new file.
2. Claude read `style.css`, `view.js` and `index.html` first, so the plan could reuse the existing class names and need no JS changes.
3. Questionnaire with 4 questions, then a short plan, then your approval.

### Decisions
| Question | Claude suggested | You chose |
| --- | --- | --- |
| Base colour | Light grey | **Your own idea:** grounded/earthy colours |
| Selected seat/showing | Pressed in + accent | Same as suggested |
| Taken seat | Flat + faded | Same as suggested |
| File location | Both in `plan/design/` | Same as suggested |

### What went well
- The goal was clear and concrete (which files, what output), so the plan stayed short.
- You overrode the colour suggestion with your own direction instead of accepting the default. This shaped the whole look.
- Keeping the same class names means the redesign is CSS-only and easy to roll back.

### What could be better
- "Earthy colours" was open, so Claude picked the exact colours (sand, olive, terracotta) without asking. Next time we could compare 2–3 palettes before the plan.
- We did not decide on a font; the old Arial was kept.

### Result
- `neumorphic.css` written, `index.html` points to it.
- To check in the browser: does the earthy palette feel right, and are selected vs. free seats easy to tell apart?

## Round 2 — horizontal breathing room (2026-11-13)

### Goal
Give elements more space side by side, so neighbouring shadows stop touching.

### How we planned
1. You tested Round 1 in the browser and sent a screenshot. Real feedback beats guessing.
2. Questionnaire with 2 questions: how much space, and where.
3. Short plan as a before/after table, then your approval.

### Decisions
| Question | Claude suggested | You chose |
| --- | --- | --- |
| Palette | (open from Round 1) | Approved as is |
| Amount | About 1.5x | Same as suggested |
| Where | Sections, seats, card, form | **Your own scope:** horizontal only, no extra vertical space now |

### What went well
- The screenshot made the problem concrete, so the plan was precise.
- You narrowed the scope, so the change stayed small and easy to check.

### What could be better
- Claude's "where" question mixed vertical and horizontal areas. It should have asked about direction first.

### Result
- Only `neumorphic.css` changed: page widened to 600px, and side gaps/paddings raised by about 1.5x.

## Round 3 — conical dimple on clickable buttons (2026-11-13)

### Goal
Clickable buttons get a slight indent shaped like a cone toward the centre, while still looking raised.

### How we planned
1. You described the look in your own words ("slight conical indent towards the center").
2. Questionnaire with 3 questions, two of them showing CSS previews: indent type, which buttons, and what selected buttons should do.
3. Short plan, then your approval.

### Decisions
| Question | Claude suggested | You chose |
| --- | --- | --- |
| Indent type | Radial dimple | Same as suggested |
| Which buttons | (no default) | Free seats, showings and Reserver (all of them) |
| Selected state | Keep inset, drop cone | Same as suggested |

### What went well
- Your description was visual and specific, so turning it into CSS needed only one translation step (a cone becomes a `radial-gradient`).
- The CSS previews in the questionnaire let you compare the options before any code was written.

### What could be better
- "Inner shadow" and "indent" can mean several CSS techniques. The first question settled it, but a quick screenshot or sketch from you would make it even clearer.

### Result
- One new `--dimple` variable in `neumorphic.css`, used by the 3 clickable button types. Pressed and selected states go back to a flat surface.

## Round 4 — fixing the dimple with a reversed inner shadow (2026-11-13)

### Goal
Fix Round 3. The indent must follow the neumorphic light: the inner shadow is the reverse of the outer one.

### How we planned
1. You checked Round 3 in the browser and said clearly what was wrong and why (the light direction).
2. Questionnaire with 1 question, with CSS previews: how far the slope reaches toward the centre.
3. Short plan, then your approval.

### Decisions
| Question | Claude suggested | You chose |
| --- | --- | --- |
| Slope depth | Gentle (2px offset, 8px blur) | Same as suggested |

### What went wrong in Round 3
- Claude turned "conical indent" into a radial gradient. That ignored the most important neumorphic rule: every shadow follows one light source.
- The Round 3 questionnaire asked *which* indent technique to use, but none of the options followed the light correctly, so you could not pick the right one.

### What went well
- Your correction named the rule (reverse the outline shadow and highlight), not just the symptom. That made the fix one variable.
- The fix also made the CSS simpler: the gradient and its extra reset lines are gone.

### Lesson for next rounds
- Claude should check every new visual effect against the light direction (top-left) before suggesting it.

### Result
- `--dimple` gradient removed. A new `--shadow-dimple` inset shadow, reversed from the outer one, is added to the outer shadow on showings, free seats and Reserver.

## Round 5 — moving the indent away from the edge (2026-11-13)

### Goal
The Round 4 indent started at the button edge and looked like a border. Start it further in, with a flat rim first.

### How we planned
1. You described the problem by what it looked like ("more like a border") and named the fix ("start further towards the center").
2. Claude explained the CSS limit: an inset shadow always starts at the edge, so the indent needs its own smaller box (`::before`).
3. Questionnaire with 1 question, with a sketch: how wide the flat rim should be. Then a short plan and your approval.

### Decisions
| Question | Claude suggested | You chose |
| --- | --- | --- |
| Rim width | Fixed 5px | Same as suggested |

### What went well
- Each round is getting smaller and more precise. Your feedback now names the exact visual problem.
- Explaining *why* plain CSS couldn't do it (the edge limit) before asking made the question easier to answer.

### What could be better
- Round 4 should have predicted this. An inset shadow on the whole button always hugs the edge. Claude could have offered the rim option already in Round 4.

### Result
- The dish is now a `::before` box placed 5px inside each clickable button, carrying `--shadow-dimple`. It is removed when a button is pressed or selected.

## Round 6 — softening the edge of the indent (2026-11-13)

### Goal
Remove the sharp line where the Round 5 indent starts.

### How we planned
- No questionnaire. You sent a screenshot that showed the problem exactly, and the fix was a single line.

### What went well
- The screenshot made the problem clear right away. It was faster than describing it in words.

### What could be better
- Claude should have expected this in Round 5. An inset shadow is always sharp at its own box's edge, so moving the box inward only moved the line.

### Result
- `filter: blur(2px)` on the indent box blurs its edge, so the rim fades into the dish.

## Round 7 — scrapping the indent (2026-11-13)

### Decision
You scrapped the indent after four attempts (Rounds 3–6). The buttons are back to the Round 2 look.

### What went wrong
- Each round fixed the symptom from the last screenshot instead of questioning the approach. Gradient, then inset shadow, then a smaller box, then blur: each added complexity and fixed one problem but showed the next.
- Claude never said that a soft conical dish is hard to do well with only `box-shadow` on small 36px buttons. That should have been said in Round 3, with a mockup to approve before any code.

### Lesson for next rounds
- After 2 failed attempts at the same effect, stop and ask whether to change approach or drop the idea, instead of stacking more fixes.
- For purely visual effects, show a small isolated test first (one button) before changing every button.

### Result
- `--shadow-dimple`, the `::before` rules and their `position`/`z-index` lines are removed from `neumorphic.css`.

## Round 8 — seat and legend colours (2026-11-13)

### Goal
Colour-code the legend: Ledig is light, Valgt is earthy green, Opptatt is earthy orange with dominant red.

### How we planned
- You gave the colour direction for each state. Claude asked 1 question with CSS previews: legend only, or seats too?

### Decisions
| Question | Claude suggested | You chose |
| --- | --- | --- |
| Scope | Legend + seats | Same as suggested |

### What went well
- Your request named every state and its colour, so only the scope was left open.
- Claude caught that a legend-only change would make the legend stop matching the seats.

### What could be better
- The taken seats lost their faded look from Round 1 so the red can stay strong. That changed an earlier decision without a separate question.

### Result
- Two new colour variables. Selected and taken seats (and their legend dots) are now filled with moss green and rust.

## Round 9 — adjusting the seat colours (2026-11-13)

### Decision
- You reverted Opptatt to its old look: faded and flat.
- Valgt keeps the moss green, but as text colour instead of a background fill.

### What went well
- Seeing the colours in the browser made it quick to decide what to keep and what to drop.

### What could be better
- In Round 8, Claude changed the faded look of taken seats without asking, and you reverted it here. Earlier decisions should not be changed silently, even when the reason seems obvious.
- The legend "Valgt" dot is an empty `<span>`. With green text only, it shows no green.

### Result
- `--seat-taken` removed. `.seat.selected` now uses green text on sand, and `.seat.taken` is back to `opacity: 0.4` with a grey legend dot.

## Round 10 — glowing selected seats (2026-11-13)

### Goal
Selected seat numbers should radiate green, as if the button had a light inside.

### How we planned
- No questionnaire. You described the effect clearly ("like an actual button"), and it maps to one CSS property, `text-shadow`.

### What went well
- You compared the effect to a real object, which made the intent clear right away.

### Result
- `.seat.selected` has a two-layer green `text-shadow`: a tight 3px glow plus a wider 8px glow.

## Round 11 — darker palette and no green on seats (2026-11-13)

### How we planned
- Questionnaire with 2 questions: which green to remove (there were two), and how much darker to go (with colour previews).

### Decisions
| Question | Claude suggested | You chose |
| --- | --- | --- |
| Which green | (no default) | Selected seats only; the olive accent stays |
| Darkness | Mid-tone sand | Same as suggested |

### What went well
- Asking which green avoided removing the olive accent by mistake.
- Because every colour is a variable in `:root`, the whole palette changed by editing 4 lines.

### Result
- The surface and shadows are one step darker. Selected seats are bold and pressed in, with no colour.

## Round 12 — full-width hall and screen (2026-11-13)

### How we planned
- No questionnaire. Your screenshot plus "same width as other elements" left only one sensible fix.

### What went well
- The screenshot showed the mismatch clearly: the summary, inputs and button were full width, but the seats and screen were not.

### Result
- The screen has no side margins, the rows stretch, and the seats grow to share the width. The legend is unaffected.

## Round 13 — seat shape and wider row gaps (2026-11-13)

### How we planned
- Questionnaire with 1 question, with ASCII sketches: a rounded backrest (CSS only) or a backrest with armrests (extra `::after` element).

### Decisions
| Question | Claude suggested | You chose |
| --- | --- | --- |
| Seat shape | Rounded backrest | Same as suggested |

### What went well
- You linked the two wishes (narrower seats, bigger gaps) yourself. With `flex-grow`, raising the gap is enough to do both.
- Choosing the simple option avoided another pseudo-element experiment like Rounds 3–6.

### Result
- The seats have a backrest shape, and the row gap is 20px. The legend dots get the same shape automatically.

## Round 14 — "LERRET" inside the screen bar (2026-11-13)

### How we planned
- No questionnaire. The screenshot plus "put lerret inside the line" left one clear fix.

### Note
- This is the first round that touched JS (`view.js`). The text had to move into the screen element, which CSS alone can't do cleanly.

### Result
- One `.screen` element now holds the word. The bar is an inset groove with "LERRET" centred inside it.

## Round 15 — fields and summary side by side (2026-11-13)

### How we planned
- Screenshot plus a layout description. Questionnaire with 2 questions, with ASCII layout sketches: which side, and how the halves look.

### Decisions
| Question | Claude suggested | You chose |
| --- | --- | --- |
| Side | Fields left, summary right | Same as suggested |
| Look | Both inset boxes | Same as suggested |

### What went well
- You described the layout clearly (halves, rows, button unchanged). Only the side and the style were open.
- The ASCII sketches showed the layout before any code was written.

### Note
- This needed a structure change in `view.js`. The summary moved inside the form so both halves could share one flex row above the button.

### Result
- A two-column `.checkout` row: an inset fields box on the left and an inset summary box on the right. It stacks on small screens.

## Round 16 — inputs indented again (2026-11-13)

### Decision
- You wanted the inputs as indents, so the Round 15 change to raised inputs is undone.

### What could be better
- In Round 15, Claude made the inputs raised as part of a bigger option ("Both inset boxes, inputs raised"). Bundling a side change into a layout question hid it. Separate visual changes should get separate questions.

### Result
- The inputs use `--shadow-in` again.

## Round 17 — one shared checkout area (2026-11-13)

### Decision
- The fields and the summary share one inset area instead of two separate ones.
- The summary info sits in the top-right corner.

### How we planned
- No questionnaire. Both requests were precise and each mapped to a direct CSS change.

### Result
- `.checkout` holds the only inset shadow. `.summary` is aligned to the top right.

## Round 18 — no effect on the checkout area (2026-11-13)

### Decision
- You removed the neumorphic effect from the shared checkout area. Only the inputs stay indented.

### Pattern across Rounds 15–18
- The checkout area went from two inset boxes, to one, to none. Each step removed a layer, which suggests nested neumorphic effects feel too busy here. Next time, start with the fewest effects and add layers only if they are missing.

### Result
- `.checkout` has no shadow, corners or padding, so it is only a flex row.

## Round 19 — divider above the checkout area (2026-11-13)

### How we planned
- No questionnaire. "Line break" matched what you called the screen bar in Round 12, so Claude reused that look.

### Result
- An `<hr class="divider">` groove separates the seat area from the checkout area.

## Round 20 — divider matches the screen bar (2026-11-13)

### How we planned
- You pasted the screen bar's CSS as the reference, which removed any guessing.

### What could be better
- In Round 19, Claude copied the *idea* of the screen bar (an inset groove) but not its size. Copying the actual values from the start would have saved a round.

### Result
- `.divider` has the same height, corners, shadow and bottom margin as `.screen`.

## Round 21 — font and vertical spacing (2026-11-13)

### How we planned
- Screenshot plus 2 complaints. Questionnaire with 2 questions: which font (marked as a dependency) and how much vertical space.

### Decisions
| Question | Claude suggested | You chose |
| --- | --- | --- |
| Font | Nunito, Quicksand or the system font (no default) | Nunito (Google Font) |
| Vertical | About 1.5x | Same as suggested |

### What went well
- You had edited the CSS yourself (the screen padding and the divider height). Claude noticed and kept those values.
- The screenshot showed a hidden bug: with no showing selected, the title touched the screen bar.

### Note
- In Round 2 you postponed vertical spacing ("not right now"). This round picked it back up with the same 1.5x factor, so the two directions stay consistent.

### Result
- Nunito font, and about 1.5x vertical space throughout.

## Round 22 — no card around the app (2026-11-13)

### Decision
- You approved the Nunito font and removed the raised card around the whole app.

### Pattern
- This matches Rounds 15–18: you keep removing *container* effects (the checkout box, now the page card) and keep effects only on things you interact with or read (buttons, inputs, the screen, the summary). A useful rule for the rest of this design: neumorphic effects go on elements, not on wrappers.

### Result
- `.page` is a plain, centred column with no shadow, corners or own background.

## Round 23 — back to the lighter palette (2026-11-13)

### Decision
- You reverted the Round 11 darker palette to the original light sand palette.

### Note
- Removing the page card (Round 22) changes how the palette feels. Without the raised card, the whole screen is one colour, so the lighter sand may read better.
- Keeping the old values in this plan file made the revert exact, with no need to guess the colours.

### Result
- The 4 colour variables are back to their Round 1 values.

## Round 24 — larger fonts (2026-11-13)

### How we planned
- No questionnaire. Your screenshot showed that the text was small compared to its elements everywhere, so all sizes went up together.

### Note
- The fonts were sized for Arial, and Nunito looks smaller at the same size. Claude should have rechecked the sizes when the font changed in Round 21.

### Result
- The base text is 18px and every explicit font size is larger. The spacing is unchanged.

## Round 25 — subtle page gradient (2026-11-13)

### How we planned
- No questionnaire. "Follow the neumorphic pattern" set the direction (light from the top-left), and "very slight" set the strength.

### What went well
- Round 4's lesson (every effect follows one light source) was applied from the start this time.

### Result
- The page background fades from slightly lighter at the top-left to slightly darker at the bottom-right. The buttons keep the flat middle colour, `--surface`.

## Round 26 — stronger page gradient (2026-11-13)

### Decision
- Round 25 was too faint to see, so the gradient ends are about twice as far from the middle colour.

### What could be better
- "Very slight" was read too literally. For subtle effects, Claude could offer 2 strengths to compare instead of picking one.

### Result
- The page goes from `#f4ede3` at the top-left, through `--surface`, to `#d5c8b5` at the bottom-right.

## Round 27 — transparent buttons and inputs (2026-11-13)

### How we planned
- Claude offered this option twice (Rounds 25 and 26) as a follow-up, and you chose to try it.

### Note
- This only blends seamlessly because the body gradient uses `background-attachment: fixed`, so the gradient behind each button matches the gradient around it.

### Result
- Showings, seats, inputs and Reserver have no own background colour; they are shaped by their shadows alone.

## Round 28 — usability: selected seats, hover/focus, legend (2026-11-13)

### How we planned
- You asked an open question: what would make it more user-friendly? Claude reviewed the screenshot and gave 8 suggestions in 2 groups (seats, checkout). You picked 3 seat items and none of the checkout ones.

### Decisions
| Suggestion | Chosen |
| --- | --- |
| Mark selected seats clearly (olive number) | Yes |
| Give taken seats a shape | No |
| Hover lift + keyboard focus ring | Yes |
| Bigger, matching legend | Yes |
| List chosen seats, required fields, disabled button, remove duplicate info | No |

### What went well
- Asking Claude for suggestions instead of a specific fix brought up problems you hadn't named, like keyboard focus and the legend not matching.
- Grouping the suggestions let you accept or reject a whole area at once.

### Note
- The olive on selected seats partly reverses Round 11 (no green on seats). The plan flagged this openly instead of hiding it.

### Result
- Selected seats have olive numbers.
- Free seats and showings lift on hover.
- `:focus-visible` shows an olive ring for keyboard users.
- The legend samples are full seat size with a "1" in them. "Opptatt" now matches a taken seat in the hall.

## Round 29 — legend and seats share one shape (2026-11-13)

### What went wrong in Round 28
- The legend got its own fixed size (40×32px), but the hall seats stretched with `flex-grow`. So "matching" was only approximate, and the shapes differed.
- The "Opptatt" sample relied on a number to be visible. When the numbers were removed, it vanished.

### Your own edit
- You removed the "1" from the legend samples in `view.js`. Claude kept that choice.

### Lesson
- To make two things look identical, give them one shared size rule instead of two similar ones.

### Result
- Seats are a fixed 46px wide, and the rows spread them with `space-between`. The legend uses the same `.seat` size, and "Opptatt" is a faint filled seat.

## Round 30 — taken seats as dark, empty indents (2026-11-13)

### How we planned
- No questionnaire. The request named all three properties (indented, slightly darker, no numbers).

### Note
- Taken and selected seats are now both indented. They differ by fill (taken is darker and empty, selected has an olive number). Worth checking in the browser that they stay easy to tell apart.

### Result
- Taken seats are dark, empty indents, and the legend shows the same thing.

## Round 31 — taller seats (2026-11-13)

### How we planned
- No questionnaire. The screenshot showed clearly that the seats were too wide for their height.

### Note
- The seat proportions drifted over Rounds 12, 13 and 29, with width changing each time while the height stayed 32px. Claude should have checked the width-to-height ratio whenever the width changed.

### Result
- Seats are 42×46px with a rounder backrest. The legend matches.

## Round 32 — showing info in two columns (2026-11-13)

### How we planned
- No questionnaire. You gave the layout (left/right) and the constraint (no neumorphic container).

### Note
- It's the same left/right pattern as the checkout area (Round 15), which keeps the layout consistent.
- You stated "no neumorphic container" up front, following the Round 22 pattern (effects on elements, not wrappers).

### Result
- The title is on the left, and the time and price are right-aligned on the right. The block is about half as tall.

## Round 33 — less space above the title (2026-11-13)

### Note
- This was leftover space from the card removed in Round 22. Its inner padding was stacked on top of the body padding. Claude should have reviewed the `.page` padding when the card was removed.

### Result
- The space above "Kino" comes only from the body's 2rem padding, about half of what it was.

## Round 34 — summary row above side-by-side fields (2026-11-13)

### How we planned
- No questionnaire. The layout was clear: the data as a row on top, the two fields side by side below.

### Note
- This reverses the Round 15 layout (fields left, summary right). Seeing it in the browser showed that the right column was mostly empty space. The new layout uses the width better and is shorter.

### Result
- The summary row is on top, with Navn and Telefonnummer side by side below it. They stack on small screens.

## Round 35 — glow-tube effect on selections (2026-11-13)

### How we planned
- Questionnaire with 2 questions (colour with CSS previews, and scope).

### Decisions
| Question | Claude suggested | You chose |
| --- | --- | --- |
| Colour | Warm nixie orange | Same as suggested |
| Scope | (no default) | Selected seats, the showing title and the legend sample |

### Note
- This brings back a glow after Round 11 removed the green one. The difference is a three-layer "tube" glow in a warm colour that fits the earthy palette, instead of one green layer.
- The legend sample had no text to glow from (you removed the numbers), so a CSS-only dot was added. That respects your `view.js` edit.

### Result
- Selections glow warm orange from the text outward.

## Round 36 — dark "tube" behind the glow (2026-11-13)

### What went wrong in Round 35
- Claude suggested a glow on a light background. A glow is light added on top, so it needs a dark surrounding to show. On sand it reads as blur. Claude should have said this before suggesting it.

### How we planned
- Claude explained why it failed and offered 3 ways forward: revert, orange with no glow, or a dark tube. You chose the dark tube.

### Lesson
- Light effects (glow, neon) need a dark background, and shadow effects need a light one. Check which kind of effect it is before suggesting it on this palette.

### Result
- Selected seats, the selected showing and the legend "Valgt" sample are dark brown, pressed-in "tubes" with glowing orange text.

## Round 37 — glow tube like the reference (2026-11-13)

### How we planned
- You sent a reference photo of real nixie tubes. This was the clearest input of the whole project.
- Claude followed the 2-failed-attempts rule: it stopped, described what the reference shows (thin filaments, warm inner light, bloom), and offered a test page, a direct variant, or dropping the glow. You chose the direct variant B.

### What went well
- A reference image beats words for visual effects. "Glow tube" meant different things to Claude (bold text with a halo, then a black glass) and to you (thin filaments in warm light).

### Lesson
- For effects named after real objects, ask for or look at a reference before the first attempt.

### Result
- Selected seats and the showing have a warm amber light in the centre, with thin, pale glowing text and orange bloom. The sand edges still show.

## Round 38 — the showing title glows on its own (2026-11-13)

### How we planned
- You sent only a screenshot. Claude described what worked (the legend dot) and what didn't (the light in the middle of the showing, away from its title), then asked 1 question.

### What went well
- Naming what *worked* gave a target to aim for, not just a list of problems.

### Lesson
- A centred light only fits centred content. When the text is off-centre, the light must come from the text itself (`text-shadow`), not from the background.

### Result
- The selected showing has only a glowing orange title. Selected seats keep the amber light behind their centred digit.

## Round 39 — drop the glow, muted yellow selections (2026-11-13)

### Decision
- After 4 glow attempts (Rounds 35–38) you dropped the glow. Selections now get a muted yellow background with unchanged text.
- You also reported that the page gradient looked broken.

### What went wrong with the glow
- The effect fights the palette. A light, low-contrast sand page has no darkness for light to show against. Every fix (a black tube, a radial light, a text-only glow) traded one problem for another.
- Claude's own rule (stop after 2 failed attempts) was applied in Round 37, but the direct variant still went ahead without a test page. The test-page option would have cost less.

### Background bug
- Claude couldn't see the bug directly. The likely cause is `background-attachment: fixed` on `body`, which some browsers (Safari in particular) handle badly. It was replaced with a fixed `body::before` layer, which is the standard, reliable way. You need to confirm in the browser that it's fixed.

### Result
- No glow code is left. Selections are muted yellow and pressed in, and the gradient sits on a fixed layer behind the page.

## Round 40 — no autofill colour on inputs (2026-11-13)

### Note
- The light blue came from the browser's autofill styling, not from our CSS. Claude hadn't tested with autofill, so it only showed once you typed in a real browser.

### Result
- Autofilled inputs keep the transparent background and the normal text colour.

## Round 41 — align the showing title with the details (2026-11-13)

### Note
- `baseline` was chosen over `flex-start`. Because the title is bigger than the details, aligning the tops of the boxes would still look a little off. Aligning the text lines looks even.

### Result
- The title sits on the same line as the date.
