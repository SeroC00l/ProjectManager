"use client";
import { Form } from ".";
import { Input } from "./input";
import { statusSchema } from "@/consts/schemas";
import { useParams } from "next/navigation";
import { createTaskStatus } from "@/lib/actions/task.actions";
import { closeModal } from "../Modal";
import { z } from "zod";
import { LoadingButton } from "../Button/loading-button";
import { TaskStatus } from "@/type";
import { useState } from "react";
import { useBoardStore } from "@/app/_store/store";
import useStore from "@/app/_store/useStore";

interface Props {
  status?: TaskStatus;
}

export const StatusForm = ({ status }: Props) => {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const addColumn = useBoardStore((state) => state.addColumn);
  const columns = useStore(useBoardStore, (state) => state.columns);

  const initialValues = {
    name: status?.name || "",
    color: status?.color || "",
    projectId: id,
  };

  const handleSubmit = async (values: z.infer<typeof statusSchema>) => {
    setLoading(true);
    const newStatus = await createTaskStatus(values);
    if (!newStatus) return;
    addColumn(newStatus)
    setLoading(false);
    closeModal();
  };

  return (
    <Form
      schema={statusSchema}
      defaultValues={initialValues}
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
