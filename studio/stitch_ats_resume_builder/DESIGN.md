---
name: Executive Precision
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#45464d'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#76777d'
  outline-variant: '#c6c6cd'
  surface-tint: '#565e74'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#131b2e'
  on-primary-container: '#7c839b'
  inverse-primary: '#bec6e0'
  secondary: '#505f76'
  on-secondary: '#ffffff'
  secondary-container: '#d0e1fb'
  on-secondary-container: '#54647a'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#271901'
  on-tertiary-container: '#98805d'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dae2fd'
  primary-fixed-dim: '#bec6e0'
  on-primary-fixed: '#131b2e'
  on-primary-fixed-variant: '#3f465c'
  secondary-fixed: '#d3e4fe'
  secondary-fixed-dim: '#b7c8e1'
  on-secondary-fixed: '#0b1c30'
  on-secondary-fixed-variant: '#38485d'
  tertiary-fixed: '#fcdeb5'
  tertiary-fixed-dim: '#dec29a'
  on-tertiary-fixed: '#271901'
  on-tertiary-fixed-variant: '#574425'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
typography:
  name-lg:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.02em
  section-title:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '700'
    lineHeight: 20px
    letterSpacing: 0.05em
  job-title:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
  body-main:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '400'
    lineHeight: 18px
  body-meta:
    fontFamily: Inter
    fontSize: 10px
    fontWeight: '400'
    lineHeight: 16px
  label-caps:
    fontFamily: Inter
    fontSize: 9px
    fontWeight: '600'
    lineHeight: 12px
    letterSpacing: 0.05em
spacing:
  page-margin-x: 0.75in
  page-margin-y: 0.75in
  section-gap: 24px
  entry-gap: 16px
  bullet-indent: 12px
  stack-space: 4px
---

## Brand & Style

The design system is engineered for professional clarity, focusing on "signal over noise." It targets high-stakes career environments where readability, information density, and machine-compatibility are paramount. The aesthetic is a refined **Minimalism** blended with **Corporate Modern** sensibilities, emphasizing a "document-first" philosophy. 

The emotional response should be one of competence, reliability, and meticulous attention to detail. By stripping away decorative flourishes and non-standard layouts, the design system ensures that the candidate's experience remains the sole focus for both human recruiters and automated tracking systems (ATS).

## Colors

This design system utilizes a high-contrast, monochromatic-dominant palette to ensure maximum legibility. 
- **Primary:** A deep navy (#0F172A) used sparingly for section headings and subtle UI accents to convey authority.
- **Secondary:** A neutral slate (#64748B) for metadata, dates, and secondary labels to create visual hierarchy without sacrificing scanability.
- **Background:** Pure white (#FFFFFF) is mandatory for the main document body to ensure perfect OCR (Optical Character Recognition) performance.
- **Dividers:** Very light grey (#E2E8F0) for hairline horizontal rules that separate major sections.

## Typography

The typography uses **Inter**, a highly legible neo-grotesque sans-serif designed for screens and high-resolution print. The scale is disciplined, relying on weight changes and casing rather than massive size shifts to indicate hierarchy.

- **Headlines:** The candidate's name uses `name-lg`. Section headers use `section-title` with an uppercase transformation to create clear anchors for the eye.
- **Body:** Standardized at 11px for optimal information density while remaining accessible. 
- **Metadata:** Dates and locations use `body-meta` in a secondary color to de-emphasize them relative to job titles and achievements.
- **ATS Optimization:** Avoid glyphs, icons, or custom ligatures that might confuse parser software.

## Layout & Spacing

The layout follows a **Fixed Grid** model based on standard A4 or Letter dimensions. It utilizes a single-column primary flow to ensure that ATS software reads the content in the intended chronological or functional order.

- **Margins:** Standardized at 0.75 inches to balance whitespace with content volume.
- **Hierarchy:** Use `section-gap` between major blocks (e.g., Experience to Education). Use `entry-gap` between individual roles or schools.
- **Vertical Rhythm:** Content should be strictly top-to-bottom. Avoid sidebars or floating text boxes which can break the parsing logic of older recruitment software.

## Elevation & Depth

This design system is strictly **Flat**. There are no shadows, blurs, or 3D effects. Depth is communicated exclusively through **Tonal Layers** and line work:
- **Hairline Borders:** 1pt solid lines in `divider_hex` are used under section titles to provide horizontal anchoring.
- **Text Weight:** Boldness (600-700 weight) creates the "front" layer of information, while regular weights (400) form the "base" layer.
- **Zero Transparency:** All elements must be 100% opaque to ensure high-contrast ratios for automated scanners.

## Shapes

The shape language is **Sharp (0)**. 
- **Buttons/Chips:** If used for digital versions (e.g., skill tags), these should be rectangular boxes with 0px radius and 1px borders.
- **Visual Dividers:** All lines are squared off at the terminals.
- **Context:** The use of sharp corners reinforces the professional, structured, and "no-nonsense" character of the document.

## Components

### Section Header
Comprised of a `section-title` followed by a 1pt horizontal rule (`divider_hex`) spanning the full width of the column. Margin-bottom: `stack-space`.

### Professional Entry
A vertical stack starting with `job-title` and Company Name on the same line (spaced via flex-justify). Below this, `body-meta` for dates and location.

### Bulleted Lists
Standard circular bullets only. Indent by `bullet-indent`. Ensure no nested lists to maintain ATS compatibility. Use `body-main` for bullet text.

### Skill Matrix
Instead of "progress bars" (which are unreadable by ATS), skills should be listed as a comma-separated string or a simple grid of text-based tags with sharp corners.

### Contact Bar
A single line or compact stack at the top of the document using `body-meta`. Use pipe separators (`|`) instead of icons for phone, email, and LinkedIn URLs.