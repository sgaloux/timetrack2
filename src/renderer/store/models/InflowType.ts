import { types } from 'mobx-state-tree';
import { InflowNode } from './InflowNode';

export const InflowType = types.model({
  id: types.string,
  name: types.string,
});

export type InflowNodeType = typeof InflowNode.Type;