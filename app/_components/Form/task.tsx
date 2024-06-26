"use client";
import { Form, Input } from ".";
import { LoadingButton } from "../button/loading";
import { Task } from "@/type";
import { useTaskForm } from "@/app/_hooks/use-task-form";
import { useParams } from "next/navigation";
import { taskSchema } from "@/constants/schemas";
import { DatePicker } from "./provider/date-picker";
import { endOfDay, isBefore } from "date-fns";
import { SelectStatus } from "./select/status";

interface Props {
  task?: Task;
}

export default function TaskForm({ task }: Props) {
  const { loading, onSubmit } = useTaskForm(task);
  const { id } = useParams();

  const defaultValues = {
    id: task?.id,
    name: task?.name || "",
    description: task?.description || "",
    status: task?.status || null,
    labels: task?.labels || null,
    date: task?.date || "",
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
      <div className="grid grid-cols-2 gap-4">
        <SelectStatus />
        <DatePicker
          name="date"
          label="Due date"
          disabled={(date) => isBefore(date, endOfDay(new Date()))}
        />
      </div>

      <LoadingButton
        loading={loading}
        type="submit"
      >
        {task ? "Update Task" : "Create Task"}
      </LoadingButton>
    </Form>
  );
}
