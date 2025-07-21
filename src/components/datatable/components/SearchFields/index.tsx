import { ReactNode, useCallback, useEffect, useMemo } from "react";
import Form from "antd/es/form";
import Button from "antd/es/button";
import Space from "antd/es/space";
import SearchFormWrapper from "./styles/SearchFormWrapper";
import { SearchFieldProps } from "./types/SearchForm.types";
import { useDataTable } from "../../providers";
import { ButtonDefaultText } from "../../enums/buttonText";
import useRequestData from "../../hooks/useRequestData";
import { PageDefaultValues } from "../../enums/pageInfo";

function SearchFields<FormObjectType, RecordType extends object>({
  searchFields = [],
  searchButtonText = ButtonDefaultText.FILTER,
  resetButtonText = ButtonDefaultText.RESET,
  extraOperationButtons = <></>,
  loadDataImmediately = true,
  onSearch,
  onBeforeReset,
}: SearchFieldProps<FormObjectType, RecordType>) {
  const { isLoading, createInfoObject, searchFormInstance } = useDataTable<
    FormObjectType,
    RecordType
  >();
  const { handleRequestData } = useRequestData(onSearch);

  const formFields: ReactNode = useMemo(
    () => (
      <>
        {searchFields.map((item) => (
          <Form.Item key={item.name} {...item} />
        ))}
      </>
    ),
    [searchFields],
  );

  useEffect(() => {
    if (loadDataImmediately && onSearch) {
      submitFilterQuery();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadDataImmediately]);

  const submitFilterQuery = useCallback(async (): Promise<void> => {
    try {
      const formValues = await searchFormInstance.validateFields();
      const infoObject = createInfoObject(
        formValues,
        PageDefaultValues.PAGE_NUMBER,
        PageDefaultValues.PAGE_SIZE,
      );
      handleRequestData(infoObject);
    } catch (err) {
      console.log(err);
    }
  }, [createInfoObject, handleRequestData, searchFormInstance]);

  const resetForm = useCallback(async (): Promise<void> => {
    onBeforeReset?.();
    searchFormInstance.resetFields();
    submitFilterQuery();
  }, [onBeforeReset, searchFormInstance, submitFilterQuery]);

  const searchButtons: ReactNode = useMemo(
    () => (
      <>
        {Boolean(searchFields?.length) && (
          <>
            <Form.Item>
              <Space>
                <Button
                  key="filter"
                  type="primary"
                  onClick={submitFilterQuery}
                  loading={isLoading}
                >
                  {searchButtonText}
                </Button>
                <Button key="reset" onClick={resetForm}>
                  {resetButtonText}
                </Button>
              </Space>
            </Form.Item>
          </>
        )}
      </>
    ),
    [
      isLoading,
      resetButtonText,
      resetForm,
      searchButtonText,
      searchFields?.length,
      submitFilterQuery,
    ],
  );

  return (
    <SearchFormWrapper>
      <Form form={searchFormInstance} layout="inline">
        {formFields}
        {searchButtons}
        <Form.Item>{extraOperationButtons}</Form.Item>
      </Form>
    </SearchFormWrapper>
  );
}

export default SearchFields;
