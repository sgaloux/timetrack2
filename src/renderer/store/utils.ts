import { getRoot, IStateTreeNode } from 'mobx-state-tree';
import { RootStore, RootStoreType } from './RootStore';
import { ParametersStoreType } from './models/ParametersStore';
import { ModalStoreType } from './models/ModalStore';

export function GetParameters(model: IStateTreeNode): ParametersStoreType {
  const root = getRoot(model) as typeof RootStore.Type;
  return root.ParametersStore;
}

export function GetModals(model: IStateTreeNode): ModalStoreType {
  const root = getRoot(model) as typeof RootStore.Type;
  return root.ModalStore;
}

export function GetRootStore(s: any): RootStoreType {
  return s.store as RootStoreType;
}
