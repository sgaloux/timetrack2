import fs from 'fs';
import { applySnapshot, getSnapshot, types } from 'mobx-state-tree';
import { v4 } from 'node-uuid';
import util from 'util';

import { getUserHome } from '../common/utils';

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const fileExists = util.promisify(fs.exists);

const PATHS = {
  settingsFile: getUserHome('settings.json'),
  dataPath: getUserHome('/data/'),
};

export const WorkItem = types.model({
  id: types.identifier(),
  title: '',
  durationInSeconds: 0,
});

export const Parameters = types
  .model({
    inflowUrl: '',
    inflowUser: '',
    inflowPassword: '',
  })
  .actions((self) => {
    async function saveParameters() {
      const jsonContent = getSnapshot(self);
      await writeFile(PATHS.settingsFile, jsonContent);
    }

    async function loadParameters() {
      const parameterFileExists = await fileExists(PATHS.settingsFile);

      if (!parameterFileExists) {
        saveParameters();
      }
      const jsonSettingsContent = await readFile(PATHS.settingsFile);
      applySnapshot(self, jsonSettingsContent);
    }

    function afterCreate() {
      loadParameters();
    }

    return {
      saveParameters,
      loadParameters,
      afterCreate,
    };
  });

export const RootStore = types
  .model({
    currentDay: types.optional(types.Date, new Date()),
    workItems: types.optional(types.map(WorkItem), {}),
    parameters: Parameters.create(),
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
