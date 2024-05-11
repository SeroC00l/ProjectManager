export interface ModalProps {
  title: string;
  description: string;
  form?: ReactNode;
  children?: ReactNode;
}

export interface ProjectFormProps {
  user?: User,
  project?: Project
}
