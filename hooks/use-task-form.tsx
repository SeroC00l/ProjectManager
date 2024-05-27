"use client";
import { useState } from "react";
import { z } from "zod";
import { useToast } from "@/components/ui/use-toast";
import { Task } from "@/type";
import { closeModal } from "@/components/Modal";
import { createTask, updateTask } from "@/lib/actions/task.actions";
import { taskSchema } from "@/consts/schemas";

export const useTaskForm = (initialTask?: Task) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (values: z.infer<typeof taskSchema>) => {
    try {
      setLoading(true);
      if (initialTask) {
        const updatedTask = await updateTask(initialTask.id, values);

        toast({
          title: "Success",
          duration: 2000,
          description: "Task updated successfully",
        });
      } else {
        const newTask = await createTask(values);

        toast({
          title: "Success",
          duration: 2000,
          description: "Task created successfully",
        });
      }
      closeModal();
    } catch (error) {
      console.error("Error creating/updating task:", error);
      toast({
        title: "Error",
        duration: 2000,
        description: `Failed to ${initialTask ? "edit" : "create"}  task`,
      });
    } finally {
      setLoading(false);
    }
  };

  return { loading, onSubmit };
};
