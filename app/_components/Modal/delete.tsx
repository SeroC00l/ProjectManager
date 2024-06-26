import { Trash2 } from "lucide-react";
import { Modal, closeModal } from ".";
import { Button } from "../ui/button";
import { DialogTrigger } from "../ui/dialog";

interface Props {
  handleDelete: () => void;
  labelButton?: string;
  title: string;
  triggerButton?: React.ReactNode;
}

export const DeleteModal = ({
  labelButton,
  handleDelete,
  triggerButton,
  title,
}: Props) => {
  return (
    <Modal
      title={title}
      triggerButton={
        triggerButton || (
          <DialogTrigger className="flex items-center w-full gap-2 px-2 text-sm py-1">
            <Trash2 className="size-4" />
            {labelButton}
          </DialogTrigger>
        )
      }
    >
      <div className="grid grid-cols-2 gap-4 w-fit mx-auto my-5">
        <Button variant="destructive" onClick={() => closeModal()}>
          Cancel
        </Button>
        <Button
          className="dark:text-secondary-foreground"
          size="sm"
          onClick={handleDelete}
        >
          Delete
        </Button>
      </div>
    </Modal>
  );
};
