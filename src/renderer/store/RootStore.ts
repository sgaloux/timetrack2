import { flow, types } from 'mobx-state-tree';
import { NotificationToast } from '../modules/Common';
import { Parameters } from './models/Parameters';
import { WorkDay } from './models/WorkDay';
import { InflowStore } from './models/InflowStore';

export const RootStore = types
  .model({
    parameters: types.optional(Parameters, Parameters.create()),
    workDay: types.optional(WorkDay, WorkDay.create({})),
    inflowStore: types.optional(InflowStore, InflowStore.create({})),
    initializing: true,
    initializeMessage: '',
  })
  .actions((self) => {
    const afterCreate = flow(function*() {
      try {
        self.initializing = true;
        self.initializeMessage = 'Loading parameters';
        yield self.parameters.loadParametersFromFile();
        self.initializeMessage = 'Loading inflow types';
        yield self.inflowStore.loadInflowTypesFromServer();
        yield self.inflowStore.saveInflowTypesToFile();
        self.initializeMessage = 'Loading inflow tree';
        yield self.inflowStore.loadInflowNodesFromServer();
        yield self.inflowStore.saveInflowNodesToFile();
        self.initializeMessage = 'Init done !';
      } catch (error) {
        NotificationToast.showError('Error in startup');
        console.error('Error occured on sartup...', error);
        self.initializeMessage = 'Error on startup : ' + error;
      }
      self.initializing = false;
    });

    return {
      afterCreate,
    };
  });
