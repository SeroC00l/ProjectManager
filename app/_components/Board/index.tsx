"use client";
import { useEffect, useState } from "react";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import { Task, Status, Project } from "@/type";
import { BoardColumn } from "./column";
import { StatusModal } from "../modal/status";
import { useBoardStore } from "@/app/_store/board";
import useStore from "@/app/_store/useStore";
import { TaskCard } from "@/app/_components/Card/task";
import { updateTask } from "@/lib/actions/task.actions";
import { MouseSensor, TouchSensor } from "./CustomPointerSensor";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

interface Props {
  initialTasks: Task[];
  initialColumns: Status[];
  project: Project;
}

export const Board = ({ initialTasks, initialColumns, project }: Props) => {
  const { setTasks, setColumns, setProject } = useBoardStore();
  const tasks = useStore(useBoardStore, (state) => state.tasks);
  const columns = useStore(useBoardStore, (state) => state.columns);

  useEffect(() => {
    setTasks(initialTasks);
    setColumns(initialColumns);
    setProject(project);
  }, [initialTasks, setTasks]);

  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const handleDragEnd = async (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const updatedTasks = tasks?.map((task) => {
        if (task.id === active.id) {
          return {
            ...task,
            status: columns?.find((c) => c.name === over.id) ?? task.status,
          };
        }
        return task;
      });
      updatedTasks && setTasks(updatedTasks);
      const movedTask = updatedTasks?.find(
        (task) => task.id.toString() === active.id
      );
      if (movedTask && movedTask.status) {
        try {
          await updateTask(movedTask);
        } catch (error) {
          console.error("Failed to update task status:", error);
        }
      }
    }
    setActiveTask(null);
  };

  const handleDragStart = (event: any) => {
    const { active } = event;
    const task = tasks?.find((task) => task.id === active.id);
    setActiveTask(task || null);
  };

  const handleScrollMouse = (e: React.WheelEvent) => {
    if (e.shiftKey) {
      e.currentTarget.scrollLeft += e.deltaY;
      e.preventDefault();
    }
  };

  return (
    <ScrollArea
      className="w-full max-h-[calc(100%-180px)]"
      onWheel={handleScrollMouse}
    >
      <ScrollBar orientation="horizontal" className="z-30" />
      <DndContext
        onDragEnd={handleDragEnd}
        onDragStart={handleDragStart}
        sensors={[MouseSensor, TouchSensor]}
      >
        <div className="flex flex-col lg:flex-row h-[calc(100vh-230px)]">
          {columns?.map((column) => (
            <BoardColumn column={column} key={column.name} />
          ))}
          <div className="min-w-[300px] p-5">
            <StatusModal />
          </div>
        </div>
        <DragOverlay>
          {activeTask ? <TaskCard task={activeTask} index={0} /> : null}
        </DragOverlay>
      </DndContext>
    </ScrollArea>
  );
};
