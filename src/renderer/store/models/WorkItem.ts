import { types } from 'mobx-state-tree';
import { v4 } from 'uuid';

export const WorkItem = types
  .model({
    id: types.optional(types.identifier(), () => v4()),
    title: '',
    durationInSeconds: 0,
  })
  .actions((self) => {
    function setValues(newValues: WorkItemType) {
      self.title = newValues.title;
      self.durationInSeconds = newValues.durationInSeconds;
    }

    return {
      setValues,
    };
  });
export type WorkItemType = typeof WorkItem.Type;
