import { OnSearchParams } from "../providers";

export type HandleRequestDataFunction<FormObjectType> = (
  infoObject: OnSearchParams<FormObjectType>,
) => Promise<void>;

export type UseRequestDataOutput<FormObjectType> = {
  handleRequestData: HandleRequestDataFunction<FormObjectType>;
};
