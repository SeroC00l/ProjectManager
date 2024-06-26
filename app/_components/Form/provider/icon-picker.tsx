import React, { useMemo, useState } from "react";
import { Button } from "@/app/_components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/_components/ui/popover";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/_components/ui/tabs";
import { cn } from "@/lib/utils";
import { FaPaintBrush } from "react-icons/fa";
import * as Icons from "react-icons/fa";
import { FormField, FormItem, FormLabel, FormMessage } from "../../ui/form";
import { useFormContext } from "react-hook-form";
import { ScrollArea, ScrollBar } from "../../ui/scroll-area";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/app/_components/ui/command";

interface Props {
  name: string;
  label: string;
  className?: string;
}

type IconComponent = React.ComponentType;
type IconKeys = keyof typeof Icons;

export function IconPicker({ name, label, className }: Props) {
  const form = useFormContext();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const iconEntries = useMemo(() => {
    return Object.entries(Icons).filter(
      ([key, component]) =>
        typeof component === "function" &&
        key.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const allIcons = useMemo(() => {
    return iconEntries.map(([key]) => key.replace(/^Fa/, ""));
  }, [iconEntries]);

  console.log(allIcons);
  

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("flex flex-col justify-end gap-2", className)}>
          <FormLabel>{label}</FormLabel>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[220px] justify-start text-left font-normal",
                  !field.value && "text-muted-foreground",
                  className
                )}
              >
                <div className="w-full flex items-center gap-2">
                  {field.value ? (
                    <div className="h-4 w-4">
                      {Icons[field.value as IconKeys] &&
                        React.createElement(
                          Icons[field.value as IconKeys] as IconComponent
                        )}
                    </div>
                  ) : (
                    <FaPaintBrush className="h-4 w-4" />
                  )}
                  <div className="truncate flex-1">
                    {field.value ? field.value : "Pick an icon"}
                  </div>
                </div>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64">
              <Tabs className="w-full">
                <TabsList className="w-full mb-4">
                  <TabsTrigger className="flex-1" value="icons">
                    Icons
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="icons" className="mt-0">
                  <Command>
                    <CommandInput
                      placeholder="Search icons"
                      value={search}
                      onValueChange={setSearch}
                    />
                    <CommandList>
                      <CommandGroup>
                        <div className="flex flex-wrap gap-1">
                          {allIcons.map(([key], index) => (
                            <CommandItem
                              key={index}
                              className="rounded-md p-2 cursor-pointer active:scale-105"
                              onSelect={() => {
                                field.onChange(key);
                                setOpen(false);
                              }}
                            >
                              {React.createElement(Icons[key as IconKeys])}
                            </CommandItem>
                          ))}
                        </div>
                      </CommandGroup>
                      <CommandEmpty>No icons found</CommandEmpty>
                    </CommandList>
                  </Command>
                </TabsContent>
              </Tabs>
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
