"use client";

import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatGdprTag } from "@/lib/format-gdpr-tag";

interface SelectedFiltersProps {
  selected: string[];
  onRemove: (tag: string) => void;
  onClearAll: () => void;
}

export function SelectedFilters({
  selected,
  onRemove,
  onClearAll,
}: SelectedFiltersProps) {
  if (selected.length === 0) {
    return null;
  }

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center gap-2">
        {selected.map((tag) => {
          const { display, raw } = formatGdprTag(tag);

          return (
            <Badge
              key={tag}
              variant="secondary"
              className="gap-1 bg-primary/10 text-primary hover:bg-primary/20 pr-1 max-w-[240px]"
            >
              <span className="truncate" title={raw}>
                {display}
              </span>
              <button
                type="button"
                onClick={() => onRemove(tag)}
                className="ml-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-sm hover:bg-primary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label={`Remove ${display} filter`}
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </Badge>
          );
        })}
        {selected.length >= 2 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearAll}
            className="h-7 px-2 text-xs text-muted-foreground hover:text-foreground"
          >
            Clear all
          </Button>
        )}
      </div>
    </div>
  );
}

