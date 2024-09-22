import { ReactNode, useMemo } from "react";
import { Form } from "antd";
import { SearchFieldsType } from "../types/SearchForm.types";
import { UseFormFieldOutput } from "../types/useFormFields.types";

const { Item } = Form;

export const useFormFields = (
  searchFields: SearchFieldsType,
): UseFormFieldOutput => {
  const formFields: ReactNode = useMemo(
    () => (
      <>
        {searchFields.map((item) => (
          <Item key={item.name} {...item} />
        ))}
      </>
    ),
    [searchFields],
  );

  return { formFields };
};
