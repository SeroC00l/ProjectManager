"use client";
import { Modal } from ".";
import ProjectForm from "../Form/project-form";
import { User } from "@supabase/supabase-js";
import { Project } from "@/type";
import { Edit2, Plus } from "lucide-react";

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
        <button className="flex px-2 py-2 rounded-md items-center hover:bg-muted w-full">
          {project ? (
            <Edit2 className="size-4 mr-2" />
          ) : (
            <Plus className="size-4 mr-2" />
          )}
          <span>{project ? "Edit" : "Create"}</span>
        </button>
      }
    >
      <ProjectForm project={project} user={user} />
    </Modal>
  );
};
