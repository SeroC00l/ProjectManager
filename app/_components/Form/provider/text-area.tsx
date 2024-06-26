import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form";
import { Textarea as CnTextarea } from "@/app/_components/ui/textarea";

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
          <CnTextarea {...field} {...props} />
          <FormMessage className="form-message" />
        </FormItem>
      )}
    />
  );
};
