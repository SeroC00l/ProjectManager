"use client";
import { Form, Input } from ".";
import { FileItem } from "@/type";
import { folderSchema } from "@/constants/schemas";
import { useFiles } from "@/app/_hooks/use-files";
import { z } from "zod";
import { Button } from "../ui/button";

interface Props {
  file?: FileItem;
  callback?: () => void;
}

export const FileForm = ({ file, callback }: Props) => {
  const { handleCreateFolder, handleRenameFolder } = useFiles();
  const defaultValues = {
    folderName: file?.name || "",
  };
  const handleSubmit = async (values: z.infer<typeof folderSchema>) => {
    try {
      if (file) {
        await handleRenameFolder(file, values.folderName);
      } else {
        await handleCreateFolder(values);
      }
      callback?.();
    } catch (error) {
      console.error("Error creating folder:", error);
    }
  };
  return (
    <Form
      className="flex justify-center items-end gap-2"
      schema={folderSchema}
      defaultValues={defaultValues}
      onSubmit={handleSubmit}
    >
      <Input name="folderName" label="Folder Name" />
      <Button className="dark:text-secondary-foreground">
        {file ? "Rename" : "Create"}
      </Button>
    </Form>
  );
};
