"use client";

import { Check } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface FacetSelectorProps {
  title: string;
  options: string[];
  selected: string[];
  onToggle: (value: string) => void;
}

export function FacetSelector({
  title,
  options,
  selected,
  onToggle,
}: FacetSelectorProps) {
  const selectedSet = new Set(selected);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">{title}</h3>
        {selected.length > 0 && (
          <Badge variant="secondary" className="text-xs">
            {selected.length} selected
          </Badge>
        )}
      </div>
      <Command className="rounded-lg border">
        <CommandInput placeholder={`Search ${title.toLowerCase()}...`} />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup>
            {options.map((option) => {
              const isSelected = selectedSet.has(option);
              return (
                <CommandItem
                  key={option}
                  value={option}
                  onSelect={() => onToggle(option)}
                  className="cursor-pointer"
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
                  <span className="text-sm truncate">{option}</span>
                </CommandItem>
              );
            })}
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  );
}

