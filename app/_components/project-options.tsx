import { Clipboard, Ellipsis, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { ProjectModal } from "./Modal/project-modal";
import { Project } from "@/type";
import { User } from "@supabase/supabase-js";
import { deleteProject } from "@/lib/actions/project.actions";
import { revalidatePath } from "next/cache";
import { toast } from "./ui/use-toast";

interface Props {
  project: Project;
  user: User;
}

export function ProjectOptions({ project, user }: Props) {
  const hadleCopyLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/${project.id}`);
    toast({
      title: "Success",
      description: "Link copied to clipboard",
    });
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete the project?")) {
      return;
    }
    const result = await deleteProject(project.id);
    if (result && result.id) {
      toast({
        title: "Success",
        duration: 2000,
        description: "Project deleted successfully",
      });
    }
    revalidatePath;
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Ellipsis className="size-4 hover:bg-primary rounded-md z-20" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48 p-0">
        <ProjectModal user={user} project={project} />
        <DropdownMenuItem>
          <Button
            onClick={handleDelete}
            variant={"ghost"}
            className="h-4 flex justify-start w-full p-0 m-0"
          >
            <Trash className="mr-2 h-4 w-4" />
            <span>Delete</span>
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Button
            onClick={hadleCopyLink}
            variant={"ghost"}
            className="h-4 flex justify-start w-full p-0 m-0"
          >
            <Clipboard className="mr-2 h-4 w-4" />
            <span>Copy Link</span>
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
