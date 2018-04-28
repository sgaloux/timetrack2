import { types } from 'mobx-state-tree';
import { InflowNode } from './InflowNode';

export const InflowActivity = types.model({
  id: types.string,
  name: types.string,
});

export type InflowActivityType = typeof InflowNode.Type;
