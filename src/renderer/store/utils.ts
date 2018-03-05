import { getRoot, IStateTreeNode } from 'mobx-state-tree';
import { RootStore } from './RootStore';
import { ParametersType } from './models/Parameters';

export function GetParameters(model: IStateTreeNode): ParametersType {
  const root = getRoot(model) as typeof RootStore.Type;
  return root.parameters;
}
