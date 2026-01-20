# Privacy UI Patterns Library

A catalog of 7 evidence-based privacy UI design patterns for GDPR compliance, developed as part of a 2026 thesis project. This library bridges the gap between regulatory requirements, academic research, and practical interface design.

## Research Foundations

This pattern library synthesizes insights from multiple research domains:

### Usability & Cognitive Science
- **Nielsen (1994, 1995)** — Usability heuristics providing foundational principles for interface evaluation
- **Sweller (1988, 2011)** — Cognitive load theory informing information presentation and progressive disclosure

### Choice Architecture & Behavioral Design
- **Thaler & Sunstein (2008)** — Nudge theory and choice architecture principles applied to consent interfaces
- **Cavoukian (2011)** — Privacy by Design framework establishing proactive privacy protection

### Privacy & Consent Research (SOUPS/CHI)
- **Kelley et al. (2009)** — Standardized privacy notice formats and layered disclosure effectiveness
- **Nouwens et al. (2020)** — Dark patterns in cookie consent interfaces and GDPR compliance
- **Utz et al. (2019)** — Informed consent at scale and privacy banner design

### Regulatory Guidance
- **EDPB** — European Data Protection Board guidelines on transparency and consent
- **ICO** — UK Information Commissioner's Office implementation guidance

## The 7 Patterns

| # | Pattern | Primary GDPR Articles |
|---|---------|----------------------|
| 1 | **Layered Privacy Notice** | Art. 12, 13, 14, 5 |
| 2 | **Just-in-Time Notice** | Art. 13, 12, 5, 7 |
| 3 | **Granular Consent Controls** | Art. 7, 5, 6 |
| 4 | **Equal Accept / Reject** | Art. 7, 12, 5 |
| 5 | **Preference Center** | Art. 7, 12, 15, 16, 17, 18, 20, 21 |
| 6 | **Privacy-Protective Defaults** | Art. 25, 7, 5 |
| 7 | **Consent Withdrawal Mechanism** | Art. 7, 21, 12 |

## Evidence Framework

Each pattern in the library includes:

- **Use Cases** — Contextual application scenarios backed by academic citations
- **Pitfalls** — Common implementation failures with documented risk levels
- **Observable UI Conditions** — 35 evidence tags describing verifiable interface characteristics
- **Design Heuristics** — Grounded in Nielsen's usability principles and cognitive load theory
- **Evaluative Questions** — Assessment criteria for pattern implementation quality

## GDPR Compliance Coverage

The library addresses 45 GDPR compliance tags spanning:

- **Art. 5** — Principles relating to processing (transparency, data minimization)
- **Art. 6** — Lawfulness of processing
- **Art. 7** — Conditions for consent
- **Art. 12** — Transparent information and communication
- **Art. 13, 14** — Information provision requirements
- **Art. 15–18, 20–21** — Data subject rights (access, rectification, erasure, restriction, portability, objection)
- **Art. 25** — Data protection by design and by default

## Getting Started

```bash
npm install
npm run dev
```

The development server runs at `localhost:3000`. This is a Next.js static site — all interactivity is client-side with no server dependencies.

## Technical Stack

- Next.js 15 (App Router, static export)
- TypeScript with Zod runtime validation
- Tailwind CSS 4.0
- Radix UI primitives for accessibility
