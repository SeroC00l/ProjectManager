import { ProjectTabs } from "@/components/project-tabs";
import { getProjectById } from "@/lib/actions/project.actions";

export default async function ProjectPage({
  params,
}: {
  params: { id: string };
}) {
  const project = await getProjectById(params.id);

  return (
    <section className="size-full">
      <header className="border-b p-5">
        {project?.name}
      </header>
      <ProjectTabs project={project} />
    </section>
  );
}
