import { ReactNode } from "react";
import { Form as Formx } from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

interface Props {
  schema: any;
  onSubmit: (values: any) => void;
  children: ReactNode;
  defaultValues: any;
  className?: string;
}

export const Form = ({ schema, onSubmit, defaultValues, children, className }: Props) => {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  return (
    <Formx {...form}>
      <form className={`w-full ${className}`} onSubmit={form.handleSubmit(onSubmit)}>
        {children}
      </form>
    </Formx>
  );
};
