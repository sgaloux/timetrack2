import { remote } from 'electron';
import { flow, types } from 'mobx-state-tree';
import { NotificationToast } from '../modules/Common';
import { ParametersStore } from './ParametersStore';
import { WorkDayStore } from './WorkDayStore';
import { InflowStore } from './InflowStore';
import { ModalStore } from './ModalStore';

export const RootStore = types
  .model({
    ParametersStore: types.optional(ParametersStore, {}),
    WorkDayStore: types.optional(WorkDayStore, {}),
    InflowStore: types.optional(InflowStore, {}),
    ModalStore: types.optional(ModalStore, {}),
    initializing: true,
    initializeMessage: '',
  })
  .actions((self) => {
    const initialize = flow(function*() {
      try {
        self.initializing = true;
        self.initializeMessage = 'Loading parameters';
        yield self.ParametersStore.loadParametersFromFile();
        self.initializeMessage = 'Loading inflow types';
        yield self.InflowStore.tryToLoadTypes();
        self.initializeMessage = 'Loading inflow tree';
        yield self.InflowStore.tryToLoadNodes();
        self.initializeMessage = 'Init done !';
      } catch (error) {
        NotificationToast.showError('Error in startup');
        self.initializeMessage = `Error on startup : ${error}`;
      }
      self.initializing = false;
      console.log('init done');
    });

    const synchronizeData = flow(function*() {
      try {
        self.initializing = true;
        self.initializeMessage = 'Synchronize inflow types';
        yield self.InflowStore.loadInflowTypesFromServer();
        yield self.InflowStore.saveInflowTypesToFile();
        self.initializeMessage = 'Synchronize inflow tree';
        yield self.InflowStore.loadInflowNodesFromServer();
        yield self.InflowStore.saveInflowNodesToFile();
        self.initializeMessage = 'Synchronization done !';
      } catch (error) {
        NotificationToast.showError('Error while synchronizing data');
        console.error('Error while synchronizing data...', error);
        self.initializeMessage = `Error while synchronizing data : ${error}`;
      }
      self.initializing = false;
    });

    const quitApplication = flow(function*() {
      const confirm = yield self.ModalStore.confirm.show(
        'Confirm exit',
        'Are you sure you want to quit timetrack2 ? ',
      );
      if (confirm) {
        remote.app.quit();
      }
    });

    return {
      initialize,
      synchronizeData,
      quitApplication,
    };
  });

export type RootStoreType = typeof RootStore.Type;
