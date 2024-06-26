import { Project, Task, Subtask } from "@/type";
import { Modal } from ".";
import ReactMarkdown from "react-markdown";
import { useState } from "react";
import { Form, Textarea, Input } from "../Form";
import { bodySchema } from "@/constants/schemas";
import { z } from "zod";
import { updateTask } from "@/lib/actions/task.actions";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { SubTaskModal } from "./subtask";
import { ChangeStatusForm } from "../Form/change-status";
import { Separator } from "../ui/separator";
import { format } from "date-fns";
import { DialogDescription, DialogTitle } from "../ui/dialog";

interface Props {
  triggerButton: React.ReactNode;
  onOpenChange?: (isOpen: boolean) => void;
  task: Task;
}

const FullTaskModal = ({
  triggerButton,
  task,
  onOpenChange,
}: Props) => {
  const [markdownText, setMarkdownText] = useState(task.body || "");
  const [isEditing, setIsEditing] = useState(false);
  const [selectedSubtask, setSelectedSubtask] = useState<Subtask | null>(null);

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  const handleSubmit = async (values: z.infer<typeof bodySchema>) => {
    toggleEditing();
    if (values?.body === null || values?.body === undefined) return;
    const formattedBody = values.body.split("\n").join("  \n");

    if (selectedSubtask) {
      const updatedSubtasks =
        task.subtasks?.map((subtask) =>
          subtask.id === selectedSubtask.id
            ? { ...subtask, body: formattedBody }
            : subtask
        ) || [];
      setMarkdownText(formattedBody);
      await updateTask({ ...task, subtasks: updatedSubtasks });
    } else {
      setMarkdownText(formattedBody);
      await updateTask({ ...task, body: formattedBody });
    }
  };

  const handleSubtaskSelect = (subtask: Subtask) => {
    setSelectedSubtask(subtask);
    setMarkdownText(subtask.body || "");
    setIsEditing(false);
  };

  const handleMainTaskSelect = () => {
    setSelectedSubtask(null);
    setMarkdownText(task.body || "");
    setIsEditing(false);
  };

  return (
    <Modal
      className="min-h-[600px] max-w-[900px] flex flex-col"
      onOpenChange={onOpenChange}
      triggerButton={triggerButton}
      title={
        <DialogTitle className="cursor-pointer" onClick={handleMainTaskSelect}>
          {selectedSubtask
            ? `${task.name} / ${selectedSubtask.name}`
            : task.name}
        </DialogTitle>
      }
      description={
        <DialogDescription className="flex justify-between">
          <p>
            {selectedSubtask ? selectedSubtask.description : task.description}
          </p>
          <h4>Task Body</h4>
          <p>
            {format(
              new Date(selectedSubtask ? selectedSubtask.date : task.date),
              "PPP"
            )}
          </p>
        </DialogDescription>
      }
    >
      <div className="flex">
        <div className="p-2 w-full flex flex-col gap-2 h-[500px]">
          <h2 className="font-semibold">Subtasks</h2>
          <ScrollArea>
            {task.subtasks && (
              <div className="flex justify-between items-center pr-4 mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm">Title: </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm">Due date: </span>
                  <span className="text-sm">Status: </span>
                </div>
              </div>
            )}
            {task.subtasks?.map((subtask, i) => (
              <>
                <div
                  className="flex justify-between items-center pr-4 mb-2 cursor-pointer"
                  key={i}
                >
                  <div className="flex items-center gap-2">
                    <span onClick={() => handleSubtaskSelect(subtask)}>
                      {subtask.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-6">
                    <span className="flex w-full text-sm">
                      {format(new Date(subtask.date), "PPP")}
                    </span>
                    <ChangeStatusForm task={task} subtask={subtask} />
                  </div>
                </div>
                <Separator />
              </>
            ))}
          </ScrollArea>
          <SubTaskModal task={task} />
        </div>
        <div
          onClick={() => setIsEditing(true)}
          className="relative flex w-[550px] h-[500px] border rounded z-50"
        >
          {isEditing ? (
            <Form
              defaultValues={{ body: markdownText }}
              className="flex justify-center w-[450px] h-[500px] flex-col gap-4"
              schema={bodySchema}
              onSubmit={handleSubmit}
            >
              <div className="relative w-[450px]">
                <Textarea
                  className="prose resize-none text-base h-[500px] border-0  border-b border- focus-visible:ring-0 focus-visible:ring-offset-0"
                  name="body"
                />
              </div>
              <Button
                className="opacity-30 hover:opacity-100 dark:text-secondary-foreground absolute left-1/2 transform -translate-x-1/2 bottom-2 transition-opacity duration-300"
                type="submit"
              >
                Save
              </Button>
            </Form>
          ) : (
            <div className="h-[500px] w-[450px]" onClick={toggleEditing}>
              <ScrollArea>
                {markdownText && (
                  <ReactMarkdown className="prose">
                    {markdownText}
                  </ReactMarkdown>
                )}
              </ScrollArea>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default FullTaskModal;
