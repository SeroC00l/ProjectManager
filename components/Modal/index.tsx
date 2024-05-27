"use client";
import {
  ReactNode,
  forwardRef,
  useImperativeHandle,
  useState,
  createRef,
} from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

interface Props {
  triggerButton: ReactNode;
  title: string;
  description?: string;
  children: ReactNode;
} 

interface ModalRef {
  open: () => void;
  close: () => void;
}

export const Modal = forwardRef<ModalRef, Props>(
  ({ triggerButton, title, description, children }: Props, ref) => {
    const [open, setOpen] = useState(false);

    useImperativeHandle(ref, () => ({
      open: () => setOpen(true),
      close: () => setOpen(false),
    }));

    useImperativeHandle(modalRef, () => ({
      open: () => setOpen(true),
      close: () => setOpen(false),
    }));

    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{triggerButton}</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          {children}
        </DialogContent>
      </Dialog>
    );
  }
);
Modal.displayName = "Modal";

export const openModal = () => {
  modalRef.current?.open();
};

export const closeModal = () => {
  modalRef.current?.close();
};

export const modalRef = createRef<ModalRef>();
