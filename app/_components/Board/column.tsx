import { Task, Status } from "@/type";
import { useDroppable } from "@dnd-kit/core";
import { Card } from "@/app/_components/ui/card";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { TaskCard } from "@/app/_components/Card/task-card";

interface Props {
  tasks: Task[];
  column: Status;
}

export const BoardColumn = ({ tasks, column }: Props) => {
  const { setNodeRef } = useDroppable({
    id: column.name,
  });

  const columnTasks = tasks.filter((task) => task.status.name === column.name);

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
