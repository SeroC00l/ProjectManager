"use client";
import { Home } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { Project } from "@prisma/client";
import ProjectForm from "./Forms/project-form";
import { ProjectOptions } from "./project-options";

export const Sidebar = ({ projects, user }: any) => {
  const pathname = usePathname();

  return (
    <nav className="w-[200px] border-r flex flex-col text-secondary-foreground">
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
        {projects.map((project: Project) => (
          <Link
            href={`/${project.id}`}
            key={project.id}
            className={`w-full h-fit p-2 hover:bg-muted rounded-md flex gap-2 items-center ${
              pathname === `/${project.id}` &&
              "bg-primary text-secondary-foreground"
            }`}
          >
            <Home className="size-4" />
            <span>
              {project.name.length > 10
                ? `${project.name.substring(0, 10)}...`
                : project.name}
            </span>
            <ProjectOptions
              form={<ProjectForm project={project} user={user} />}
            />
          </Link>
        ))}

        <ProjectForm user={user} />
      </ul>
    </nav>
  );
};
