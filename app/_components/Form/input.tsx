import { FieldValues, SubmitHandler, useFormContext } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input as Inputx } from "../ui/input";
import { cn } from "@/lib/utils";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  endButton?: React.ReactNode
}

export const Input = ({ name, label, endButton, ...props }: Props) => {
  const form = useFormContext();
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <div className="relative">
            <Inputx
              {...field}
              {...props}
              className={cn(endButton && "pr-16", props.className)}
            />
            {endButton && endButton}
          </div>
          <FormMessage className="form-message" />
        </FormItem>
      )}
    />
  );
};
