import { useFormContext } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Select as Selectx,
} from "../ui/select";

interface Props {
  name: string;
  label: string;
  className?: string;
  options: any[];
}

export const Select = ({ name, label, options, className }: Props) => {
  const form = useFormContext();
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>{label}</FormLabel>
          <Selectx
            onValueChange={(value) => {
              const selectedOption = options.find((option) => option.name === value);
              field.onChange(selectedOption); 
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder={label} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {options.map((option) => (
                  <SelectItem key={option.name} value={option.name}>
                    {option.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Selectx>
          <FormMessage className="form-message" />
        </FormItem>
      )}
    />
  );
};
