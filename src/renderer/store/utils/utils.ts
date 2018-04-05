import { RootStore, RootStoreType } from '../RootStore';
import { getRoot, IStateTreeNode } from 'mobx-state-tree';
import { ParametersStoreType } from '../ParametersStore';
import { ModalStoreType } from '../ModalStore';

export const mapStore = (func: (root: RootStoreType) => object) => (stores: {
  store: RootStoreType;
}) => {
  return func(stores.store);
};

export function GetParameters(model: IStateTreeNode): ParametersStoreType {
  const root = getRoot(model) as typeof RootStore.Type;
  return root.ParametersStore;
}

export function GetModals(model: IStateTreeNode): ModalStoreType {
  const root = getRoot(model) as typeof RootStore.Type;
  return root.ModalStore;
}
