import { OnSearchParams } from "../providers/types/useSearchRequest.types";

export type HandleRequestDataFunction<FormObjectType> = (
  infoObject: OnSearchParams<FormObjectType>,
) => Promise<void>;

export type UseRequestDataOutput<FormObjectType> = {
  handleRequestData: HandleRequestDataFunction<FormObjectType>;
};
