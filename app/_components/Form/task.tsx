"use client";

import { Form } from ".";
import { Input } from "./input";
import { LoadingButton } from "../Button/loading-button";
import { Status, Task } from "@/type";
import { useTaskForm } from "@/app/_hooks/use-task-form";
import { useParams } from "next/navigation";
import { Select } from "./select";
import { useEffect, useState } from "react";
import { getProjectStatuses } from "@/lib/actions/project.actions";
import { taskSchema } from "@/constants/schemas";

interface Props {
  task?: Task;
}

export default function TaskForm({ task }: Props) {
  const { loading, onSubmit } = useTaskForm(task);
  const { id } = useParams();
  const [statusOptions, setStatusOptions] = useState<Status[]>([]);

  useEffect(() => {
    getProjectStatuses(id.toString()).then((statuses) => {
      setStatusOptions(statuses);
    });
  }, [id]);

  const defaultValues = {
    id: task?.id,
    name: task?.name || "",
    description: task?.description || "",
    status: task?.status || statusOptions[0],
    labels: task?.labels || null,
    subtasks: task?.subtasks || null,
    metadata: task?.metadata || null,
    createdAt: task?.createdAt || new Date(),
    updatedAt: task?.updatedAt || new Date(),
    projectId: task?.projectId || id.toString(),
    assignedTo: task?.assignedTo || null,
  };

  return (
    <Form
      schema={taskSchema}
      onSubmit={onSubmit}
      defaultValues={defaultValues}
      className="gap-4 flex flex-col"
    >
      <Input name="name" label="Task Title" />
      <Input name="description" label="Task Description" />
      <Select
        className="w-1/2"
        name="status"
        label="Task Status"
        options={statusOptions}
      />
      <LoadingButton
        loading={loading}
        type="submit"
        className="dark:text-primary-foreground"
      >
        {task ? "Update Task" : "Create Task"}
      </LoadingButton>
    </Form>
  );
}
