"use client";
import { useEffect, useState } from "react";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import { Task, TaskStatus } from "@/type";
import { BoardColumn } from "./board-column";
import { updateTaskStatus } from "@/lib/actions/task.actions";
import { StatusModal } from "./Modal/status-modal";
import { useBoardStore } from "@/app/_store/store";
import useStore from "@/app/_store/useStore";
import { TaskCard } from "./Card/task-card";

interface Props {
  initialTasks: Task[];
  initialColumns: TaskStatus[];
}

export const Board = ({ initialTasks, initialColumns }: Props) => {
  const { tasks, columns, setTasks, setColumns } = useBoardStore();
  const storeTasks = useStore(useBoardStore, (state) => state.tasks);
  const storeColumns = useStore(useBoardStore, (state) => state.columns);

  useEffect(() => {
    setTasks(initialTasks);
    setColumns(initialColumns);
  }, [initialTasks, setTasks]);

  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const handleDragEnd = async (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const updatedTasks = tasks.map((task) => {
        if (task.id.toString() === active.id) {
          return {
            ...task,
            status: columns?.find((c) => c.id === over.id) || task.status,
          };
        }
        return task;
      });
      setTasks(updatedTasks);

      const movedTask = updatedTasks.find(
        (task) => task.id.toString() === active.id
      );
      if (movedTask && movedTask.status) {
        try {
          await updateTaskStatus(movedTask.id.toString(), movedTask.status);
        } catch (error) {
          console.error("Failed to update task status:", error);
        }
      }
    }
    setActiveTask(null);
  };

  const handleDragStart = (event: any) => {
    const { active } = event;
    const task = storeTasks?.find((task) => task.id.toString() === active.id);
    setActiveTask(task || null);
  };

  return (
    <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
      <div className="flex flex-col lg:flex-row h-full">
        {storeColumns?.map((column) => (
          <div key={column.id} id={column.id} className="h-full">
            <BoardColumn tasks={storeTasks || []} column={column} />
          </div>
        ))}
        <div className="min-w-[300px] p-5">
          <StatusModal />
        </div>
      </div>
      <DragOverlay>
        {activeTask ? (
          <TaskCard task={activeTask} index={0} />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};
