"use client";
import { useState } from "react";
import { Calendar } from "../ui/calendar";
import { Card, CardHeader, CardContent} from "../ui/card";
import { Task } from "@/type";

export const CalendarCard = ({ tasks }: { tasks: Task[] }) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const selectedDate = date?.toISOString().split("T")[0];

  return (
    <Card className="min-w-[400px] min-h-[400px] p-4">
      <CardHeader className="w-full flex-row items-center h-fit pt-3 pb-0 px-3">
        Calendar
      </CardHeader>
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md w-full dark:text-secondary-foreground justify-center items-center flex"
      />
      <CardContent className="mt-4">
        {selectedDate && tasks[selectedDate] ? (
          <div>
            <h3 className="text-lg font-medium">Tasks for {selectedDate}</h3>
            <ul>
              {tasks[selectedDate].map((task) => (
                <li key={task.id} className="py-1">
                  {task.name}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p>No tasks for selected date.</p>
        )}
      </CardContent>
    </Card>
  );
};
