import { types } from 'mobx-state-tree';
import { GetRootStore } from '../utils';

export const InflowNode = types
  .model({
    name: types.string,
    inflowId: types.identifier(types.string),
    parentId: types.maybe(types.string),
  })
  .views((self) => {
    return {
      get children() {
        return GetRootStore(self).InflowStore.childNodesForParent(self.inflowId);
      },
    };
  });

export type InflowNodeType = typeof InflowNode.Type;
