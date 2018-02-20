import { getRoot, IStateTreeNode } from 'mobx-state-tree';
import { RootStore } from './RootStore';

export function GetParameters(model: IStateTreeNode) {
  const root = getRoot(model) as typeof RootStore.Type;
  return root.parameters;
}
