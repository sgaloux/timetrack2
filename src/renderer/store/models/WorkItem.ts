import { types } from 'mobx-state-tree';

export const WorkItem = types.model({
  id: types.identifier(),
  title: '',
  durationInSeconds: 0,
});
