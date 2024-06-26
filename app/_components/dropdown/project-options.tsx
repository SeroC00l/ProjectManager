import { Clipboard, Ellipsis, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { ProjectModal } from "../modal/project";
import { Project } from "@/type";
import { User } from "@supabase/supabase-js";
import { deleteProject } from "@/lib/actions/project.actions";
import { revalidatePath } from "next/cache";
import { toast } from "../ui/use-toast";
import { DeleteModal } from "../modal/delete";
import { useProjectForm } from "@/app/_hooks/use-project-form";

interface Props {
  project: Project;
  user: User;
}

export function ProjectOptions({ project, user }: Props) {
  const { handleDelete } = useProjectForm(project);
  
  const hadleCopyLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/${project.id}`);
    toast({
      title: "Success",
      description: "Link copied to clipboard",
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Ellipsis className="size-4 hover:bg-primary rounded-md z-20" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48 p-0">
        <DropdownMenuItem asChild>
          <ProjectModal user={user} project={project} />
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <DeleteModal
            triggerButton={
              <Button
                variant={"ghost"}
                className="h-4 flex justify-start w-full px-2 py-1 m-0"
              >
                <Trash className="mr-2 h-4 w-4" />
                <span>Delete</span>
              </Button>
            }
            handleDelete={handleDelete}
            title="Are you sure of delete this Project?"
          />
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
