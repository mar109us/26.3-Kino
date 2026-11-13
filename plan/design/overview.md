# Neumorphic redesign — overview

## What was done

Restyled the Kino app in a neumorphic style in `neumorphic.css`.

Light sand palette, raised buttons, pressed-in inputs, the Nunito font and a subtle page gradient.

Seat-shaped seats. Selected seats are muted yellow and taken seats are dark indents.

Tighter layout: the showing info in two columns, the name and phone fields side by side, and no card around the app.

Tried and dropped: an indent on the buttons and a glow on selections.

## Why

I wanted a soft, tactile look with earthy colours instead of the flat default style.

Each change came from looking at the result in the browser and fixing what felt off: spacing, sizes, readability, or seats that didn't look like seats.

Effects that didn't fit the light palette, like the glow, were dropped instead of forced.

## How I used Claude

### As a hands-on tool.

I made the design decisions, and Claude turned them into CSS and explained the _why_ behind each change.

### Screenshots as feedback

I showed the problem instead of describing it, and Claude fixed it.

### Questionnaires before plans

When something was open (colours, sizes, layout), Claude asked short questions with previews, and I picked.

### I stayed in control.

I rejected, reverted and edited the code myself when something was wrong. Claude kept my edits.

### Plans and evaluation saved.

Every round is logged in `new style plan with claude.md` and evaluated in `claude-evaluation.md`.

## Key lesson

concrete input (screenshots, CSS values, a reference photo) got good results fast. Vague visual ideas took several tries.
