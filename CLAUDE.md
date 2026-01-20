# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Privacy UI Patterns Library - A Next.js static site showcasing 7 GDPR-aligned privacy UI design patterns with real-world examples, evidence citations, and interactive filtering. Built for a 2026 thesis project.

## Commands

```bash
npm run dev        # Start development server at localhost:3000
npm run build      # Build static export (outputs to out/)
npm run lint       # Run ESLint via Next.js
npm run typecheck  # Run TypeScript type checking (tsc --noEmit)
```

No test framework is configured.

## Architecture

### Data Layer
- **`src/data/catalog.json`**: Single source of truth for all patterns and examples (1356 lines)
- **`src/lib/catalog.ts`**: Zod schemas for runtime validation, catalog loader, and filter logic
- **`src/types/catalog.ts`**: TypeScript types with branded ID types (`PatternId` = `pat-XXX`, `ExampleId` = `ex-XXX`)

Pattern IDs follow the format `pat-001` through `pat-007`. Example IDs follow `ex-001` through `ex-026`.

### Component Architecture
- **App Router** (`src/app/`): Next.js 15 App Router with static export (`output: "export"`)
- **`src/components/patterns-gallery.tsx`**: Main client component handling all filtering logic with localStorage persistence
- **`src/components/ui/`**: Radix UI primitives styled with Tailwind (shadcn/ui pattern)

### Filtering System
Filters are applied with AND semantics - all selected tags must match. Filter state persists to localStorage automatically. The filter logic lives in `applyFilters()` in `src/lib/catalog.ts`.

### Styling
Tailwind CSS 4.0 using `@theme inline` syntax in `globals.css`. The `cn()` utility in `src/lib/utils.ts` merges Tailwind classes with conflict resolution.

## Key Patterns

- All catalog data changes go through `src/data/catalog.json` and must conform to Zod schemas in `src/lib/catalog.ts`
- Components use Radix UI primitives for accessibility
- Static export means no server-side features - all interactivity is client-side
- URLs use trailing slashes (configured in `next.config.ts`)
