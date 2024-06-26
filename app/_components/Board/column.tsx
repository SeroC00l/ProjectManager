import { Status } from "@/type";
import { useDroppable } from "@dnd-kit/core";
import { Card } from "@/app/_components/ui/card";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { TaskCard } from "@/app/_components/Card/task";
import { useStore } from "zustand";
import { useBoardStore } from "@/app/_store/board";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "../ui/context-menu";
import { Edit2 } from "lucide-react";
import { DeleteModal } from "../modal/delete";
import { updateProject } from "@/lib/actions/project.actions";
import { useParams } from "next/navigation";
import { toast } from "../ui/use-toast";
import { StatusModal } from "../modal/status";

interface Props {
  column: Status;
}

export const BoardColumn = ({ column, ...props }: Props) => {
  const tasks = useStore(useBoardStore, (state) => state.tasks);
  const statuses = useStore(useBoardStore, (state) => state.columns);
  const { id } = useParams();
  const { setNodeRef } = useDroppable({
    id: column.name,
  });

  const columnTasks = tasks.filter((task) => task.status.name === column.name);

  const handleDelete = async () => {
    try {
      await updateProject(id.toString(), {
        statuses: statuses.filter((status) => status.name !== column.name),
      });
      toast({
        title: "Success",
        description: "Column deleted successfully",
        duration: 5000,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Error deleting column",
        duration: 5000,
      });
    }
  };

  return (
    <div {...props} className="p-5 w-[300px]" ref={setNodeRef}>
      <ContextMenu>
        <ContextMenuTrigger>
          <ContextMenuContent className="w-44">
            <ContextMenuItem asChild>
              <StatusModal status={column} />
            </ContextMenuItem>
            <ContextMenuItem asChild>
              <DeleteModal
                title="Are you sure of deleting this Column?"
                labelButton="Delete Status"
                handleDelete={handleDelete}
              />
            </ContextMenuItem>
          </ContextMenuContent>
          <Card className="text-center font-bold mx-1 my-3 border-b-none border-t-2 overflow-clip">
            <div style={{ background: column.color }} className="h-1.5" />
            <h4 className="my-4">{column.name}</h4>
          </Card>
        </ContextMenuTrigger>
      </ContextMenu>
      <SortableContext
        items={columnTasks}
        strategy={verticalListSortingStrategy}
      >
        {columnTasks.map((task, index) => (
          <TaskCard key={task.id} task={task} index={index} />
        ))}
      </SortableContext>
    </div>
  );
};
