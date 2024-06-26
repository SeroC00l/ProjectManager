"use client";
import { Home } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Separator } from "@/app/_components/ui/separator";
import { ProjectOptions } from "./dropdown/project-options";
import { Project } from "@/type";
import { User } from "@supabase/supabase-js";
import { ProjectModal } from "./modal/project";

interface Props {
  projects: Project[];
  user: User;
}

// Cargar iconos de lucide-react
import * as Icons from "lucide-react";

export const Sidebar = ({ projects, user }: Props) => {
  const pathname = usePathname();
  return (
    <nav className="w-[200px] border-r flex flex-col text-secondary-foreground z-30">
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
      <h3 className="px-3 py-1 ml-2">My Projects</h3>
      <ul className="p-3">
        {projects.map((project: Project) => {
          const IconName = project.metadata?.icon as keyof typeof Icons;
          const IconComponent =
            (Icons[IconName] as React.ComponentType<{ className?: string }>) ||
            Home;

          return (
            <Link
              href={`/${project.id}`}
              key={project.id}
              className={`w-full h-fit p-2 rounded-md flex justify-between gap-2 items-center ${
                pathname === `/${project.id}` &&
                "bg-primary dark:text-secondary-foreground text-primary-foreground"
              }`}
            >
              <IconComponent className="size-4" />
              <span>
                {project.name.length > 10
                  ? `${project.name.substring(0, 10)}...`
                  : project.name}
              </span>
              <ProjectOptions project={project} user={user} />
            </Link>
          );
        })}
        <ProjectModal user={user} />
      </ul>
    </nav>
  );
};
