"use client";
import { useEffect, useState } from "react";
import { Project, message } from "@/type";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { MessageCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "../Form/input";
import { Form, resetForm } from "../Form";
import { messageSchema } from "@/constants/schemas";
import { z } from "zod";
import { User } from "@supabase/supabase-js";
import { createMessage, getMessages } from "@/lib/actions/message.actions";
import { createClient } from "@/lib/supabase/client";
import { Messages } from "./messages";
import { Call } from "./call";

interface Props {
  project: Project;
  user: User;
}

export const Chat = ({ project, user }: Props) => {
  const [messages, setMessages] = useState<message[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const toggleChatVisibility = () => {
    setIsVisible(!isVisible);
  };
  const defaultValues = {
    text: "",
    projectId: project.id,
    sender: {
      name: user.user_metadata?.name || "",
      id: user.id,
      avatarUrl: user.user_metadata?.avatar_url || "",
    },
  };
  useEffect(() => {
    const fetchMessages = async () => {
      const messages = await getMessages(project.id);
      setMessages(messages);
      const supabase = createClient();
      const messageChannel = supabase.channel("schema-filter-changes", {
        config: {
          broadcast: { self: true },
        },
      });
      messageChannel
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "messages",
            filter: `projectId=eq.${project.id}`,
          },
          (payload) => {
            console.log(payload);
          }
        )
        .subscribe();
    };
    fetchMessages();
  }, [project.id]);

  const handeSubmit = async (values: z.infer<typeof messageSchema>) => {
    if (values.text.length < 1) return;
    resetForm();
    await createMessage(values);
  };

  return (
    <>
      {!isVisible && (
        <Button
          className={"absolute bottom-4 right-4 z-30 h-14 "}
          onClick={toggleChatVisibility}
        >
          <MessageCircle className="size-10 dark:text-secondary-foreground" />
        </Button>
      )}
      {isVisible && (
        <Card
          className={cn(
            "absolute bottom-4 right-4 z-20 min-w-[400px] max-w-[600px] h-[500px] p-4 flex flex-col",
            isVisible && "animate-in"
          )}
        >
          <div className="flex justify-between items-center mb-2">
            <h4>Project Chat </h4>
            <div className="flex gap-2">
              <Call />
              <X
                onClick={toggleChatVisibility}
                className="z-30 cursor-pointer size-5"
              />
            </div>
          </div>
          <Messages messages={messages} user={user} />
          <Form
            onSubmit={handeSubmit}
            defaultValues={defaultValues}
            schema={messageSchema}
          >
            <Input name="text" autoComplete="off" label="Message" />
          </Form>
        </Card>
      )}
    </>
  );
};
