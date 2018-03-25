import { getRoot, IStateTreeNode } from 'mobx-state-tree';
import { RootStore } from './RootStore';
import { ParametersType } from './models/ParametersStore';
import { ModalStoreType } from './models/ModalStore';

export function GetParameters(model: IStateTreeNode): ParametersType {
  const root = getRoot(model) as typeof RootStore.Type;
  return root.parameters;
}

export function GetModals(model: IStateTreeNode): ModalStoreType {
  const root = getRoot(model) as typeof RootStore.Type;
  return root.modalStore;
}
