import { types } from 'mobx-state-tree';

export const InflowNode = types.model({
  name: types.string,
  inflowId: types.string,
  parentId: types.maybe(types.string),
});