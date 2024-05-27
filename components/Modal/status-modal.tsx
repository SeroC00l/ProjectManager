import { Plus } from "lucide-react";
import { Modal } from ".";
import { Button } from "../ui/button";
import { StatusForm } from "../Form/status-form";

export const StatusModal = () => {
  return (
    <Modal
      title="Status"
      description="Create a new status"
      triggerButton={
        <Button variant="outline" className="mx-1 px-4 py-3 my-3 w-full">
          <Plus className="mr-2 h-4 w-4" />
          <span>Add Status</span>
        </Button>
      }
    >
      <StatusForm />
    </Modal>
  );
};
