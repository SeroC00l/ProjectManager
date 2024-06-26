"use client";
import { Plus, User2Icon } from "lucide-react";
import { Button } from "@/app/_components/ui/button";
import { useEffect, useState } from "react";
import { Member, Task } from "@/type";
import UserAvatar from "../user-avatar";
import { updateTask } from "@/lib/actions/task.actions";
import { Combobox, Form } from ".";
import { taskSchema } from "@/constants/schemas";
import { toast } from "../ui/use-toast";

interface Props {
  assignedTo: Member[] | null;
  onOpenChange?: (isOpen: boolean) => void;
  members: Member[] | null;
  task: Task;
  open: boolean;
}

export function AssigneTaskForm({
  assignedTo,
  members,
  task,
  open: initialOpen = false,
  onOpenChange,
}: Props) {
  const [open, setOpen] = useState(initialOpen);
  
  const defaultValues = {
    ...task,
  };

  const options = members?.map((member) => ({
    value: member,
    label: member.name,
  }));

  useEffect(() => {
    onOpenChange?.(open);
  }, [open, onOpenChange]);

 const handleAssign = async (member: Member) => {
  if (
    task.assignedTo?.some((assignedMember) => assignedMember.id === member.id)
  ) {
    setOpen(false);
    return;
  }
  try {
    await updateTask({
      ...task,
      assignedTo: [...(task.assignedTo || []), member] as Member[],
    });
  } catch (error) {
    toast({
      title: "Failed",
      description: "Failed to assign member to task",
    });
  } finally {
    setOpen(false);
  }
};

  return (
    <Form className="w-full h-fit" schema={taskSchema} defaultValues={defaultValues}>
      <Combobox
        name="assignedTo"
        open={open}
        options={options}
        onOpenChange={setOpen}
        onSelect={handleAssign}
        placeholder="Project members"
        className="w-full mt-0"
        commandEmpty={
          <Button variant="ghost" className="w-full gap-2">
            <Plus className="size-4" />
            <span>Invite a new member</span>
          </Button>
        }
        triggerbutton={
          <Button variant="ghost" className="w-full px-1 py-1 h-fit flex justify-start gap-2 m-0">
            <User2Icon className="size-4 rounded-full border-secondary-foreground" />
            {!assignedTo
              ? "-"
              : assignedTo.map((member) => (
                  <>
                    <UserAvatar
                      className="size-4"
                      user={member}
                      key={member.id}
                    />
                  </>
                ))}
          </Button>
        }
      />
    </Form>
  );
}
