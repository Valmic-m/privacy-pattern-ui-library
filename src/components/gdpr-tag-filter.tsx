"use client";

import { useState } from "react";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { formatGdprTag } from "@/lib/format-gdpr-tag";

interface GdprTagFilterProps {
  tags: string[];
  selected: string[];
  tagCounts: Map<string, number>;
  onToggle: (tag: string) => void;
}

export function GdprTagFilter({
  tags,
  selected,
  tagCounts,
  onToggle,
}: GdprTagFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectedSet = new Set(selected);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="space-y-2">
      <div className="flex items-center gap-2">
        <CollapsibleTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-between gap-2 font-normal"
          >
            <span className="flex items-center gap-2">
              {selected.length > 0 ? (
                <>
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                    {selected.length}
                  </span>
                  <span>
                    {selected.length === 1
                      ? "1 GDPR tag selected"
                      : `${selected.length} GDPR tags selected`}
                  </span>
                </>
              ) : (
                "Select GDPR tags to filter"
              )}
            </span>
            {isOpen ? (
              <ChevronUp className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            )}
          </Button>
        </CollapsibleTrigger>
      </div>

      <CollapsibleContent className="space-y-2">
        <p className="text-xs text-muted-foreground px-1">
          Matches all selected tags
        </p>
        <Command className="rounded-lg border">
          <CommandInput placeholder="Search GDPR tags..." />
          <CommandList className="max-h-[300px]">
            <CommandEmpty>No tags found.</CommandEmpty>
            <CommandGroup>
              {tags.map((tag) => {
                const isSelected = selectedSet.has(tag);
                const { display, raw } = formatGdprTag(tag);
                const count = tagCounts.get(tag) ?? 0;

                return (
                  <CommandItem
                    key={tag}
                    value={raw}
                    onSelect={() => onToggle(tag)}
                    className="cursor-pointer py-2"
                  >
                    <div
                      className={cn(
                        "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "opacity-50 [&_svg]:invisible"
                      )}
                    >
                      <Check className="h-3 w-3" />
                    </div>
                    <span
                      className="flex-1 truncate"
                      title={raw}
                    >
                      {display}
                    </span>
                    <span className="ml-2 text-xs text-muted-foreground tabular-nums">
                      ({count})
                    </span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </CollapsibleContent>
    </Collapsible>
  );
}

