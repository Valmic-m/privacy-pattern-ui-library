"use client";

import { useState, useMemo, useEffect } from "react";
import { X } from "lucide-react";
import type { FilterState, Pattern } from "@/types/catalog";
import { loadCatalog, createEmptyFilterState } from "@/lib/catalog";
import { buildTagCounts, parseGdprTag } from "@/lib/gdpr";
import { PatternCard } from "@/components/pattern-card";
import { GdprBrowsePanel } from "@/components/gdpr-browse-panel";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// ============================================================================
// LocalStorage Persistence
// ============================================================================

const STORAGE_KEY = "privacy-ui-patterns.filters.v1";

interface StoredFilters {
  selectedTags: string[];
  patternSearchQuery: string;
}

function loadStoredFilters(): StoredFilters | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored) as StoredFilters;
    }
  } catch {
    // Ignore parse errors
  }
  return null;
}

function saveStoredFilters(filters: StoredFilters): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filters));
  } catch {
    // Ignore storage errors
  }
}

function clearStoredFilters(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore errors
  }
}

// ============================================================================
// PatternsGallery Component
// ============================================================================

export function PatternsGallery() {
  const [gdprTags, setGdprTags] = useState<string[]>([]);
  const [patternSearch, setPatternSearch] = useState("");
  const [restoredFromStorage, setRestoredFromStorage] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load catalog once (client-side, validated with Zod)
  const catalogAccess = useMemo(() => loadCatalog(), []);

  // Build filter state
  const filterState: FilterState = useMemo(
    () => ({
      ...createEmptyFilterState(),
      gdprTags,
      searchQuery: patternSearch,
    }),
    [gdprTags, patternSearch]
  );

  // Apply filters reactively
  const { patterns } = useMemo(
    () => catalogAccess.applyFilters(filterState),
    [catalogAccess, filterState]
  );

  // Compute tag counts from filtered patterns (dynamic counts)
  const tagCounts = useMemo(
    () => buildTagCounts(patterns),
    [patterns]
  );

  // Restore from localStorage on mount
  useEffect(() => {
    const stored = loadStoredFilters();
    if (stored) {
      if (stored.selectedTags.length > 0 || stored.patternSearchQuery) {
        setGdprTags(stored.selectedTags);
        setPatternSearch(stored.patternSearchQuery);
        setRestoredFromStorage(true);
      }
    }
    setIsHydrated(true);
  }, []);

  // Save to localStorage when filters change (after hydration)
  useEffect(() => {
    if (!isHydrated) return;
    if (gdprTags.length > 0 || patternSearch) {
      saveStoredFilters({
        selectedTags: gdprTags,
        patternSearchQuery: patternSearch,
      });
    } else {
      clearStoredFilters();
    }
  }, [gdprTags, patternSearch, isHydrated]);

  const handleToggleTag = (tag: string) => {
    setGdprTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
    setRestoredFromStorage(false);
  };

  const handleSetTags = (tags: string[]) => {
    setGdprTags(tags);
    setRestoredFromStorage(false);
  };

  const handleRemoveTag = (tag: string) => {
    setGdprTags((prev) => prev.filter((t) => t !== tag));
    setRestoredFromStorage(false);
  };

  const handleClearAll = () => {
    setGdprTags([]);
    setPatternSearch("");
    setRestoredFromStorage(false);
    clearStoredFilters();
  };

  const handleClearSession = () => {
    handleClearAll();
  };

  // Don't render with potentially stale state during SSR
  if (!isHydrated) {
    return (
      <div className="md:grid md:grid-cols-[360px_minmax(0,1fr)] md:gap-8">
        <div className="hidden md:block" />
        <div className="space-y-6">
          <div className="h-10 bg-muted/50 rounded animate-pulse" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="h-48 bg-muted/50 rounded-lg animate-pulse"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="md:grid md:grid-cols-[360px_minmax(0,1fr)] md:gap-8">
      {/* Left Panel: GDPR Browse (Desktop) */}
      <div className="hidden md:block md:sticky md:top-6 self-start">
        <GdprBrowsePanel
          tags={catalogAccess.catalog.indexes.gdprTags}
          selected={gdprTags}
          tagCounts={tagCounts}
          onToggle={handleToggleTag}
          onSetTags={handleSetTags}
          onClearAll={handleClearAll}
        />
      </div>

      {/* Left Panel: GDPR Browse (Mobile Accordion) */}
      <div className="md:hidden mb-6">
        <Accordion type="single" collapsible>
          <AccordionItem value="gdpr-browse" className="border rounded-lg">
            <AccordionTrigger className="px-4 hover:no-underline">
              <span className="font-semibold">Browse by GDPR</span>
              {gdprTags.length > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {gdprTags.length}
                </Badge>
              )}
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <GdprBrowsePanel
                tags={catalogAccess.catalog.indexes.gdprTags}
                selected={gdprTags}
                tagCounts={tagCounts}
                onToggle={handleToggleTag}
                onSetTags={handleSetTags}
                onClearAll={handleClearAll}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Right Panel: Results */}
      <div className="space-y-6">
        {/* Session Restoration Notice */}
        {restoredFromStorage && (gdprTags.length > 0 || patternSearch) && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 rounded-lg px-4 py-2">
            <span>Continuing from your last session</span>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 px-2 text-xs"
              onClick={handleClearSession}
            >
              Clear
            </Button>
          </div>
        )}

        {/* Results Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-sm font-medium">
              {patterns.length} {patterns.length === 1 ? "pattern" : "patterns"}
            </p>
            {gdprTags.length > 0 && (
              <p className="text-xs text-muted-foreground mt-0.5">
                Matches all selected expectations
              </p>
            )}
          </div>
          <Input
            type="search"
            placeholder="Search patterns"
            value={patternSearch}
            onChange={(e) => setPatternSearch(e.target.value)}
            className="w-full sm:w-64"
          />
        </div>

        {/* Pattern Grid or Empty State */}
        {patterns.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
            {patterns.map((pattern) => (
              <PatternCard
                key={pattern.id}
                pattern={pattern}
                selectedTags={gdprTags}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            selectedTags={gdprTags}
            onRemoveTag={handleRemoveTag}
            onClearAll={handleClearAll}
          />
        )}
      </div>
    </div>
  );
}

// ============================================================================
// Empty State Component
// ============================================================================

interface EmptyStateProps {
  selectedTags: string[];
  onRemoveTag: (tag: string) => void;
  onClearAll: () => void;
}

function EmptyState({ selectedTags, onRemoveTag, onClearAll }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-16 px-6 text-center">
      <p className="text-lg font-medium text-foreground">
        No patterns match this combination
      </p>
      <p className="mt-1 text-sm text-muted-foreground">
        Try removing one expectation, or clear all filters.
      </p>

      {selectedTags.length > 0 && (
        <div className="mt-6 space-y-4">
          <div className="flex flex-wrap justify-center gap-1.5">
            {selectedTags.map((tag) => {
              const { articleNumber, expectationLabel } = parseGdprTag(tag);
              const badgeLabel = articleNumber
                ? `Art. ${articleNumber} · ${expectationLabel}`
                : expectationLabel;

              return (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="gap-1 pr-1 cursor-pointer hover:bg-destructive/10"
                  onClick={() => onRemoveTag(tag)}
                >
                  <span className="truncate" title={tag}>
                    {badgeLabel}
                  </span>
                  <X className="h-3 w-3 ml-1" />
                </Badge>
              );
            })}
          </div>
          <Button variant="outline" size="sm" onClick={onClearAll}>
            Clear all filters
          </Button>
        </div>
      )}
    </div>
  );
}
