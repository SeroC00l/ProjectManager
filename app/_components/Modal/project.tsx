"use client";
import { Modal } from ".";
import ProjectForm from "../Form/project";
import { User } from "@supabase/supabase-js";
import { Project } from "@/type";
import { Edit2, Plus } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

interface Props {
  project?: Project;
  user?: User;
}

export const ProjectModal = ({ project, user }: Props) => {
  return (
    <Modal
      title={project ? "Edit Project" : "Create Project"}
      description={project ? "" : "Create Project"}
      triggerButton={
        <Button
          variant="ghost"
          className={cn(
            "flex px-2 py-1 rounded-md  hover:bg-muted h-fit w-full",
            project ? "justify-start" : " py-2"
          )}
        >
          {project ? (
            <Edit2 className="size-4 mr-2" />
          ) : (
            <Plus className="size-4 mr-2" />
          )}
          <span>{project ? "Edit Project" : "Create Project"}</span>
        </Button>
      }
    >
      <ProjectForm project={project} user={user} />
    </Modal>
  );
};
