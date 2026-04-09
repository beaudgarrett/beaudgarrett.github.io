# gAIn — ML-Based Hypertrophy Optimization System

## What It Is

A machine-learning-based system that analyzes resistance training variables and predicts hypertrophy outcome scores — muscle-growth likelihood based on how you actually train.

Instead of saying *"here's a workout plan,"* it says:

> *"Given this training style, this volume, this frequency, and this intensity, the model predicts better or worse hypertrophy outcomes."*

That makes it feel like research.

---

## Core Concept

Model the relationship between training inputs and a hypertrophy output target.

**Inputs (features)**

| Category | Variables |
|---|---|
| Training | Muscle group, weekly sets, reps per set, average rep range, frequency per week, average load / RPE, exercise type (compound vs. isolation), rest time |
| Recovery / Body | Body weight, training age, sleep estimate, calorie state, protein intake |

**Outputs**

- Predicted hypertrophy score (0–100)
- Expected growth category: Low / Moderate / High
- Suggested weekly volume range
- Warnings for junk volume or undertraining

---

## Research Question

> *Can machine learning predict hypertrophy-related outcomes from resistance training variables better than simple heuristic-based training rules?*

---

## Why It's ML-Friendly

Hypertrophy is **not purely linear**, which gives ML something real to learn:

- More sets are not always better
- Frequency interacts with volume in non-obvious ways
- Recovery changes effective training dose
- Advanced lifters respond differently than beginners

A rules-based formula can't capture these interactions. ML can.

---

## ML Approach

**Start simple with tabular models:**

1. Linear Regression
2. Random Forest
3. Gradient Boosting / XGBoost

**The core experiment: Baseline vs. ML**

| Baseline (heuristic) | ML Model |
|---|---|
| Moderate-to-high volume → good | Learns patterns from data |
| ~2x frequency per muscle → good | Captures nonlinear interactions |
| Too little or too much volume → bad | Improves with more data |

Comparing these two is what makes it a research experiment, not just a calculator.

---

## Data Strategy

**Option 1 — Synthetic Dataset (MVP)**
Generate realistic training examples using established hypertrophy principles:
- Low sets → lower score
- Moderate volume → higher score
- Excessive volume → tapering returns
- Recovery and nutrition influence growth likelihood

**Option 2 — Real-World Data (Later)**
Workout logs, survey-style inputs, or public training datasets.

Synthetic is enough to build and validate the system.

---

## Output Design

**First version: Classification**

Predict one of three categories:
- 🔴 Low hypertrophy potential
- 🟡 Moderate hypertrophy potential
- 🟢 High hypertrophy potential

Plus natural language suggestions:
- *"You may benefit from more weekly volume."*
- *"Your frequency is likely too low."*
- *"Intensity looks good but volume may be excessive."*

**Later version: Regression**
Predict a continuous hypertrophy score (0–100) for finer granularity.

---

## Product Vision

### User Flow

1. User selects: muscle group, weekly sets, rep range, frequency, intensity, recovery level, calorie state
2. Clicks **Predict Growth Potential**
3. Model returns:
   - Hypertrophy score + category
   - Optimization suggestions
   - Chart showing where their volume falls relative to optimal range

### Killer Feature
A **live volume slider** — the user drags weekly sets up or down and watches the predicted hypertrophy score update in real time.

---

## MVP Scope

**Research side**
- [ ] Create synthetic dataset
- [ ] Define target score / labels
- [ ] Train 2–3 ML models
- [ ] Compare against heuristic baseline
- [ ] Visualize results

**Product side**
- [ ] Simple UI for entering training variables
- [ ] Model returns prediction + suggestions
- [ ] Volume optimization chart

---

## Research Framing

**Problem:** Hypertrophy recommendations are typically heuristic-based and generalized. Can a model learn more flexible relationships between training variables and likely hypertrophy outcomes?

**Method:** Generate a structured dataset of resistance training variables with outcome labels. Train ML models to predict hypertrophy effectiveness.

**Comparison:** ML models vs. simple heuristic scoring system.

**Evaluation:** Classification accuracy or regression error depending on output design.

**Expected finding:** ML captures nonlinear volume/frequency/recovery interactions that fixed rules cannot.

---

## Portfolio Description

> *Built an ML-based hypertrophy optimization system (gAIn) that models muscle-growth potential from training variables — including volume, frequency, intensity, and recovery — and compares learned predictions against heuristic baselines using Random Forest and Gradient Boosting classifiers.*

**Project title:** gAIn — Machine Learning for Hypertrophy Optimization

**Research title:** Modeling Muscle Growth from Resistance Training Variables: An ML Approach to Hypertrophy Prediction
