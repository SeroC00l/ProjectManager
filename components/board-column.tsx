import { Task, TaskStatus } from "@/type";
import { useDroppable } from "@dnd-kit/core";
import { Card } from "./ui/card";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { TaskCard } from "./Card/task-card";

interface Props {
  tasks: Task[];
  column: TaskStatus;
}

export const BoardColumn = ({ tasks, column }: Props) => {
  const { setNodeRef } = useDroppable({
    id: column.id,
  });

  const columnTasks = tasks.filter((task) => task.status.id === column.id);

  return (
    <div className="p-5 w-full min-w-[300px] h-full" ref={setNodeRef}>
      <Card className="text-center font-bold mx-1 my-3 border-b-none border-t-2 overflow-clip">
        <div style={{ backgroundColor: column.color }} className="h-1.5"></div>
        <h4 className="my-4">{column.name}</h4>
      </Card>
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
