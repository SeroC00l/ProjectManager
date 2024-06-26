"use client";
import { useState } from "react";
import { useToast } from "@/app/_components/ui/use-toast";
import { Task } from "@/type";
import { closeModal } from "@/app/_components/modal";
import { createTask, updateTask } from "@/lib/actions/task.actions";

export const useTaskForm = (initialTask?: Task) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (values: Task) => {
    try {
      setLoading(true);
      if (initialTask) {
        await updateTask(values);
        toast({
          title: "Success",
          duration: 2000,
          description: "Task updated successfully",
        });
      } else {
        await createTask(values);
        toast({
          title: "Success",
          duration: 2000,
          description: "Task created successfully",
        });
      }
      closeModal();
    } catch (error) {
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
