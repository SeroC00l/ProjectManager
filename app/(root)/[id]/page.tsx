import { Chat } from "@/app/_components/Chat";
import { ProjectTabs } from "@/app/_components/project-tabs";
import { getProjectById } from "@/lib/actions/project.actions";
import { getSession } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";

export default async function ProjectPage({
  params,
}: {
  params: { id: string };
}) {
  const project = await getProjectById(params?.id);
  const user = await getSession();
  if (!user) redirect("/login");
  if (!project) {
    return (
      <section className="size-full">
        <header className="border-b p-5">Project not found</header>
      </section>
    );
  }
  const isOwner = project.owner === user?.id;
  const isMember = project?.members
    ?.map((member) => member.id)
    .includes(user?.id);
  const canAccessProject =
    project.privacy === "public" ||
    (project.privacy === "link_only" && user) ||
    (project.privacy === "members_only" && (isOwner || isMember)) ||
    (project.privacy === "owner_only" && isOwner);
  if (!canAccessProject) {
    return (
      <section className="size-full">
        <header className="border-b p-5">
          You do not have access to this project.
        </header>
      </section>
    );
  }
  return (
    <section className="h-full w-[calc(-200px+100vw)]">
      <header className="border-b p-5">
        {project.name} - {project.description}
      </header>
      <ProjectTabs project={project} />
    </section>
  );
}
