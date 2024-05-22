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

export type Task = {
  id: string;
  name: string;
  description?: string | null;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  projectId: string;
};
