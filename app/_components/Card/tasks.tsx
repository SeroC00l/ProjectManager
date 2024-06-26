"use client"
import { ListChecks } from "lucide-react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Task } from "@/type";
import { IconForm } from "../Form/icon";

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
              <span>{task.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <span>{task.status.name}</span>
              <span
                style={{ background: task.status.color }}
                className="size-4 rounded-full"
              />
            </div>
          </div>
        ))}

        <IconForm 
        />
      </CardContent>
    </Card>
  );
};
