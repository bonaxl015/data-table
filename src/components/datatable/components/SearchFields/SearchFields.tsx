import { Form } from "antd";
import SearchFormWrapper from "./styles/SearchFormWrapper";
import { SearchFieldProps } from "./types/SearchForm.types";
import { useFormFields } from "./hooks/useFormFields";
import { useSearchButtons } from "./hooks/useSearchButtons";
import { useDataTable } from "../../providers/DataTableContext";
import { ButtonDefaultText } from "../../enums/buttonText";

const { Item } = Form;

function SearchFields<FormObjectType, RecordType extends object>({
  searchFields = [],
  searchButtonText = ButtonDefaultText.FILTER,
  resetButtonText = ButtonDefaultText.RESET,
  extraOperationButtons = <></>,
  loadDataImmediately = true,
  onSearch,
  onBeforeReset,
}: SearchFieldProps<FormObjectType, RecordType>) {
  const { formFields } = useFormFields(searchFields);
  const { searchFormInstance } = useDataTable<FormObjectType, RecordType>();
  const { searchButtons } = useSearchButtons<FormObjectType, RecordType>({
    searchFields,
    searchButtonText,
    resetButtonText,
    loadDataImmediately,
    onSearch,
    onBeforeReset,
  });

  return (
    <SearchFormWrapper>
      <Form form={searchFormInstance} layout="inline">
        {formFields}
        {searchButtons}
        <Item>{extraOperationButtons}</Item>
      </Form>
    </SearchFormWrapper>
  );
}

export default SearchFields;
