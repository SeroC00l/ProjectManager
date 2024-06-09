"use client";
import { useState } from "react";
import { useToast } from "@/app/_components/ui/use-toast";
import { createProject, updateProject } from "@/lib/actions/project.actions";
import { Project } from "@/type";
import { closeModal } from "@/app/_components/Modal";

export const useProjectForm = (initialProject?: Project) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (values: Project) => {
    try {
      setLoading(true);
      if (initialProject) {
        await updateProject(initialProject.id, values);
        toast({
          title: "Success",
          duration: 2000,
          description: "Project updated successfully",
        });
      } else {
        await createProject(values);
        toast({
          title: "Success",
          duration: 2000,
          description: "Project created successfully",
        });
      }
      closeModal();
    } catch (error) {
      toast({
        title: "Error",
        duration: 2000,
        description: `Failed to ${initialProject ? "edit" : "create"}  project`,
      });
    } finally {
      setLoading(false);
    }
  };

  return { loading, onSubmit };
};
