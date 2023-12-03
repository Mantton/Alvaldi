"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

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
type Props = {
  artists: any[];
  selections: Set<number>;
  setSelections: (v: Set<number>) => void;
};
export function SelectArtistsComboBox<T extends Identifiable>({
  artists,
  selections,
  setSelections: setSelection,
}: Props) {
  const [open, setOpen] = React.useState(false);

  const addItem = (item: string) => {
    setSelection(new Set([...selections, parseInt(item)]));
    console.log(selections);
  };

  const removeItem = (item: string) => {
    const newSet = new Set(selections);
    newSet.delete(parseInt(item));
    setSelection(newSet);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="block w-full  justify-between"
        >
          <p>Select Artists</p>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full min-w-[var(--radix-popover-trigger-width)] p-0">
        <Command>
          <CommandInput placeholder="Search Artists..." />
          <CommandEmpty>None found.</CommandEmpty>
          <CommandGroup>
            {artists.map((item) => (
              <CommandItem
                key={item.id}
                value={item.id.toString()}
                onSelect={(currentValue) => {
                  selections.has(parseInt(currentValue))
                    ? removeItem(currentValue)
                    : addItem(currentValue);
                }}
                className="h-12 w-full"
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    selections.has(item.id) ? "opacity-100" : "opacity-0"
                  )}
                />
                <div className="flex gap-2 items-center">
                  <div className="h-8 w-8 bg-slate-200 rounded-full"></div>
                  <p>{item.name}</p>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
