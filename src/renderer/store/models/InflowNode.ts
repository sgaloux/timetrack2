import { types, getParent, getRoot } from 'mobx-state-tree';
import { GetRootStore } from '../utils';

export function SortByName(a: InflowNodeType, b: InflowNodeType) {
  return a.name.localeCompare(b.name);
}

export const InflowNode = types
  .model({
    name: types.string,
    inflowId: types.identifier(types.string),
    parentId: types.maybe(types.string),
  })
  .views((self) => ({
    get children() {
      return GetRootStore(self).InflowStore.childNodesForParent(self.inflowId);
    },
  }));

export type InflowNodeType = typeof InflowNode.Type;
