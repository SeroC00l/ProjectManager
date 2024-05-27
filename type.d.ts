export interface ModalProps {
  title: string;
  description: string;
  form?: ReactNode;
  children?: ReactNode;
}

export type Project = {
  id: string;
  name: string;
  description?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
  owner?: string;
};

export type TaskStatus = {
  id: string;
  name: string;
  color?: string;
  projectId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Task = {
  id: string;
  name: string;
  description?: string | null;
  status: TaskStatus;
  createdAt: Date;
  updatedAt: Date;
  projectId: string;
};

