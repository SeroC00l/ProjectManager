import { ListChecks } from "lucide-react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Task } from "@/type";

export const TasksCard = ({ tasks }: { tasks: Task[] }) => {
  return (
    <Card className="flex flex-col min-w-[400px] min-h-[400px] p-5">
      <CardHeader className="w-full flex-row items-center h-fit">
        <ListChecks className="size-4 mr-2" />
        <h4>Tasks</h4>
      </CardHeader>
      <CardContent>
        {tasks?.map((task) => (
          <div className="flex justify-between items-center" key={task.id}>
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded-full bg-primary-foreground"></div>
              <span>{task.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded-full bg-primary-foreground"></div>
              <span>{task.status.name}</span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
