"use client";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/app/_components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/_components/ui/popover";
import { useEffect, useState } from "react";
import { SelectOption } from "./select";
import { useFormContext } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormMessage } from "../../ui/form";
import { cn } from "@/lib/utils";

interface Props {
  open?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  options?: SelectOption[];
  triggerbutton: React.ReactNode;
  className?: string;
  placeholder?: string;
  commandEmpty: React.ReactNode;
  onSelect?: (value: any) => void;
  label?: string;
  name: string;
}

export const Combobox = ({
  onOpenChange,
  options,
  className,
  triggerbutton,
  placeholder,
  commandEmpty,
  label,
  name,
  onSelect,
  open: initialOpen = false,
}: Props) => {
  const [open, setOpen] = useState(initialOpen);

  const form = useFormContext();

  useEffect(() => {
    setOpen(initialOpen);
  }, [initialOpen]);

  useEffect(() => {
    onOpenChange?.(open);
  }, [open, onOpenChange]);

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("flex flex-col justify-end size-fit gap-2 p-0 m-0", className)}>
          {label && <FormLabel>{label}</FormLabel>}
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>{triggerbutton}</PopoverTrigger>
            <PopoverContent className="w-[250px] p-0">
              <Command>
                <CommandInput placeholder={placeholder} />
                <CommandList>
                  <CommandEmpty className="p-0">{commandEmpty}</CommandEmpty>
                  <CommandGroup data-no-dnd>
                    {options?.map((option) => (
                      <CommandItem
                        className="cursor-pointer"
                        key={option.value.id}
                        value={option.label}
                        onSelect={() => {
                          field.onChange(option.value);
                          onSelect?.(option.value);
                        }}
                      >
                        <span>{option.label}</span>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
