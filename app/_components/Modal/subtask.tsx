import { Modal } from ".";
import { Edit2, Plus } from "lucide-react";
import { Button } from "../ui/button";
import { Subtask, Task } from "@/type";
import { SubTaskForm } from "../Form/subtask";

interface Props {
  subtask?: Subtask;
  task: Task;
}

export const SubTaskModal = ({ subtask, task }: Props) => {
  return (
    <Modal
      title={subtask ? "Edit Subtask" : "Create Subtask"}
      triggerButton={
        subtask ? (
          <button className="flex px-2 py-2 rounded-sm items-center hover:bg-muted w-fit z-20">
            <Edit2 className="size-4 mr-2" />
          </button>
        ) : (
          <Button
            variant="outline"
            size="sm"
            className=" w-full px-4 py-3 my-3 dark:text-secondary-foreground"
          >
            <Plus className="mr-2 h-4 w-4" />
            <span>Add Subtask</span>
          </Button>
        )
      }
    >
      <SubTaskForm subtask={subtask} task={task} />
    </Modal>
  );
};
