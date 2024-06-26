import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form";
import {
  Select as CnSelect,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/app/_components/ui/select";

export interface SelectOption {
  value: any;
  label: string;
}

interface SelectProps {
  name: string;
  label: string;
  className?: string;
  options: SelectOption[];
}

export const Select = ({ name, label, options, className }: SelectProps) => {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>{label}</FormLabel>
          <CnSelect
            value={JSON.stringify(field.value)}
            onValueChange={(value) => {
              field.onChange(JSON.parse(value));
            }}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue>
                  {field.value
                    ? options.find((option) => option.value === field.value)
                        ?.label
                    : label}
                </SelectValue>
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectGroup>
                {options.map((option, i) => (
                  <SelectItem key={i} value={JSON.stringify(option.value)}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </CnSelect>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
