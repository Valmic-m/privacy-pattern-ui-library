"use client";

import { Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { FacetSelector } from "@/components/facet-selector";
import type { FilterState, CatalogIndexes } from "@/types/catalog";

interface FilterSheetProps {
  filters: FilterState;
  indexes: CatalogIndexes;
  onFilterChange: (filters: FilterState) => void;
  onClearFilters: () => void;
  activeFilterCount: number;
}

export function FilterSheet({
  filters,
  indexes,
  onFilterChange,
  onClearFilters,
  activeFilterCount,
}: FilterSheetProps) {
  const handleToggle = (
    facet: "gdprTags" | "uiEvidenceTags" | "heuristics",
    value: string
  ) => {
    const current = filters[facet];
    const next = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    onFilterChange({ ...filters, [facet]: next });
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          Filters
          {activeFilterCount > 0 && (
            <span className="ml-1 rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
              {activeFilterCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Filter Patterns</SheetTitle>
          <SheetDescription>
            Select filters to narrow down the patterns. Matches must include ALL
            selected items within each category.
          </SheetDescription>
        </SheetHeader>
        <div className="mt-4">
          {activeFilterCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              className="mb-4 gap-2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
              Clear all filters
            </Button>
          )}
          <ScrollArea className="h-[calc(100vh-200px)] pr-4">
            <div className="space-y-6">
              <FacetSelector
                title="GDPR Tags"
                options={indexes.gdprTags}
                selected={filters.gdprTags}
                onToggle={(v) => handleToggle("gdprTags", v)}
              />
              <Separator />
              <FacetSelector
                title="UI Evidence Tags"
                options={indexes.uiEvidenceTags}
                selected={filters.uiEvidenceTags}
                onToggle={(v) => handleToggle("uiEvidenceTags", v)}
              />
              <Separator />
              <FacetSelector
                title="Heuristics"
                options={indexes.heuristics}
                selected={filters.heuristics}
                onToggle={(v) => handleToggle("heuristics", v)}
              />
            </div>
          </ScrollArea>
        </div>
      </SheetContent>
    </Sheet>
  );
}

