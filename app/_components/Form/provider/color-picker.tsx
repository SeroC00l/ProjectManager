import { useEffect, useMemo, useState } from "react";
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
import { Paintbrush, Plus, X } from "lucide-react";
import axios from "axios";
import { FormField, FormItem, FormLabel, FormMessage } from "../../ui/form";
import { useFormContext } from "react-hook-form";
import { ScrollArea, ScrollBar } from "../../ui/scroll-area";
import colors from "@/public/assets/colors.json";
import Colorful from "@uiw/react-color-colorful";

interface Props {
  name: string;
  label: string;
  className?: string;
}

export function GradientPicker({ name, label, className }: Props) {
  const form = useFormContext();
  const [open, setOpen] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [solids, setSolids] = useState<string[]>([]);
  const [gradients, setGradients] = useState<string[]>([]);
  const [color, setColor] = useState("#000000");

  useEffect(() => {
    const colorValues = Object.values(colors).flatMap((color: any) =>
      Object.values(color)
    );
    setSolids(colorValues as string[]);
  }, []);

  useEffect(() => {
    async function fetchGradients() {
      try {
        const response = await axios.get(
          "https://raw.githubusercontent.com/ghosh/uiGradients/master/gradients.json"
        );
        setGradients(
          response.data.map(
            (gradient: any) =>
              `linear-gradient(to top left, ${gradient.colors.join(", ")})`
          )
        );
      } catch (error) {
        console.error("Error fetching gradients:", error);
      }
    }
    fetchGradients();
  }, []);

  const defaultTab = useMemo(() => {
    const color = form.getValues(name);
    if (color.includes("gradient")) return "gradient";
    return "solid";
  }, [form, name]);

  const handleColorChange = (newColor: { hex: string }) => {
    setColor(newColor.hex);
    form.setValue(name, newColor.hex);
  };

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
                    <div
                      className="h-4 w-4 rounded !bg-center !bg-cover transition-all"
                      style={{ background: field.value }}
                    ></div>
                  ) : (
                    <Paintbrush className="h-4 w-4" />
                  )}
                  <div className="truncate flex-1">
                    {field.value ? field.value : "Pick a color"}
                  </div>
                </div>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64">
              <Tabs defaultValue={defaultTab} className="w-full">
                <TabsList className="w-full mb-4">
                  <TabsTrigger className="flex-1" value="solid">
                    Solid
                  </TabsTrigger>
                  <TabsTrigger className="flex-1" value="gradient">
                    Gradient
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="solid" className="mt-0">
                  <ScrollArea className="h-[200px] w-full z-20 ">
                    <div className="flex flex-wrap gap-1">
                      {solids.map((color, index) => (
                        <div
                          key={index}
                          style={{ background: color }}
                          className="rounded-md h-6 w-6 cursor-pointer active:scale-105"
                          onClick={() => {
                            field.onChange(color);
                            setOpen(false);
                          }}
                        />
                      ))}
                      <div className="relative">
                        <Popover
                          open={showColorPicker}
                          onOpenChange={setShowColorPicker}
                        >
                          <PopoverContent className="flex flex-col w-fit p-3 items-end">
                            <div className="flex w-full justify-between mb-3 items-center">
                              <h2>Color Picker</h2>
                              <X
                                className="cursor-pointer size-4"
                                onClick={() => setShowColorPicker(false)}
                              />
                            </div>
                            <Colorful
                              color={color}
                              disableAlpha
                              onChange={handleColorChange}
                            />
                          </PopoverContent>
                          <PopoverTrigger className="size-6">
                            <Plus />
                          </PopoverTrigger>
                        </Popover>
                      </div>
                    </div>
                    <ScrollBar orientation="vertical" />
                  </ScrollArea>
                </TabsContent>

                <TabsContent value="gradient" className="mt-0">
                  <ScrollArea className="h-[200px] w-full ">
                    <div className="flex flex-wrap gap-1 mb-2">
                      {gradients.map((color, index) => (
                        <div
                          key={index}
                          style={{ background: color }}
                          className="rounded-md h-6 w-6 cursor-pointer active:scale-105"
                          onClick={() => {
                            field.onChange(color);
                            setOpen(false);
                          }}
                        />
                      ))}
                    </div>
                  </ScrollArea>
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
