import { remote } from 'electron';
import { flow, types } from 'mobx-state-tree';
import { NotificationToast } from '../modules/Common';
import { InflowStore } from './models/InflowStore';
import { ParametersStore } from './models/ParametersStore';
import { WorkDayStore } from './models/WorkDayStore';
import { ModalStore } from './models/modalStore';

export const RootStore = types
  .model({
    ParametersStore: types.optional(ParametersStore, ParametersStore.create()),
    WorkDayStore: types.optional(WorkDayStore, WorkDayStore.create({})),
    InflowStore: types.optional(InflowStore, InflowStore.create({})),
    ModalStore: types.optional(ModalStore, ModalStore.create({})),
    initializing: true,
    initializeMessage: '',
  })
  .actions((self) => {
    const afterCreate = flow(function*() {
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
        console.error('Error occured on sartup...', error);
        self.initializeMessage = `Error on startup : ${error}`;
      }
      self.initializing = false;
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
      afterCreate,
      synchronizeData,
      quitApplication,
    };
  });

export type RootStoreType = typeof RootStore.Type;
