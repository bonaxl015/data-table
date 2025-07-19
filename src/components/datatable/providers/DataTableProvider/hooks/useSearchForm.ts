import { Form } from "antd";
import { UseSearchFormOutput } from "../types/useSearchForm.types";

const { useForm } = Form;

const useSearchForm = <
  FormObjectType,
>(): UseSearchFormOutput<FormObjectType> => {
  const [searchFormInstance] = useForm<FormObjectType>();

  return { searchFormInstance };
};

export default useSearchForm;
