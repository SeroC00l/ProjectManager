import { Modal } from ".";
import { Task } from "@/type";
import { Edit2, Plus } from "lucide-react";
import { Button } from "../ui/button";
import TaskForm from "../Form/task";

interface Props {
  task?: Task;
}

export const TaskModal = ({ task }: Props) => {
  return (
    <Modal
      title={task ? "Edit Task" : "Create Task"}
      triggerButton={
        task ? (
          <button className="flex px-2 py-2 rounded-sm items-center hover:bg-muted w-fit z-20">
            <Edit2 className="size-4 mr-2" />
          </button>
        ) : (
          <Button variant="default" className="mx-1 px-4 py-3 my-3 w-fit dark:text-secondary-foreground text-primary-foreground">
            <Plus className="mr-2 h-4 w-4" />
            <span>Add Task</span>
          </Button>
        )
      }
    >
      <TaskForm task={task} />
    </Modal>
  );
};
