import { getRoot, IStateTreeNode } from 'mobx-state-tree';
import { ParametersStoreType } from './ParametersStore';
import { RootStore, RootStoreType } from './RootStore';
import { ModalStoreType } from './ModalStore';

export * from './InflowStore';
export * from './ModalStore';
export * from './ParametersStore';
export * from './RootStore';
export * from './WorkDayStore';
export * from './models';

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

export { InflowType } from './models/InflowType';
export { InflowNode } from './models/InflowNode';
export { InflowNodeType } from './models/InflowType';
export { ConfirmModalModel } from './models/ConfirmModalModel';