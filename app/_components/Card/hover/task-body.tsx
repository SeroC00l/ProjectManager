import { Task } from "@/type";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../../ui/hover-card";
import { Button } from "../../ui/button";
import { AlignLeft } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { ScrollArea } from "../../ui/scroll-area";

interface Props {
  task: Task;
}

export const TaskBody = ({ task }: Props) => {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="ghost" size="icon" className="flex size-fit p-1 justify-start">
          <AlignLeft className="size-4" />
        </Button>
      </HoverCardTrigger>
      {task.body && (
        <HoverCardContent className="w-[450px]">
          <ScrollArea>
            <ReactMarkdown className="prose">{task.body}</ReactMarkdown>
          </ScrollArea>
        </HoverCardContent>
      )}
    </HoverCard>
  );
};
