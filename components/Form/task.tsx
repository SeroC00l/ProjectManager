"use client";
import { taskSchema } from "@/consts/schemas";
import { Form } from ".";
import { Input } from "./input";
import { LoadingButton } from "../Button/loading-button";
import { Task } from "@/type";
import { useTaskForm } from "@/hooks/use-task-form";
import { useParams } from "next/navigation";
import { Select } from "./select";
import { getTaskStatuses } from "@/lib/actions/task.actions";
import { useEffect, useState } from "react";


interface Props {
  task?: Task;
}

export default function TaskForm({ task }: Props) {
  const { loading, onSubmit } = useTaskForm(task);
  const { id } = useParams();
  const [statusOptions, setStatusOptions] = useState<any[]>([]);

  useEffect(() => {
    getTaskStatuses(id.toString()).then((statuses) => {
      setStatusOptions(statuses);
    });
  }, [id]);

  const defaultValues = {
    id: task?.id || "",
    name: task?.name || "",
    description: task?.description || "",
    status: task?.status || "",
    projectId: task?.projectId || id,
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
        className="text-secondary-foreground"
      >
        {task ? "Update Task" : "Create Task"}
      </LoadingButton>
    </Form>
  );
}
