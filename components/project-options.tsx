import { Clipboard, Edit, Ellipsis, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Modal } from "./Modals";

export function ProjectOptions({form}: any) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Ellipsis className="size-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48 p-0">
        <Modal
          title="Edit Project"
          description="Edit your project"
          form={form}
        >
          <button className="flex px-2 pt-1 items-center">
            <Edit className="mr-2 h-4 w-4" />
            <span>Edit</span>
          </button>
        </Modal>
        <DropdownMenuItem>
          <Trash className="mr-2 h-4 w-4" />
          <span>Delete</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Clipboard className="mr-2 h-4 w-4" />
          <span>Copy Link</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
