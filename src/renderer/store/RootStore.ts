import { types } from 'mobx-state-tree';
import { v4 } from 'node-uuid';
import { Parameters } from './models/Parameters';
import { WorkItem } from './models/WorkItem';

export const RootStore = types
  .model({
    currentDay: types.optional(types.Date, new Date()),
    workItems: types.optional(types.map(WorkItem), {}),
    parameters: types.optional(Parameters, Parameters.create()),
  })
  .actions((self) => {
    function loadDate(nextDate: Date = new Date()) {
      self.workItems.clear();
      // Load from disk
    }

    function addNewWorkItem() {
      self.workItems.put(
        WorkItem.create({
          id: v4(),
        }),
      );
    }

    function removeWorkItem(id: string) {
      self.workItems.delete(id);
    }

    function afterCreate() {
      loadDate();
    }

    return {
      afterCreate,
      loadDate,
      addNewWorkItem,
      removeWorkItem,
    };
  });
