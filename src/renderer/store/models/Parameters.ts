import { Intent } from '@blueprintjs/core';
import { exists, readFile, writeFile } from 'fs';
import { applySnapshot, getSnapshot, types } from 'mobx-state-tree';
import { PATHS } from '../../../common/utils';
import { NotificationToast } from '../../modules/Common';

const ParametersState = types.model({
  inflowUrl: '',
  inflowUser: '',
  inflowPassword: '',
});
export type ParametersType = typeof ParametersState.Type;

export const Parameters = ParametersState.views((self) => ({
  get allValues(): ParametersType {
    return getSnapshot(self);
  },
})).actions((self) => {
  function setNewParameters(newParams: typeof Parameters.Type) {
    applySnapshot(self, newParams);
    saveParameters();
  }

  function saveParameters() {
    const jsonContent = JSON.stringify(self, null, 2);
    writeFile(PATHS.settingsFile, jsonContent, { encoding: 'utf8' }, (error) => {
      if (error) {
        console.error('Unable to write parameter file', error);
        NotificationToast.show({
          message: 'Unable to save settings to file !',
          intent: Intent.DANGER,
        });
      }
      NotificationToast.show({ message: 'Settings saved !', intent: Intent.SUCCESS });
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
    setNewParameters,
  };
});
