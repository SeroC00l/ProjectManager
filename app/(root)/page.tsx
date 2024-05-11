import ProjectForm from "@/components/Forms/project-form";
import { Header } from "@/components/header";
import { Modal } from "@/components/Modals";
import { Separator } from "@/components/ui/separator";
import { getUserProjects } from "@/lib/actions/project.actions";
import { getSession } from "@/lib/actions/user.actions";
import { Home } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Homepage() {
  const user = await getSession();
  if (user) {
  } else {
    redirect("/login");
  }
  const projects = await getUserProjects(user);

  return (
    <main className="h-screen">
      <Header user={user} />
      <nav
        className="w-[200px] border-r flex flex-col text-secondary-foreground"
        style={{ height: "calc(100vh - 56px)" }}
      >
        <ul className="p-3">
          <Link
            href="/"
            className="w-full hover:bg-muted h-fit p-2 rounded-md flex gap-2 items-center"
          >
            <Home className="size-4" />
            <span>Home</span>
          </Link>
        </ul>
        <Separator />
        <h3 className="p-2">Projects</h3>
        <ul className="p-3">
          {projects.map((project) => (
            <Link
              href="/"
              className="w-full hover:bg-muted h-fit p-2 rounded-md flex gap-2 items-center"
            >
              <Home className="size-4" />
              <span>
                {project.name.length > 10
                  ? `${project.name.substring(0, 10)}...`
                  : project.name}
              </span>
            </Link>
          ))}
          <Modal
            title="Create Project"
            description="Start creating your first project"
            form={<ProjectForm user={user} />}
          />
        </ul>
      </nav>
    </main>
  );
}
