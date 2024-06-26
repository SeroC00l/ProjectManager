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
export interface Icon extends Status {}
export interface Subtask extends Task {}
export interface FileItem {
  parent?: FileItem;
  name: string;
  publicUrl?: string;
  type: "file" | "folder";
  files?: FileItem[];
}
export interface metadata {
  files?: FileItem[];
  icon?: Icon;
}

interface User {
  name: string;
  id: string;
  avatarUrl: string;
}

export interface Sender extends User {}

export interface Member extends User {}
