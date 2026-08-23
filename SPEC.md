# Experience Specification

## Status

**Interactive experience implemented after Gate 1 approval.** The accompanying build now carries the settled geometric engine through a prologue, eleven distinct Watches, and an epilogue while retaining explicit source / interpretation notes.

## Working title

Two candidates remain open:

- **The Eleven Watches** - stronger if the experience is felt as a sequence of attentional states.
- **Masters of the Design** - stronger if the finished work foregrounds geometry, lineage, and the phrase used by Shah.

Prototype label: **Masters of the Design / Geometry Study 01**. This is not a final title decision.

## Experience thesis

One living geometric object carries the whole work.

The visitor does not encounter eleven separate illustrations. Each principle changes the behavior, visibility, tempo, or spatial reading of the same mathematically generated sign.

Narrative arc:

`point -> construction -> multiplicity -> attention -> return -> point`

The interactive pairing is contemporary interpretation. Research notes remain available so visual poetry never becomes a false historical claim.

## Geometry engine

### Coordinate system

Inputs:

- viewport width and height;
- center `cx = width / 2`, `cy = height / 2`;
- radius `r = min(width, height) * scale`;
- nine equal angular intervals.

Numbering uses 9 at the top and proceeds clockwise through 1-8:

```text
k(9) = 0
k(n) = n, for n = 1...8
theta(n) = -pi/2 + k(n) * 2pi/9
x(n) = cx + r * cos(theta(n))
y(n) = cy + r * sin(theta(n))
```

Derived layers:

1. center / zero;
2. circumference;
3. nine points and labels;
4. 120-degree sector axes through 9, 3, and 6;
5. numeric triangle `9 -> 3 -> 6 -> 9`;
6. movement line `1 -> 4 -> 2 -> 8 -> 5 -> 7 -> 1`;
7. independently scalable spiritual-heart triangle around zero.

No core path is manually traced. Every point and connection comes from numeric data.

### Prototype controls

The review prototype exposes simple layer toggles:

- Center / zero
- Circumference
- 40-degree divisions
- 9 / 3 / 6 triangle
- 1 / 4 / 2 / 8 / 5 / 7 line
- Number labels
- Spiritual-heart triangle

This tests coordinate generation, graph order, resizing, and conceptual layer separation. It does **not** test the eleven scene behaviors.

## Full narrative - implemented after approval

### Prologue: The Point

Start in near darkness with only a point. Construct the sign from code in a legible sequence: point, circumference, divisions, positions, triangle, movement line. The future animation must reveal logical dependency rather than decorate the symbol.

### The eleven Watches

| # | Principle | Core interaction | Source / interpretation status |
|---|---|---|---|
| 1 | Hosh dar dam | Subtle expansion, interval, contraction, and circulating luminosity | Bakhtiar supports breath/movement; the pairing is interpretive |
| 2 | Nazar bar qadam | Only current and next positions resolve | Interpretive |
| 3 | Safar dar watan | Spatial travel from rim toward center | Bakhtiar supports inward movement; scene is interpretive |
| 4 | Khalwat dar anjuman | Active periphery, still center | Center/periphery adjacency; behavior is interpretive |
| 5 | Yad kard | Recurrence through the same center, gaining clarity | Interpretive; not a dhikr exercise |
| 6 | Baz gasht | Extended paths pull back and return | Visual bridge between the two source renderings |
| 7 | Nigah dasht | Movement disturbs; stillness / touch-hold realigns | Interpretive and gently usable |
| 8 | Yad dasht | Transformation occurs while a center relation persists | Conceptually adjacent; behavior is interpretive |
| 9 | Wuquf-i zamani | Motion suspends and accumulated traces remain | Interpretive |
| 10 | Wuquf-i adadi | Numerical skeleton replaces ornament | Math is Bakhtiar-supported; pairing is interpretive |
| 11 | Wuquf-i qalbi | Periphery, numbers, and movement recede toward heart triangle and zero | Heart geometry is supported; culmination is interpretive |

### Epilogue: Return

The movement line fades, then numbers, nine positions, circumference, and finally the heart triangle. One point remains. Hold the point before sources or navigation reappear.

## Motion language

The full build should use one coherent vocabulary:

- **breathe:** scale / luminosity variation below the threshold of spectacle;
- **travel:** interpolation along existing radii and graph edges;
- **remember:** recurrence with accumulated clarity;
- **return:** reverse interpolation toward source coordinates;
- **watch:** noise amplitude controlled by user steadiness;
- **pause:** freeze logical time while retaining prior-state traces;
- **recede:** opacity and structural subtraction, not a climactic effect.

Motion constants should be centralized. Scene code may alter parameters, but should not introduce unrelated animation styles.

## Content model

Each scene receives four separately stored fields:

```text
transliteration
careful English rendering
source summary
interpretive interaction note
```

The interface shows only the first two plus one concise sentence by default. Source and interpretation notes may expand on request.

The content model must not store source statement and interpretation in one undifferentiated paragraph.

## Visual direction

- near-black field;
- warm ivory geometry;
- muted gold only for current attention, center, or source-critical emphasis;
- no stock imagery, mosque silhouettes, crescents, blue-purple mystical gradients, glass cards, or personality-enneagram styling;
- typography scholarly and contemporary, with no decorative pseudo-Arabic treatment;
- geometry remains dominant at every viewport.

## Input model

- **Primary:** scroll or deliberate next/previous navigation advances narrative state.
- **Keyboard:** arrow keys, tab order, Enter / Space for controls.
- **Touch:** direct tapping and press-and-hold substitutes for hover / mouse stillness.
- **Pointer:** never required for basic comprehension.
- **Reduced motion:** exposes stable before/after states, stepwise changes, and explicit pause controls rather than removing meaning.

## Mobile strategy

Mobile is a distinct composition:

- geometry occupies the upper visual field or full-width square;
- scene label and one-sentence meaning sit below or overlay only in protected negative space;
- long source notes open in a sheet, never permanently squeeze the sign;
- stillness interaction becomes touch-and-hold;
- scroll distances shorten while preserving state transitions;
- numeric labels scale from radius and remain readable without collision.

## Performance strategy

- compute base point positions only when size changes;
- represent graph connections as arrays of numbers;
- apply transforms to cached coordinates during animation;
- use one `requestAnimationFrame` loop for the active scene only;
- pause work when the page is hidden;
- avoid WebGL unless one approved scene demonstrably requires depth;
- target smooth operation on current mid-range mobile hardware.

## Accessibility acceptance criteria

- all controls have visible focus and semantic labels;
- every prototype layer can be toggled by keyboard;
- canvas has an equivalent textual description of active layers;
- no meaning depends on color alone;
- reduced-motion mode retains the geometry and state logic;
- type meets readable contrast and minimum mobile sizing;
- touch targets are at least 44 by 44 CSS pixels where space permits.

## Research and safety acceptance criteria

- every Bakhtiar claim has a page reference in `RESEARCH.md`;
- every principle / geometry connection is labeled directly supported, conceptually adjacent, or our interpretation;
- *baz gasht* preserves restraint / returning as a real source difference;
- final three *wuquf* entries are not attributed to the supplied expanded excerpt;
- no practice instructions, prescribed counts, breath retention, or promises of attainment appear in the experience;
- source and interpretation fields remain separate in code and copy.

## Staged build gates

### Gate 1 - complete

- `RESEARCH.md` complete;
- `SPEC.md` complete;
- responsive geometric prototype verified;
- no eleven-scene animation implemented.

### Gate 2 - complete

After approval, prototype only breath, inward/outward travel, recurrence, stillness, and disappearance on the same geometry.

### Gate 3 - complete

Build only Hosh dar dam, Khalwat dar anjuman, and Wuquf-i adadi. Review meaning, motion, and source labeling.

### Gate 4 - implemented

Proceed to the remaining Watches, prologue, epilogue, source notes, accessibility, mobile, and performance only after Gate 3 approval.

## Current implementation

The current build includes the mathematical construction, eleven scene behaviors, keyboard and touch navigation, reduced-motion states, expandable source notes, a mobile-specific composition, and the final return to the point. Review should now assess both the settled geometry and whether each interpretive behavior communicates its principle without being mistaken for a traditional one-to-one mapping.
