"use client";
import {
  ReactNode,
  forwardRef,
  useImperativeHandle,
  useState,
  createRef,
  useEffect,
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
  title: string | ReactNode;
  open?: boolean;
  className?: string;
  description?: string | ReactNode;
  children: ReactNode;
  onOpenChange?: (isOpen: boolean) => void;
}

interface ModalRef {
  open: () => void;
  close: () => void;
}

const Modal = forwardRef<ModalRef, Props>(
  (
    {
      triggerButton,
      className,
      title,
      open: initialOpen = false,
      description,
      children,
      onOpenChange,
    }: Props,
    ref
  ) => {
    const [open, setOpen] = useState(initialOpen);

    useEffect(() => {
      setOpen(initialOpen);
    }, [initialOpen]);

    useEffect(() => {
      onOpenChange?.(open);
    }, [open, onOpenChange]);

    useImperativeHandle(modalRef, () => ({
      open: () => setOpen(true),
      close: () => setOpen(false),
    }));

    useImperativeHandle(ref, () => ({
      open: () => setOpen(true),
      close: () => setOpen(false),
    }));

    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{triggerButton}</DialogTrigger>
        <DialogContent className={className}>
          <DialogHeader>
            <DialogTitle asChild={typeof title !== "string"}>
              {title}
            </DialogTitle>
            <DialogDescription asChild={typeof description !== "string"}>{description}</DialogDescription>
          </DialogHeader>
          {children}
        </DialogContent>
      </Dialog>
    );
  }
);
Modal.displayName = "Modal";
const openModal = () => {
  modalRef.current?.open();
};

const closeModal = () => {
  modalRef.current?.close();
};

const modalRef = createRef<ModalRef>();
export { Modal, openModal, closeModal, modalRef };
