import { useFormContext } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Textarea as Textareax } from "../ui/textarea";

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label?: string;
}
export const Textarea = ({ name, label, ...props }: Props) => {
  const form = useFormContext();
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <Textareax {...field} {...props}  />
          <FormMessage className="form-message" />
        </FormItem>
      )}
    />
  );
};
