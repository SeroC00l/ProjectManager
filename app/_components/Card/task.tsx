"use client";
import { Task } from "@/type";
import { useDraggable } from "@dnd-kit/core";
import { Card } from "../ui/card";
import { AssigneTaskForm } from "../Form/assigne-task";
import { useBoardStore } from "@/app/_store/board";
import { useStore } from "zustand";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { TaskBody } from "./hover/task-body";
import FullTaskModal from "../modal/full-task";
import { useState } from "react";
import { DueDatePopover } from "../popover/due-date";

interface Props {
  task: Task;
  index: number;
}

export const TaskCard = ({ task, index }: Props) => {
  const [open, setOpen] = useState(false);
  const project = useStore(useBoardStore, (state) => state.project);

  const { attributes, listeners, setNodeRef } = useDraggable({
    id: task.id.toString(),
    disabled: open,
  });

  return (
    <Card
      className="mx-1 px-4 py-3 my-3 relative"
      {...attributes}
      {...listeners}
      ref={setNodeRef}
      data-drag-handle
      data-drag-id={task.id.toString()}
      data-drag-index={index}
    >
      <span
        style={{ background: task.status.color }}
        className="absolute size-4 -top-1 -right-1 rounded-full"
      />
      <FullTaskModal
        onOpenChange={setOpen}
        task={task}
        triggerButton={
          <div className="flex flex-col gap-1">
            <h4 className="font-bold">{task.name}</h4>
            <p data-no-dnd className="text-sm">
              {task.description}
            </p>
            <div data-no-dnd className="flex flex-col gap-1">
              {task.body && <TaskBody task={task} />}
              <TooltipProvider>
                <Tooltip>
                  <TooltipContent>Due Date</TooltipContent>
                  <TooltipTrigger
                    className="size-fit hover:bg-muted px-1 rounded-md"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <DueDatePopover task={task} />
                  </TooltipTrigger>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipContent>Assigne</TooltipContent>
                  <TooltipTrigger
                    className="w-full"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <AssigneTaskForm
                      open={open}
                      onOpenChange={setOpen}
                      task={task}
                      members={project.members}
                      assignedTo={task.assignedTo}
                    />
                  </TooltipTrigger>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        }
      />
    </Card>
  );
};
