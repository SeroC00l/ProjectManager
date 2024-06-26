import React, { useState } from "react";
import { DatePicker, Form, Input } from ".";
import { Subtask, Task } from "@/type";
import { subtaskSchema } from "@/constants/schemas";
import { SelectStatus } from "./select/status";
import { endOfDay, isBefore } from "date-fns";
import { LoadingButton } from "../button/loading";
import { z } from "zod";
import { toast } from "../ui/use-toast";
import { updateTask } from "@/lib/actions/task.actions";
import { closeModal } from "../modal";
import { v4 } from "uuid";

interface Props {
  subtask?: Subtask;
  task: Task;
}

export const SubTaskForm = ({ subtask, task }: Props) => {
  const [loading, setLoading] = useState(false);

  const defaultValues = {
    id: subtask?.id || v4(),
    name: subtask?.name || "",
    description: subtask?.description || "",
    status: subtask?.status || null,
    labels: subtask?.labels || null,
    date: subtask?.date || "",
    metadata: subtask?.metadata || null,
    createdAt: subtask?.createdAt || new Date(),
    updatedAt: subtask?.updatedAt || new Date(),
    assignedTo: subtask?.assignedTo || null,
  };

  const handleSubmit = async (values: Subtask) => {
    setLoading(true);
    try {
      let updatedSubtasks = task.subtasks ? [...task.subtasks] : [];
      if (subtask) {
        const subtaskIndex = updatedSubtasks.findIndex(
          (st) => st.name === values?.name
        );
        if (subtaskIndex > -1) {
          updatedSubtasks[subtaskIndex] = { ...values };
        }
      } else {
        updatedSubtasks.push({ ...values });
      }
      await updateTask({ ...task, subtasks: updatedSubtasks });
      toast({
        title: "Success",
        description: `Subtask ${subtask ? "updated" : "created"} successfully`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: `There was an error ${
          subtask ? "updating" : "creating"
        } the subtask`,
      });
    } finally {
      closeModal();
      setLoading(false);
    }
  };

  return (
    <Form
      schema={subtaskSchema}
      onSubmit={handleSubmit}
      defaultValues={defaultValues}
      className="flex flex-col gap-4"
    >
      <Input name="name" label="Subtask Title" />
      <Input name="description" label="Subtask Description" />
      <div className="grid grid-cols-2 gap-4">
        <SelectStatus />
        <DatePicker
          name="date"
          label="Due date"
          disabled={(date) => isBefore(date, endOfDay(new Date()))}
        />
      </div>
      <LoadingButton loading={loading} type="submit">
        {subtask ? "Update Subtask" : "Create Subtask"}
      </LoadingButton>
    </Form>
  );
};
