import { exists, readFile, writeFile } from 'fs';
import { getSnapshot, types, applySnapshot } from 'mobx-state-tree';
import { v4 } from 'node-uuid';

import { getRootFolder } from 'common/utils';

const PATHS = {
  settingsFile: getRootFolder('settings.json'),
  dataPath: getRootFolder('/data/'),
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
    function saveParameters() {
      const jsonContent = JSON.stringify(self, null, 2);
      writeFile(PATHS.settingsFile, jsonContent, { encoding: 'utf8' }, (error) => {
        if (error) {
          console.error('Unable to write parameter file', error);
        }
      });
    }

    function loadParametersFromFile() {
      exists(PATHS.settingsFile, (fileExist) => {
        if (!fileExist) {
          saveParameters();
        } else {
          readFile(PATHS.settingsFile, { encoding: 'utf8' }, (err, data) => {
            if (!err) {
              const content = JSON.parse(data);
              applySnapshot(self, content);
            } else {
              console.error('Unable to load settings file', err);
            }
          });
        }
      });
    }

    function afterCreate() {
      loadParametersFromFile();
    }

    return {
      saveParameters,
      afterCreate,
    };
  });

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
