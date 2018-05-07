import { types } from 'mobx-state-tree';

export const InflowActivity = types.model({
  id: types.string,
  name: types.string,
});

