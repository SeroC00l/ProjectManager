import { createRef, forwardRef, ReactNode, useImperativeHandle } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z, ZodSchema } from "zod";

interface Props {
  schema: ZodSchema;
  onSubmit?: (values: any) => void;
  children: ReactNode;
  defaultValues: any;
  className?: string;
}

interface FormMethods  {
  reset: () => void;
  getValues: () => any;
  setValue: (name: string, value: any) => void;
  formState: any;
}

const Form = forwardRef<FormMethods, Props>(
  ({ schema, onSubmit, defaultValues, children, className }: Props, ref) => {
    const formMethods = useForm<z.infer<typeof schema>>({
      resolver: zodResolver(schema),
      defaultValues,
    });

    useImperativeHandle(formRef, () => ({
      reset: () => formMethods.reset(),
      getValues: () => formMethods.getValues(),
      setValue: (name, value) => formMethods.setValue(name, value),
      formState: formMethods.formState,
    }));

    return (
      <FormProvider {...formMethods}>
        <form
          className={className}
          onSubmit={formMethods.handleSubmit(onSubmit || (() => {}))}
        >
          {/* <>{JSON.stringify(formMethods.formState.errors)}</> */}
          {children}
        </form>
      </FormProvider>
    );
  }
);

Form.displayName = "Form";

// Create a reference for the form
const formRef = createRef<FormMethods>();

const resetForm = () => {
  formRef.current?.reset();
};

export { Form, formRef, resetForm };
