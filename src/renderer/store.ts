import { types } from 'mobx-state-tree';
import { v4 } from 'node-uuid';

export const WorkItem = types.model({
  id: types.identifier(),
  title: '',
  durationInSeconds: 0,
});

export const RootStore = types
  .model({
    currentDay: types.optional(types.Date, new Date()),
    workItems: types.optional(types.map(WorkItem), {}),
  })
  .actions((self) => {
    function loadDate(nextDate?: Date) {
      self.workItems.clear();
      self.workItems.put({
        id: v4(),
        title: 'Item1',
        durationInSeconds: 100,
      });
      self.workItems.put({
        id: v4(),
        title: 'Item2',
        durationInSeconds: 100,
      });
      self.workItems.put({
        id: v4(),
        title: 'Item3',
        durationInSeconds: 100,
      });
    }

    function afterCreate() {
      loadDate();
    }

    return {
      afterCreate,
      loadDate,
    };
  });
