import { types } from 'mobx-state-tree';
import { GetParameters } from '../utils';

export const WorkItemShape = types.model({
  id: types.identifier(),
  title: '',
  durationInSeconds: 0,
});
export type WorkItemType = typeof WorkItemShape.Type;

export const WorkItem = WorkItemShape.actions((self) => {
  function uploadToInflow() {
    const params = GetParameters(self);
    console.log(params.inflowUrl);
  }

  return {
    uploadToInflow,
  };
});
