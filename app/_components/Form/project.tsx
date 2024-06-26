import { projectSchema } from "@/constants/schemas";
import { User } from "@supabase/supabase-js";
import { Form, Input, Select } from ".";
import { LoadingButton } from "../button/loading";
import { useProjectForm } from "@/app/_hooks/use-project-form";
import { Project } from "@/type";

const privacyOptions = [
  { value: "owner_only", label: "Private - Only you can access" },
  { value: "members_only", label: "Private - Only members can access" },
  {
    value: "link_only",
    label: "Semi private - Anyone with the link can access",
  },
  { value: "public", label: "Public - Anyone can access" },
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
    members: project?.members || [
      {
        id: user?.id,
        name: user?.user_metadata.name,
        avatar: user?.user_metadata.avatar_url,
      },
    ],
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
      <LoadingButton
        loading={loading}
        type="submit"
        className="text-secondary-foreground"
      >
        {project ? "Update Project" : "Create Project"}
      </LoadingButton>
    </Form>
  );
}
