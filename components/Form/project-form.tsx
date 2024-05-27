import { projectSchema } from "@/consts/schemas";
import { User } from "@supabase/supabase-js";
import { Form } from ".";
import { Input } from "./input";
import { LoadingButton } from "../Button/loading-button";
import { useProjectForm } from "@/hooks/use-project-form";
import { Project } from "@/type";

interface Props {
  user?: User;
  project?: Project;
}

export default function ProjectForm({ user, project }: Props) {
  const { loading, onSubmit } = useProjectForm(project);

  const defaultValues = {
    name: project?.name || "",
    description: project?.description || "",
    owner: project?.owner || user?.id,
  };

  return (
    <Form
      schema={projectSchema}
      onSubmit={onSubmit}
      defaultValues={defaultValues}
      className="gap-4 flex flex-col"
    >
      <Input name="name" label="Project Name" />
      <Input name="description" label="Project Description" />
      <LoadingButton loading={loading} type="submit" className="text-secondary-foreground">
        {project ? "Update Project" : "Create Project"}
      </LoadingButton>
    </Form>
  );
}
