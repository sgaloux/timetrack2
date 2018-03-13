import { remote } from "electron";
import { flow, types } from "mobx-state-tree";
import { NotificationToast } from "../modules/Common";
import { InflowStore } from "./models/InflowStore";
import { Parameters } from "./models/Parameters";
import { WorkDay } from "./models/WorkDay";
import { ModalStore } from "./models/modalStore";

export const RootStore = types
  .model({
    parameters: types.optional(Parameters, Parameters.create()),
    workDay: types.optional(WorkDay, WorkDay.create({})),
    inflowStore: types.optional(InflowStore, InflowStore.create({})),
    modalStore: types.optional(ModalStore, ModalStore.create({})),
    initializing: true,
    initializeMessage: "",
  })
  .actions((self) => {
    const afterCreate = flow(function*() {
      try {
        self.initializing = true;
        self.initializeMessage = "Loading parameters";
        yield self.parameters.loadParametersFromFile();
        self.initializeMessage = "Loading inflow types";
        yield self.inflowStore.tryToLoadTypes();
        self.initializeMessage = "Loading inflow tree";
        yield self.inflowStore.tryToLoadNodes();
        self.initializeMessage = "Init done !";
      } catch (error) {
        NotificationToast.showError("Error in startup");
        console.error("Error occured on sartup...", error);
        self.initializeMessage = `Error on startup : ${error}`;
      }
      self.initializing = false;
    });

    const synchronizeData = flow(function*() {
      try {
        self.initializing = true;
        self.initializeMessage = "Synchronize inflow types";
        yield self.inflowStore.loadInflowTypesFromServer();
        yield self.inflowStore.saveInflowTypesToFile();
        self.initializeMessage = "Synchronize inflow tree";
        yield self.inflowStore.loadInflowNodesFromServer();
        yield self.inflowStore.saveInflowNodesToFile();
        self.initializeMessage = "Synchronization done !";
      } catch (error) {
        NotificationToast.showError("Error while synchronizing data");
        console.error("Error while synchronizing data...", error);
        self.initializeMessage = `Error while synchronizing data : ${error}`;
      }
      self.initializing = false;
    });

    const quitApplication = flow(function*() {
      const confirm = yield self.modalStore.confirm.show(
        "Confirm exit",
        "Are you sure you want to quit timetrack2 ? ",
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
