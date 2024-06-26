import { Status, Subtask, Task } from "@/type";
import { Combobox, Form } from ".";
import { subtaskSchema, taskSchema } from "@/constants/schemas";
import { StatusModal } from "../modal/status";
import { useParams } from "next/navigation";
import { SelectOption } from "./provider/select";
import { useEffect, useState } from "react";
import { getProjectStatuses } from "@/lib/actions/project.actions";
import { updateTask } from "@/lib/actions/task.actions";
import { toast } from "../ui/use-toast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Button } from "../ui/button";

interface Props {
  task: Task;
  subtask?: Subtask;
}

export const ChangeStatusForm = ({ task, subtask }: Props) => {
  const [open, setOpen] = useState(false);
  const schema = subtask ? subtaskSchema : taskSchema;
  const { id } = useParams();
  const taskOrSubtask = subtask || task;

  const defaultValues = {
    ...taskOrSubtask,
  };

  const [statusOptions, setStatusOptions] = useState<SelectOption[]>([]);

  useEffect(() => {
    async function fetchStatuses() {
      const statuses = await getProjectStatuses(id.toString());
      const options = statuses.map((status) => {
        return { value: status, label: status.name };
      });
      setStatusOptions(options);
    }
    fetchStatuses();
  }, [id]);

  const handleSubmit = async (status: Status) => {
    try {
      if (subtask) {
        if (task.subtasks) {
          let subtaskIndex = task.subtasks.findIndex(
            (st) => st.id === subtask.id
          );
          const updatedSubtasks = task.subtasks.slice();
          updatedSubtasks[subtaskIndex] = { ...subtask, status: status };
          await updateTask({ ...task, subtasks: updatedSubtasks });
        }
      } else {
        await updateTask({ ...task, status: status });
      }
      setOpen(false);
      toast({
        title: "Success",
        description: `${subtask ? "Subtask" : "Task"} status  updated successfully`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: `There was an error updating the status`,
      });
    }
  };

  return (
    <Form
      className="m-0 p-0 w-fit"
      schema={schema}
      defaultValues={defaultValues}
    >
      <Combobox
        open={open}
        onOpenChange={setOpen}
        className="flex"
        name="status"
        options={statusOptions}
        placeholder="change status"
        commandEmpty={<StatusModal />}
        onSelect={(value) => handleSubmit(value)}
        triggerbutton={
          <Button variant="ghost" className="p-0 hover:bg-transparent">
            <TooltipProvider>
              <Tooltip>
                <TooltipContent className="z-50" sideOffset={5}>{taskOrSubtask.status.name}</TooltipContent>
                <TooltipTrigger asChild>
                  <span
                    style={{ background: taskOrSubtask.status.color }}
                    className="size-4 rounded-full cursor-pointer"
                  />
                </TooltipTrigger>
              </Tooltip>
            </TooltipProvider>
          </Button>
        }
      />
    </Form>
  );
};
