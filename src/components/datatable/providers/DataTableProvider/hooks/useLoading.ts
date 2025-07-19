import { useCallback, useState } from "react";
import { UseLoadingOutput } from "../types/useLoading.types";

const useLoading = (): UseLoadingOutput => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const updateLoading = useCallback((value: boolean): void => {
    setIsLoading(value);
  }, []);

  return { isLoading, updateLoading };
};

export default useLoading;
