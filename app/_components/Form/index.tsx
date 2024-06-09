import { createRef, forwardRef, ReactNode, useImperativeHandle } from "react";
import { Form as FormProvider } from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z, ZodSchema } from "zod";

interface Props {
  schema: ZodSchema;
  onSubmit: (values: any) => void;
  children: ReactNode;
  defaultValues: any;
  className?: string;
}

interface FormRef {
  reset: () => void;
}

export const Form = forwardRef<FormRef, Props>(
  ({ schema, onSubmit, defaultValues, children, className }: Props, ref) => {
    const form = useForm<z.infer<typeof schema>>({
      resolver: zodResolver(schema),
      defaultValues,
    });

    useImperativeHandle(formRef, () => ({
      reset: () => form.reset(),
    }));

    return (
      <FormProvider {...form}>
        <form
          className={`w-full ${className}`}
          onSubmit={form.handleSubmit(onSubmit)}
        >
          {children}
        </form>
      </FormProvider>
    );
  }
);
Form.displayName = "Form";
export const formRef = createRef<FormRef>();

export const resetForm = () => {
  formRef.current?.reset();
};
