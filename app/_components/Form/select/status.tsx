import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { SelectOption } from "../provider/select";
import { getProjectStatuses } from "@/lib/actions/project.actions";
import { Select } from "..";

export const SelectStatus = () => {
  const { id } = useParams();
  const [statusOptions, setStatusOptions] = useState<SelectOption[]>([]);

  useEffect(() => {
    async function fetchStatuses() {
      const statuses = await getProjectStatuses(id.toString());
      const options = statuses.map((status) => {
        return { value: status, label: status.name };
      });
      setStatusOptions(options);
    }
    fetchStatuses();
  }, [id]);
  return <Select name="status" label="Task Status" options={statusOptions} />;
};
