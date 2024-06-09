import { projectSchema } from "@/constants/schemas";
import { User } from "@supabase/supabase-js";
import { Form } from ".";
import { Input } from "./input";
import { LoadingButton } from "../Button/loading-button";
import { useProjectForm } from "@/app/_hooks/use-project-form";
import { Project } from "@/type";
import { Select } from "./select";

const privacyOptions = [
  { value: "owner_only", name: "Private - Only you can access"},
  { value: "members_only", name: "Private - Only members can access" },
  { value: "link_only", name: "Semi private - Anyone with the link can access" },
  { value: "public", name: "Public - Anyone can access" },
];

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
    privacy: project?.privacy || "owner_only",
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
      <Select name="privacy" label="Privacy Level" options={privacyOptions} />
      <LoadingButton loading={loading} type="submit" className="text-secondary-foreground">
        {project ? "Update Project" : "Create Project"}
      </LoadingButton>
    </Form>
  );
}
