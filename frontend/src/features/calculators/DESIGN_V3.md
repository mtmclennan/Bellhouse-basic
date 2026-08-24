# Calculator Design V3 Baseline

Use the V3 React source from the Bellhouse calculator design archive as the
visual reference. The archive's exported desktop and mobile screenshots predate
the V3 source and are not the final structural reference.

Shared calculator pages follow this order:

1. Hero
2. Calculator
3. How it works
4. Reference tables
5. Field notes
6. Next steps
7. FAQ
8. Final CTA

The production calculator intentionally differs from the prototype where the
Bellhouse calculator standards require stronger behavior:

- Metric dimensions keep a unit selector on each field.
- Calculations normalize all dimensions to metres before using the engine.
- Truck loads use tonnage and effective legal payload, not box volume alone.
- Half-load season is manual and never tied to hardcoded dates.
- Moisture, compaction, and hauling overrides remain available as advanced
  settings.
- Input and output unit selections remain independent.
