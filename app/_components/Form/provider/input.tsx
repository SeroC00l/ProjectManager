import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form";
import { Input as CnInput } from "@/app/_components/ui/input";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  endButton?: React.ReactNode;
  className?: string;
}

export const Input = forwardRef<HTMLInputElement, Props>(
  ({ name, label, endButton, className, ...props }, ref) => {
    const form = useFormContext();
    return (
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem>
            {label && <FormLabel>{label}</FormLabel>}
            <div className="relative">
              <CnInput
                {...field}
                {...props}
                ref={ref}
                className={cn(endButton && "pr-16", className)}
              />
              {endButton}
            </div>
            <FormMessage className="form-message" />
          </FormItem>
        )}
      />
    );
  }
);
