"use client";
import { Form, Input } from ".";
import { statusSchema } from "@/constants/schemas";
import { useParams } from "next/navigation";
import { closeModal } from "../modal";
import { z } from "zod";
import { LoadingButton } from "../button/loading";
import { Status } from "@/type";
import { useState } from "react";
import { useBoardStore } from "@/app/_store/board";
import { addProjectStatus, updateProject } from "@/lib/actions/project.actions";
import { GradientPicker } from "./provider/color-picker";
import { toast } from "../ui/use-toast";
import { useStore } from "zustand";
import { IconPicker } from "./provider/icon-picker";

interface Props {
  status?: Status;
}

export const StatusForm = ({ status }: Props) => {
  const statuses = useStore(useBoardStore, (state) => state.columns);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const { setColumns } = useBoardStore();

  const defaultValues = {
    name: status?.name || "",
    color: status?.color || "",
  };

  const handleSubmit = async (values: z.infer<typeof statusSchema>) => {
    try {
      setLoading(true);
      let updatedStatuses;
      const existingStatusIndex = statuses.findIndex(
        (s) => s.name === (status ? status.name : values.name)
      );
      if (existingStatusIndex > -1) {
        statuses[existingStatusIndex] = {
          ...statuses[existingStatusIndex],
          ...values,
        };
        await updateProject(id as string, {
          statuses,
        });
        updatedStatuses = statuses;
      } else {
        updatedStatuses = await addProjectStatus(id as string, values);
      }
      setColumns(updatedStatuses);
      toast({
        title: "Success",
        description: status
          ? "Status updated successfully"
          : "Status created successfully",
        duration: 3000,
      });
      closeModal();
    } catch (error) {
      toast({
        title: "Error",
        description: "Error processing status",
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      schema={statusSchema}
      defaultValues={defaultValues}
      onSubmit={handleSubmit}
      className="gap-4 flex flex-col"
    >
      <div className="flex flex-col gap-4">
        <Input type="text" name="name" label="Status Name" className="w-full" />
        <GradientPicker name="color" label="Color" />
      </div>
      <LoadingButton loading={loading} type="submit" className="mx-auto">
        {status ? "Update Status" : "Create Status"}
      </LoadingButton>
    </Form>
  );
};
