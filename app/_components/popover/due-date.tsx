import { CalendarIcon, X } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Task } from "@/type";
import { format } from "date-fns";
import { Calendar } from "../ui/calendar";
import { useState } from "react";
import { updateTask } from "@/lib/actions/task.actions";

export const DueDatePopover = ({ task }: { task: Task }) => {
  const [date, setDate] = useState<Date>(new Date(task.date) ?? new Date());
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = async (day: Date | undefined) => {
    const newDate = day ?? new Date();
    setDate(newDate);
    await updateTask({ ...task, date: newDate });
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger>
        <CalendarIcon className="w-4 h-4" />
      </PopoverTrigger>
      <PopoverContent data-no-dnd className="p-0">
        <div className="flex justify-between">
          <div className="p-2 flex gap-2 ">
            <h4 className="text-sm font-bold ml-3">Due Date:</h4>
            <p className="text-sm">{format(date, "PPP")}</p>
          </div>
          <X className="size-4 m-2 cursor-pointer" onClick={() => setIsOpen(false)} />
        </div>

        <Calendar
          mode="single"
          selected={date}
          onSelect={handleSelect}
          className="rounded-md w-full dark:text-secondary-foreground justify-center flex"
        />
      </PopoverContent>
    </Popover>
  );
};
