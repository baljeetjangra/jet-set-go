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
import { Location } from "@/interfaces/flight";
import { FieldValues, useFormContext } from "react-hook-form";

export default function FlightInput({
  placeholder,
  locations,
  name,
}: {
  placeholder: string;
  locations: Location[];
  name: string;
}) {
  const {
    watch,
    formState: { errors },
    setValue,
  } = useFormContext<FieldValues>();
  const [open, setOpen] = React.useState(false);
  const value = watch(name);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={`w-[300px] justify-between rounded-full ${
            errors[name] ? "border-red-500" : ""
          }`}
        >
          {value
            ? locations.find((loc: Location) => loc.value === value)?.label
            : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder={placeholder} />

          <CommandEmpty>No location found.</CommandEmpty>
          <CommandGroup>
            {locations.map((loc) => (
              <CommandItem
                key={loc.value}
                value={loc.value}
                onSelect={(currentValue) => {
                  setValue(name, currentValue === value ? "" : currentValue);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === loc.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {loc.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
