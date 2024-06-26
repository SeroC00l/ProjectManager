"use client";
import { useState } from "react";
import { Calendar } from "../ui/calendar";
import { Card, CardHeader, CardContent } from "../ui/card";
import { Task } from "@/type";

export const CalendarCard = ({ tasks }: { tasks: Task[] }) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const selectedDate = date?.toISOString().split("T")[0];

  const tasksForSelectedDate = tasks.filter((task) => {
    const taskDate = task.date?.toISOString().split("T")[0];
    return taskDate === selectedDate;
  });

  return (
    <Card className="min-w-[400px] min-h-[400px] p-4">
      <CardHeader className="w-full flex-row items-center h-fit pt-3 pb-0 px-3">
        Calendar
      </CardHeader>
      <CardContent >
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md w-full dark:text-secondary-foreground justify-center flex"
        />
        {tasksForSelectedDate.length > 0 ? (
          <div>
            {tasksForSelectedDate?.map((task) => (
              <div className="flex justify-between items-center" key={task.id}>
                <div className="flex items-center gap-2">
                  <span>{task.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>{task.status.name}</span>
                  <span
                    style={{ backgroundColor: task.status.color }}
                    className="size-4 rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No tasks for selected date.</p>
        )}
      </CardContent>
    </Card>
  );
};
