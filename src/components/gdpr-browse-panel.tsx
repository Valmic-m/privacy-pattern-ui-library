"use client";

import { useMemo } from "react";
import { Check, X, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import {
  parseGdprTag,
  groupTagsByArticle,
  getExpectationOnlyLabel,
  getArticleTitle,
  getArticleUiTranslation,
  getArticleUrl,
  QUICK_START_PRESETS,
} from "@/lib/gdpr";

interface GdprBrowsePanelProps {
  tags: string[];
  selected: string[];
  tagCounts: Map<string, number>;
  onToggle: (tag: string) => void;
  onSetTags: (tags: string[]) => void;
  onClearAll: () => void;
}

export function GdprBrowsePanel({
  tags,
  selected,
  tagCounts,
  onToggle,
  onSetTags,
  onClearAll,
}: GdprBrowsePanelProps) {
  const selectedSet = new Set(selected);

  // Group tags by article
  const groupedTags = useMemo(() => groupTagsByArticle(tags), [tags]);

  // Derive active article from selection only
  const displayedArticle = useMemo(() => {
    if (selected.length > 0) {
      const lastTag = selected[selected.length - 1];
      const { articleNumber } = parseGdprTag(lastTag);
      return articleNumber || null;
    }
    return null;
  }, [selected]);

  const handleQuickStart = (tag: string) => {
    onSetTags([tag]);
  };

  const handleRemoveTag = (tag: string) => {
    onToggle(tag);
  };

  return (
    <Card className="h-fit">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Browse by GDPR</CardTitle>
        <p className="text-sm text-muted-foreground">
          Start with an article, then select expectations to narrow patterns.
          Matches all selected expectations.
        </p>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Quick Starts */}
        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Quick starts
          </p>
          <div className="flex flex-wrap gap-1.5">
            {QUICK_START_PRESETS.map((preset) => (
              <Button
                key={preset.tag}
                variant="secondary"
                size="sm"
                className="h-7 text-xs"
                onClick={() => handleQuickStart(preset.tag)}
              >
                {preset.label}
              </Button>
            ))}
          </div>
        </div>

        <Separator />

        {/* Expectation Selector Header */}
        <div className="flex items-center justify-between">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Expectation selector
          </p>
          {selected.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearAll}
              className="h-6 px-2 text-xs text-violet-600 hover:text-violet-700 dark:text-violet-400 dark:hover:text-violet-300"
            >
              Clear selection
            </Button>
          )}
        </div>

        {/* Expectation Selector */}
        <TooltipProvider delayDuration={300}>
          <Command className="rounded-lg border">
            <CommandInput placeholder="Search by GDPR expectations" />
            <CommandList className="max-h-[320px]">
              <CommandEmpty>No expectations found.</CommandEmpty>
              {[...groupedTags.entries()].map(([articleNumber, groupTags]) => (
                <CommandGroup
                  key={articleNumber}
                  heading={`Art. ${articleNumber} — ${getArticleTitle(articleNumber)}`}
                >
                  {groupTags.map((tag) => {
                    const isSelected = selectedSet.has(tag);
                    const label = getExpectationOnlyLabel(tag);
                    const count = tagCounts.get(tag) ?? 0;
                    const isDisabled = count === 0 && !isSelected;

                    const item = (
                      <CommandItem
                        key={tag}
                        value={tag}
                        onSelect={() => !isDisabled && onToggle(tag)}
                        disabled={isDisabled}
                        className={cn(
                          "py-2",
                          isDisabled
                            ? "cursor-not-allowed opacity-50"
                            : "cursor-pointer"
                        )}
                        aria-selected={isSelected}
                      >
                        <div
                          className={cn(
                            "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border",
                            isSelected
                              ? "border-primary bg-primary text-primary-foreground"
                              : "border-gray-600 dark:border-gray-400 [&_svg]:invisible"
                          )}
                        >
                          <Check className="h-3 w-3" />
                        </div>
                        <span className="flex-1 truncate" title={tag}>
                          {label}
                        </span>
                        <span className="ml-2 text-xs text-muted-foreground tabular-nums">
                          ({count})
                        </span>
                      </CommandItem>
                    );

                    if (isDisabled) {
                      return (
                        <Tooltip key={tag}>
                          <TooltipTrigger asChild>{item}</TooltipTrigger>
                          <TooltipContent side="right">
                            Clear filters to select
                          </TooltipContent>
                        </Tooltip>
                      );
                    }

                    return item;
                  })}
                </CommandGroup>
              ))}
            </CommandList>
          </Command>
        </TooltipProvider>

        {/* Article Summary Card */}
        <ArticleSummaryCard articleNumber={displayedArticle} />

        <Separator />

        {/* Selected Expectations */}
        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Selected expectations
          </p>

          {selected.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Select one or more expectations to narrow patterns.
            </p>
          ) : (
            <div className="space-y-2">
              <div className="flex flex-wrap gap-1.5">
                {selected.map((tag) => {
                  const { articleNumber, expectationLabel } = parseGdprTag(tag);
                  const badgeLabel = articleNumber
                    ? `Art. ${articleNumber} · ${expectationLabel}`
                    : expectationLabel;

                  return (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="gap-1 pr-1 max-w-full"
                    >
                      <span className="truncate" title={tag}>
                        {badgeLabel}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="ml-1 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-sm hover:bg-muted-foreground/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        aria-label={`Remove ${badgeLabel}`}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  );
                })}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClearAll}
                className="h-7 px-2 text-xs text-muted-foreground hover:text-foreground"
              >
                Clear all
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

// ============================================================================
// Article Summary Card (internal component)
// ============================================================================

interface ArticleSummaryCardProps {
  articleNumber: string | null;
}

function ArticleSummaryCard({ articleNumber }: ArticleSummaryCardProps) {
  if (!articleNumber) {
    return (
      <div className="rounded-lg border bg-muted/30 p-4">
        <p className="font-medium text-sm">Pick an article</p>
        <p className="text-sm text-muted-foreground mt-1">
          Select an expectation to see what the article means in UI terms.
        </p>
      </div>
    );
  }

  const title = getArticleTitle(articleNumber);
  const translation = getArticleUiTranslation(articleNumber);
  const url = getArticleUrl(articleNumber);

  return (
    <div className="rounded-lg border bg-muted/30 p-4 space-y-2">
      <p className="font-medium text-sm">
        Art. {articleNumber} — {title}
      </p>
      <p className="text-sm text-muted-foreground">{translation}</p>
      <Button variant="link" size="sm" className="h-auto p-0 text-xs" asChild>
        <a href={url} target="_blank" rel="noopener noreferrer">
          Open Art. {articleNumber}
          <ExternalLink className="ml-1 h-3 w-3" />
        </a>
      </Button>
    </div>
  );
}

