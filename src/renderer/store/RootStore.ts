import { flow, types } from 'mobx-state-tree';
import { NotificationToast } from '../modules/Common';
import { Parameters } from './models/Parameters';
import { WorkDay } from './models/WorkDay';
import { GetParameters } from './utils';

export const RootStore = types.model({
  parameters: types.optional(Parameters, Parameters.create()),
  workDay: types.optional(WorkDay, WorkDay.create({})),
  initializing: true,
  initializeMessage: '',
}).actions((self) => {
  const afterCreate = flow(function*() {
    try {
      self.initializing = true;
      self.initializeMessage = "Loading parameters";
      yield self.parameters.loadParametersFromFile();
      self.initializeMessage = "Init done !";
    } catch (error) {
      NotificationToast.showError('Error in startup');
      console.error('Error occured on sartup...', error);
      self.initializeMessage = "Error on startup : "+error;
    }
    self.initializing = false;
  });

  return {
    afterCreate,
  };
});
