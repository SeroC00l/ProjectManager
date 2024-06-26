import { Edit2, Plus } from "lucide-react";
import { Modal } from ".";
import { Button } from "../ui/button";
import { StatusForm } from "../Form/status";
import { Status } from "@/type";
import { DialogTrigger } from "../ui/dialog";

interface Props {
  status?: Status;
}

export const StatusModal = ({ status }: Props) => {
  return (
    <Modal
      title="Status"
      description="Create a new status"
      triggerButton={
        status ? (
          <DialogTrigger className="flex items-center w-full gap-2 px-2 text-sm py-1">
            <Edit2 className="size-4" />
            Edit Status
          </DialogTrigger>
        ) : (
          <Button variant="outline" className="mx-1 px-4 py-3 my-3 w-fit">
            <Plus className="mr-2 h-4 w-4" />
            <span>Add Status</span>
          </Button>
        )
      }
    >
      <StatusForm status={status} />
    </Modal>
  );
};
