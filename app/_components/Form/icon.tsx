import { Icon } from "@/type";
import { Form } from ".";
import { IconPicker } from "./provider/icon-picker";
import { iconSchema } from "@/constants/schemas";

interface Props {
  icon?: Icon;
}

export const IconForm = ({ icon }: Props) => {
  const defautlValues = {
    ...icon
  };

  return (
    <Form schema={iconSchema} defaultValues={defautlValues}>
      <IconPicker name="icon" label="Icon" />
    </Form>
  );
};
