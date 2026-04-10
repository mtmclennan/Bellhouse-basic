# Bellhouse Build Rules

## General Bellhouse Rules

- Reuse existing shared components before creating new ones.
- Maintain the current SASS-based design system and overall Bellhouse visual language.
- Each section or feature must have one distinct purpose.
- Do not add extra sections or UI just to compensate for weak content.
- Avoid repeating the same value proposition across multiple sections.
- Keep wording practical, direct, and grounded in real excavation and construction work.
- Remove placeholder or meta copy that talks about the page instead of the customer.
- Avoid vague marketing language.
- Prefer adapting existing section patterns over creating one-off UI.
- Match existing spacing, typography, responsive behavior, and visual hierarchy.
- Keep pages and tools focused on clarity, usability, SEO structure, and conversion.
- Support SEO through strong structure, internal linking, and clear page intent, not keyword stuffing.
- Internal links should be natural, relevant, and useful.
- CTA language should be clear, direct, and action-oriented.
- Match tone to audience:
  - homeowner-facing pages should feel clear and reassuring
  - contractor-facing pages should feel direct, operational, and capability-focused

---

## Calculator Feature Standards

### Purpose

Bellhouse calculators should function as practical estimating tools for real users, not as isolated one-off widgets.

They should be built as one reusable calculator system that can support multiple Bellhouse calculator pages while keeping logic, config, and presentation maintainable.

Initial calculator types include:

- Excavation
- Gravel / Aggregate
- Topsoil

Future calculators should extend the same system instead of duplicating logic, form behavior, or styling.

### Core Calculator Rules

- Reuse shared calculator components before creating new ones.
- Keep calculation logic separate from UI.
- Keep calculator definitions and material defaults config-driven.
- Do not duplicate form or math logic across calculator pages.
- Do not pass raw form-state values directly into the calculation engine.
- Normalize and validate form input before calculation.
- Keep type safety strong throughout the calculator feature.
- Prefer extending the shared engine over building page-specific one-off calculators.

### Calculator Architecture Rules

Use and maintain a reusable calculator structure with clear separation of concerns.

Recommended responsibilities:

- `components/`: shared calculator UI
- `config/`: calculator definitions, material defaults, display behavior
- `logic/`: calculations, normalization, conversions, domain-specific rules
- `types/`: calculator input, output, and material types
- `utils/`: generic helpers only

Do not place calculator-specific normalization or business rules in generic utilities.

### Mobile-First Calculator Rules

Assume many users will access Bellhouse calculators on mobile while on-site, in vehicles, or away from a desk.

- Design calculators mobile-first.
- Prioritize quick entry, scanability, and clear outputs on phones used on-site.
- Stack fields vertically on smaller screens.
- Avoid cramped multi-column forms on mobile.
- Use large tap targets for inputs, checkboxes, toggles, and selects.
- Preserve readable font sizes, field spacing, and touch-friendly separation between controls.
- Keep grouped dimension inputs practical on mobile so they stay thumb-friendly even when using separate unit fields.
- Support separate feet and inches inputs without making the mobile layout cramped or hard to tap.
- Avoid tiny helper text or dense instructional copy near the calculator.
- Avoid layouts that require horizontal scrolling.
- Results must be easy to scan quickly on mobile, with the most important outputs visible in compact stacked blocks or cards.
- Keep labels, values, and spacing clear enough that users can check results quickly from the cab, site, or yard without hunting across the screen.
- Desktop enhancements must not reduce mobile usability.

### Calculator Styling Rules

- Calculator pages must feel consistent with the Bellhouse site.
- Reuse the existing design system wherever possible.
- Keep the UI practical, modern, and contractor-friendly.
- Prioritize readability, structure, and speed of use over decorative design.
- Use spacing, borders, grouping, and hierarchy to improve clarity.
- Keep advanced settings visually secondary until enabled.
- Results should be visually prominent and easy to scan.
- Prefer simple result cards or stacked blocks over wide tables for core outputs.
- Do not introduce a completely separate visual language just for calculators.

### Calculator UI and Layout Rules

- Calculator pages should feel like compact estimating tools, not oversized generic forms.
- Keep the calculator shell tighter and more compact than a typical landing page form.
- Avoid oversized calculator shells that make the tool feel bloated or slow to scan.
- Avoid overly large cards, excessive card padding, and oversized result panels.
- Avoid unnecessarily wide input fields on desktop when a narrower working width is more practical.
- Group related dimension fields together to reduce visual sprawl and make entry faster.
- Keep advanced settings visually secondary and collapsed or hidden until enabled.
- Results should stay compact, easy to scan, and should not dominate the page with oversized blocks.
- Prefer compact result cards or stacked result groups over large summary panels with excessive empty space.
- Desktop layout can open up more than mobile, but it should still feel like a practical estimating tool rather than a marketing page form.

### Input and Output Unit Rules

Users must be able to choose input units separately from output display.

#### Input units

The main input unit selector should be simple and limited to:

- Metric
- Imperial

Do not overload the main input selector with sub-unit choices or output-display choices.

#### Output display

Output display should be controlled in the results area, not in the main input section.

Default output display should be:

- Same as input

Users should also be able to switch results to:

- Metric
- Imperial
- Both

Do not assume output units should always match the selected input units, but document "Same as input" as the default result-display behavior.

Users should be able to:

- enter dimensions in metric and view imperial outputs
- enter dimensions in imperial and view metric outputs
- view both where useful
- Changing output display should affect result presentation only, not input behavior or calculation logic.

### Dimension Input UX Rules

Dimension entry must feel intuitive for real users, especially on mobile.

#### Metric input behavior

- In metric mode, each dimension should use:
  - one numeric input
  - one unit selector
- Supported metric dimension units:
  - m
  - cm
  - mm
- Prefer a single value plus a unit selector over multiple separate metric sub-unit fields.
- Keep any per-field unit handling inside the dimension inputs, not in the main input-system selector.
- Do not force users to convert everything mentally into decimal metres before entry.

#### Imperial input behavior

- In imperial mode, length and width should support separate feet and inches inputs.
- Do not rely only on decimal feet for the main UI.
- Depth input should be calculator-specific:
  - excavation may use feet + inches
  - gravel and topsoil should prefer inches

#### Normalization rule

- All dimension inputs must be normalized before calculation.
- The calculation engine should receive normalized numeric values only.
- Metric dimensions entered as `m`, `cm`, or `mm` should normalize to metres.
- Imperial dimensions entered as `ft` and `in` should normalize to metres.
- Detailed normalization requirements should stay in the calculation rules so the implementation has one source of truth.

#### Usability rule

- Avoid input patterns that require unnecessary conversion in the user’s head.
- Prefer practical field behavior over mathematically neat but awkward UI.

### Calculator Input Rules

All calculators should support:

#### Basic inputs

- Length
- Width
- Depth
- Input unit system
- Material selection

#### Advanced inputs

- Swell factor
- Wet material percentage adjustment
- Compaction percentage
- Truck capacity in tons
- Half-load season / road restriction toggle

### Calculator Output Rules

At minimum support:

- Base volume
- Adjusted volume
- Cubic metres (m³)
- Cubic yards (yd³)
- Tonnage
- Estimated truck loads

Where appropriate, the UI may show metric and imperial volume outputs together.

### Calculator Calculation Rules

#### Base flow

1. Convert all dimensional inputs to metric base units for internal calculation.
2. Calculate base volume.
3. Apply swell factor when enabled or applicable.
4. Apply compaction adjustment when enabled or applicable.
5. Apply wet material adjustment to tonnage.
6. Calculate estimated truck loads using effective truck capacity.
7. Convert results into the selected output unit display.

#### Normalization rule

The calculation engine must only receive normalized calculation input with numeric values where numbers are required.

Do not pass raw form input into the calculation engine if form state can contain:

- empty strings
- undefined placeholders
- partially entered values

Use a dedicated normalization step between form state and calculation logic.

Normalization must account for the dimension-entry model used in the UI:

- Metric dimensions entered as `m`, `cm`, or `mm` must normalize to metres before calculation.
- Imperial dimensions entered as `ft` and `in` must normalize to metres before calculation.
- The calculation layer should work from normalized numeric values only, never raw UI field values.
- Keep the separation between form input state and normalized calculation input types intact.

#### Wet material rule

- Wet material should be entered as a percentage adjustment in the UI.
- Wet material affects tonnage, not base volume.
- The calculation layer may convert the percentage to an internal multiplier.

Example:

- 8% wet adjustment => 1.08 multiplier

#### Compaction rule

- Compaction should be entered as a percentage in the UI, not as a raw factor.
- The calculation layer may convert the percentage to an internal multiplier.

Example:

- 10% compaction => 1.10
- 15% compaction => 1.15

Do not expose raw multipliers in the main UI unless there is a strong reason.

### Half-Load Season Rule

Support a manual checkbox for:

- Half-load season
- or Road restriction / half-load season

Important:

- Do not hardcode Ontario dates or municipality schedules.
- Do not auto-enable this based on the current date.
- Treat this as a manual user-controlled setting.

Behavior:

- This setting should affect the estimated legal truck payload used for load-count calculations.
- It should not change project volume or total tonnage.
- Default behavior can reduce allowed truck payload to 50% of entered truck capacity.
- Keep this reduction configurable if practical.

If helpful, clearly label this as affecting road-legal hauling estimates only.

### Type Safety Rules

Use separate types for:

- form input state
- normalized calculation input

Example pattern:

- `CalculatorFormInput`
- `CalculatorCalculationInput`

The calculation engine should accept only normalized calculation input.

Do not weaken field typing to generic `string` when the field should be a known key of the calculator input type.

Prefer shared update handler types across calculator components rather than redefining looser prop types in child components.

### Material and Config Rules

Material definitions must be config-driven.

Each material should support:

- id
- name
- density in tons per m³
- default swell factor
- default compaction behavior
- optional wet adjustment default

Calculator definitions must also be config-driven.

Each calculator config should control:

- title
- description
- default material
- allowed materials
- which advanced controls are shown
- field labels
- unit labels
- dimension input behavior by calculator type
- result display preferences

Do not show all materials on every calculator page if they are not relevant to that calculator type.

### Calculator Page Rules

Each calculator page should:

- reuse the shared calculator framework
- provide calculator-specific title, intro, labels, and defaults
- feel tailored to the actual use case
- not duplicate logic from another calculator page

Calculator pages may include supporting SEO copy below the tool, but that copy must remain practical and useful.

### Calculator Acceptance Criteria

A calculator implementation is complete when:

- users can select Metric or Imperial as the main input system
- metric inputs support m, cm, and mm entry
- imperial inputs support intuitive feet and inches entry where appropriate
- output display defaults to "Same as input"
- output display can be switched in the results area
- users can still view metric, imperial, or both outputs
- the calculation engine only receives normalized numeric input
- excavation, gravel, and topsoil all run on the shared system
- advanced settings are supported and type-safe
- half-load mode can be enabled manually
- results display clearly on mobile and desktop
- the calculator remains reusable and easy to extend

---

## Service Area Page Standards

### Purpose

Service-area pages should target local excavation intent while remaining useful, unique, and conversion-focused.

### Required Structure

- Hero
- Local intro
- Core services
- Why choose Bellhouse
- Who it’s for
- FAQ
- CTA

### Structure Rules

- Each section must have one clear purpose.
- Do not repeat the same value proposition across hero, intro, services, and why-choose sections.
- Do not create extra sections to solve weak content.
- All service-area pages must follow the same overall structure.
- Each page must still feel locally unique.

### Local SEO Rules

- Each page must include real local context such as terrain, access conditions, job types, or project realities relevant to the area.
- Avoid generic “we serve [city]” language.
- Do not create doorway-style pages with swapped city names.
- Do not imply Bellhouse has physical offices in every city.

### Conversion Rules

- CTA must be clear, direct, and practical.
- Avoid vague or soft language.
- Include one strong CTA. A mid-page CTA is optional only if it is justified and not repetitive.

### Content Rules

- Keep wording practical, direct, and contractor-focused.
- Remove placeholder or meta explanations about the page itself.
- Avoid generic marketing language.

### Trust Rules

- Include regional credibility where appropriate, such as long-term experience or years in business.
- Do not imply Bellhouse has locations in every service area.

### FAQ Rules

- FAQs must answer real customer questions.
- Answers must be complete and useful, not just short filler responses.
- FAQs should support both SEO and conversion.

### Internal Linking Rules

- Link naturally to core service pages where relevant.
- Use descriptive anchor text.
- Avoid overlinking.

---

## Contractor / Builder Landing Page Standards

### Purpose

Contractor and builder pages should position Bellhouse as a reliable excavation, trucking, and site support partner for builders, contractors, and developers.

These pages should emphasize repeat project support, active job site experience, practical coordination, and the ability to support larger or ongoing construction work.

### Target Audience

Examples include:

- home builders
- general contractors
- design-build companies
- concrete contractors
- property developers

### Recommended Structure

- Hero
- Who we work with
- Project support / scopes handled
- Why contractors work with Bellhouse
- Equipment / capability section
- Process or coordination section
- Contractor-focused CTA / form
- FAQ if useful and not repetitive

### Page Rules

- Do not force the service-area page structure onto contractor-focused landing pages.
- Keep the page operational, practical, and capability-focused.
- Avoid homeowner-oriented messaging.
- Emphasize excavation, grading, trucking, material hauling, and additional equipment or operator support.
- Show how Bellhouse fits into ongoing projects, larger sites, and subcontractor workflows.
- Mention larger-site capability where relevant, including the Volvo A35 articulated off-road truck.
- Avoid generic “full-service” claims unless supported by specific capabilities.
- Keep trust signals practical and believable.
- Use internal links to relevant service pages, service areas, and contact pages naturally.

### Contractor Page Rules

- Reuse existing components before creating new ones.
- Keep the current SASS-based design system.
- Do not add extra sections to solve weak content.
- Each section must have one clear purpose.
- Remove repeated messaging across sections.
- Keep copy practical, direct, and contractor-focused.
- Do not imply Bellhouse has physical offices in every city.
- Prioritize conversion, scanability, and real-world jobsite language.
- Use “Volvo A35 articulated off-road dump truck” on first mention only.
- After first mention, shorten to “Volvo A35” or “off-road dump truck”.
- Do not use “rock truck” as the main label.
- Use buttons for primary conversion actions.
- Use text links or cards for supporting navigation.
- Contractor pages should favor clear CTA hierarchy over plain inline link text.

### CTA / Form Rules

- Contractor pages should use a more practical, project-focused CTA.
- Forms should prioritize useful project details such as company name, contact info, project location, scope, and timeline.
- Reuse an existing form pattern if possible.
- If file upload does not already exist, do not build unnecessary complexity unless the task specifically requires it.

---

## Reuse and Component Discipline

- Before building a new section, check whether a similar section or pattern already exists in the Bellhouse codebase.
- Reuse existing FAQ, CTA, card grid, section header, and form components wherever possible.
- Do not create duplicate components unless there is a clear functional difference.
- Prefer extending an existing reusable component over introducing a one-off version.

---

## Final Standard

Every Bellhouse page or calculator should feel purposeful, credible, and specific to its audience.

Do not make pages longer by repeating the same message in different sections.
Do not create structure for its own sake.
Build pages and tools that are clear, useful, and easy for real customers or contractors to act on.
