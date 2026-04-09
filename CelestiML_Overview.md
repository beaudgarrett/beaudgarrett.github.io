# CelestiML — Massive Overview

## Core Concept

CelestiML is an interactive web-based astronomy tool that lets a user enter a date, optionally a time and location, and explore how the planets were positioned at that moment in a fully interactive 3D scene.

But the real power is that it is not just a visualizer. It also has two deeper systems:

- A **machine learning model** that learns to predict planetary positions from time data, acting as a neural approximation of celestial mechanics.
- An **alignment intelligence system** that detects unusual planetary configurations and assigns them a rarity score, so users can see whether their chosen date had a common or unusually interesting sky layout.

So the site becomes part:

- astronomy experience
- ML experiment
- research showcase
- polished portfolio project

---

## What the User Experiences

### Main Interaction

A user lands on CelestiML and sees a sleek, space-themed interface. They can enter:

- date of birth
- year
- exact time (if known)
- optional location

CelestiML then generates a **3D solar-system-style visualization** showing where the planets were on that date.

The user can:

- rotate the system
- zoom in and out
- click on planets
- scrub through time
- compare nearby days or years
- toggle visual overlays for alignments and rare formations

This alone is already a strong project — but underneath, it is backed by two advanced layers.

---

## Layer 1: ML-Based Orbit Approximation

### What This Means

Normally, planetary positions come from astronomy equations and ephemeris data. CelestiML also uses a **neural network trained on real astronomical data** to predict the positions of the planets.

The project answers a core scientific question:

> *Can a neural network learn and approximate celestial motion well enough to recreate solar system positions from time alone?*

That is the ML research angle.

### Inputs to the Model

The model takes time-based features such as:

- year, month, day, time
- normalized timestamp
- cyclical encodings for periodic motion

### Outputs

Predicted coordinates for each planet (`x`, `y`, `z`) for Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, and Neptune (potentially Pluto as well).

### What It Does in the App

The user can switch between:

- **Physics mode** — uses real astronomy calculations / ephemeris data
- **ML mode** — uses the trained neural model's predicted coordinates

This gives a natural visual comparison between real positions, predicted positions, and the difference between them.

### Why This Is Impressive

- A true regression ML problem with a scientific dataset
- Measurable error and beautiful 3D output
- A legitimate research paper angle
- Feels like scientific computing, not a standard portfolio toy

---

## Layer 2: Alignment Detection and Rarity Scoring

### What This Means

CelestiML doesn't just show where planets were — it **analyzes the arrangement** and determines whether the date had:

- near alignments
- clustered groupings
- wide dispersion
- unusual angular patterns
- rare multi-planet configurations

Then it gives that date a **rarity score**.

Instead of only saying *"Here were the planets,"* it can say:

> *"Your selected date featured a relatively rare five-body clustering with low angular spread"*
> *"This planetary arrangement is common compared to the past 100 years"*

### What Counts as an Alignment

Alignment rules are defined mathematically, for example:

- planets are "aligned" if their angular spread from the Sun is below some threshold
- several planets fall within a certain arc range
- apparent positions cluster closely from Earth's perspective

Multiple definitions can be explored:

- heliocentric alignment
- geocentric apparent alignment
- clustering score
- line-like score
- dispersion metric

### Rarity Score

CelestiML scans a large date range (e.g. last 100 years, last 500 years, or a configurable window), computes alignment metrics for each date, then compares the user's chosen date to the full distribution — assigning a **rarity percentile**.

Examples:
- *"Rarer than 92% of dates in the last century"*
- *"This was a fairly typical planetary spread"*
- *"This date featured an unusually tight inner-planet grouping"*

---

## The Full Identity of the Product

### Public-Facing Identity

> An interactive 3D astronomy tool that lets you explore how the planets were arranged on any date and discover how rare that arrangement was.

### Technical Identity

> A hybrid scientific computing and machine learning project that combines ephemeris-based celestial simulation, neural orbit approximation, and statistical alignment analysis in an interactive visualization system.

The second framing is the one that makes it elite.

---

## Main Feature Set

### 1. Date-Based Sky Explorer
- User inputs date, time, optional location
- Output: 3D planetary positions, labeled planets, animated orbits, selectable viewpoints

### 2. ML vs Physics Comparison Toggle
- Flip between actual computed positions and neural predicted positions
- Optional: show both at once, draw offset lines between real and predicted, display average positional error

### 3. Alignment Analysis Engine
- Detects notable alignments on the chosen date
- Reports tightness of grouping, planets involved, and configuration type

### 4. Rarity Score and Percentile
- Labels the date as common, uncommon, rare, or extremely rare
- Backed by a percentile or z-score

### 5. Time Scrubber
- Slider to move through time and watch planets shift
- Demonstrates orbital periods, motion differences, and why alignments are rare

### 6. Planet Detail Cards
- Click a planet for: name, orbital period, distance, coordinates, and angular relation to others

### 7. "Birthday Report" Mode
- Generates a polished summary for casual users:
  - which planets were most clustered
  - whether the date was rare
  - closest body to some axis or viewpoint
  - comparison to nearby dates

---

## Research Angle

### Main Research Question

> Can machine learning accurately approximate planetary positions over time, and can statistical alignment metrics identify rare celestial configurations in a meaningful way?

---

### Research Direction A: ML Orbit Approximation

**Testing:**
- How well a neural network predicts planet positions from timestamp input
- How error changes over short and long timespans
- Whether some planets are easier to learn than others
- Behavioral differences between inner and outer planets

**Possible Findings:**
- Inner planets may need better modeling due to faster motion
- Outer planets may be easier in some windows but harder over long horizons
- Neural models may approximate patterns well but drift slightly on exact positioning

---

### Research Direction B: Alignment Rarity Modeling

**Testing:**
- How to define alignment mathematically
- Whether some scoring methods are more meaningful than others
- How often "rare" alignments actually occur
- How stable rarity scores are across different windows and definitions

**Possible Findings:**
- Some definitions overcount alignments; others are too strict
- Cluster-based scoring may be more intuitive than line-based scoring
- Rarity depends heavily on reference frame
