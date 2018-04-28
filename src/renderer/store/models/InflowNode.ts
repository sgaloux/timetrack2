import { types } from 'mobx-state-tree';

export function SortByName(a: InflowNodeType, b: InflowNodeType) {
  return a.name.localeCompare(b.name);
}

// @ts-ignore
export const InflowNode = types.model({
  name: types.string,
  inflowId: types.string,
  parentId: types.maybe(types.string),
  children: types.optional(types.array(types.late(() => InflowNode)), []),
});

export type InflowNodeType = typeof InflowNode.Type;
