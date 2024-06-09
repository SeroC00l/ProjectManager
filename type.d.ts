import { InferSelectModel } from "drizzle-orm";
import { messages, projects, tasks } from "./lib/db/schema";

export interface ModalProps {
  title: string;
  description: string;
  form?: ReactNode;
  children?: ReactNode;
}
export type Project = InferSelectModel<typeof projects>;
export type Task = InferSelectModel<typeof tasks>;
export type message = InferSelectModel<typeof messages>;
export interface Status {
  name: string;
  color: string;
}
export interface Subtask {
  title: string;
  description?: string;
  status: Status;
}
export interface FileItem {
  parent?: FileItem;
  name: string;
  publicUrl?: string;
  type: "file" | "folder";
  files?: FileItem[];
}
export interface metadata {
  files?: FileItem[];
}

export interface Sender {
  name: string;
  id: string;
  avatarUrl: string;
}
