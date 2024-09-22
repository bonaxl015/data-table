import { Button, Form, Space } from "antd";
import { ReactNode, useCallback, useEffect, useMemo } from "react";
import { SearchFieldProps } from "../types/SearchForm.types";
import { UseSearchButtonOutput } from "../types/useSearchButtons.types";
import { useDataTable } from "../../../providers/DataTableContext";
import useRequestData from "../../../hooks/useRequestData";
import { PageDefaultValues } from "../../../enums/pageInfo";

const { Item } = Form;

export function useSearchButtons<FormObjectType, RecordType extends object>({
  searchFields,
  searchButtonText,
  resetButtonText,
  loadDataImmediately,
  onSearch,
  onBeforeReset,
}: SearchFieldProps<FormObjectType, RecordType>): UseSearchButtonOutput {
  const { isLoading, createInfoObject, searchFormInstance } = useDataTable<
    FormObjectType,
    RecordType
  >();
  const { handleRequestData } = useRequestData(onSearch);

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
            <Item>
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
            </Item>
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

  return { searchButtons };
}
