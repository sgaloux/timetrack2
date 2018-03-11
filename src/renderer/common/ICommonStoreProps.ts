import { RootStore } from "../store/RootStore";

export interface ICommonStoreProps {
  store?: typeof RootStore.Type;
}
