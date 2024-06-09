"use client";
import { Task } from "@/type";
import { useDraggable } from "@dnd-kit/core";
import { Card } from "../ui/card";
import Link from "next/link";

interface TaskCardProps {
  task: Task;
  index: number;
}

export const TaskCard = ({ task, index }: TaskCardProps) => {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: task.id.toString(),
  });
  

  return (
    <Link href={`/task/${task.id}`}>
      <Card
        className="mx-1 px-4 py-3 my-3 relative"
        {...attributes}
        {...listeners}
        ref={setNodeRef}
        data-drag-handle
        data-drag-id={task.id.toString()}
        data-drag-index={index}
      >
        <div
          style={{ backgroundColor: task.status.color }}
          className="absolute size-4 -top-1 -right-1 rounded-full"
        ></div>
        <div className="flex justify-between">
          <h4>{task.name}</h4>
        </div>
      </Card>
    </Link>
  );
};
