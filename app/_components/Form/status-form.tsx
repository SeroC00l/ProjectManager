"use client";
import { Form } from ".";
import { Input } from "./input";
import { statusSchema } from "@/constants/schemas";
import { useParams } from "next/navigation";
import { closeModal } from "../Modal";
import { z } from "zod";
import { LoadingButton } from "../Button/loading-button";
import { Status } from "@/type";
import { useState } from "react";
import { useBoardStore } from "@/app/_store/store";
import useStore from "@/app/_store/useStore";
import { addProjectStatus } from "@/lib/actions/project.actions";

interface Props {
  status?: Status;
}

export const StatusForm = ({ status }: Props) => {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const { setColumns } = useBoardStore();
  const columns = useStore(useBoardStore, (state) => state.columns);

  const defaultValues = {
    name: status?.name || "",
    color: status?.color || "",
  };

  const handleSubmit = async (values: z.infer<typeof statusSchema>) => {
    setLoading(true);
    const statuses = await addProjectStatus(id as string, values);
    if (!statuses) return;
    setColumns(statuses);
    setLoading(false);
    closeModal();
  };

  return (
    <Form
      schema={statusSchema}
      defaultValues={defaultValues}
      onSubmit={handleSubmit}
      className="gap-4 flex flex-col"
    >
      <div className="flex gap-4">
        <Input type="text" name="name" label="Status Name" className="w-4/6" />
        <Input type="color" name="color" label="Color" className="w-1/6" />
      </div>
      <LoadingButton
        loading={loading}
        type="submit"
        className="text-secondary-foreground mx-auto"
      >
        {status ? "Update Status" : "Create Status"}
      </LoadingButton>
    </Form>
  );
};
