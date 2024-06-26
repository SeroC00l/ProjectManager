import { cn } from "@/lib/utils";
import UserAvatar from "../user-avatar";
import styles from "./style.module.css";
import { message } from "@/type";
import { User } from "@supabase/supabase-js";
import { ScrollArea } from "@/app/_components/ui/scroll-area";

interface Props {
  messages: message[];
  user: User;
}

export const Messages = ({ messages, user }: Props) => {
  return (
    <ScrollArea className="flex flex-col flex-1  w-full p-2">
      {messages.map((message) => (
        <div
          className={cn(
            "flex w-full",
            message.sender.id === user.id ? "flex-row-reverse" : ""
          )}
          key={message.id}
        >
          <UserAvatar user={message.sender} className="size-8 mt-auto" />
          <div
            key={message.id}
            className={`p-2 mb-6  flex flex-col mx-2 gap-2 w-fit max-w-[200px] rounded-md relative  ${
              styles.message
            } ${
              message.sender.id === user.id
                ? styles.emisor + " bg-primary ml-auto items-end"
                : styles.receptor + " bg-secondary items-start"
            }`}
          >
            <p
              className={cn("w-full",
                message.sender.id === user.id
                  ? "text-primary-foreground dark:text-secondary-foreground"
                  : ""
              )}
            >
              {message.text}
            </p>
            <span
              className={cn(
                message.sender.id === user.id
                  ? "text-primary-foreground dark:text-secondary-foreground"
                  : ""
              )}
            >
              {message.createdAt.toLocaleString("en-US", {
                hour: "numeric",
                minute: "numeric",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>
        </div>
      ))}
    </ScrollArea>
  );
};
