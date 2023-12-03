"use client";

import * as React from "react";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type Identifiable = {
  id: number;
};
type Props<T extends Identifiable> = {
  title: string;
  items: T[];
  onSelectionChanged: (selections: number[]) => void;
  cell: (item: T) => React.ReactNode;
  disabled?: boolean;
};

export function MultiSelectComboBox<T extends Identifiable>({
  title,
  items,
  onSelectionChanged,
  cell,
  disabled,
}: Props<T>) {
  const [open, setOpen] = React.useState(false);
  const [selections, setSelections] = React.useState<number[]>([]);

  const toggleSelection = (item: string) => {
    const id = parseInt(item);
    let updated: number[];
    if (selections.includes(id)) {
      updated = selections.filter((v) => v !== id);
    } else {
      updated = [...selections, id];
    }

    onSelectionChanged(updated);
    setSelections(updated);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="block w-full  justify-between"
          disabled={disabled}
        >
          <p>Select {title}</p>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full min-w-[var(--radix-popover-trigger-width)] p-0">
        <Command>
          <CommandInput placeholder={`Search ${title}...`} />
          <CommandEmpty>None found.</CommandEmpty>
          <CommandGroup>
            {items.map((item) => (
              <CommandItem
                key={item.id}
                value={item.id.toString()}
                onSelect={toggleSelection}
                className="h-12 w-full"
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    selections.includes(item.id) ? "opacity-100" : "opacity-0"
                  )}
                />

                {cell(item)}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
