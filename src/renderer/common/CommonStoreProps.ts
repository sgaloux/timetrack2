import { RootStore } from '../store/RootStore';

export interface CommonStoreProps {
  store?: typeof RootStore.Type;
}
