import fs from 'fs';
import { applySnapshot, flow, getSnapshot, types } from 'mobx-state-tree';
import { PATHS, readFilePromisified, writeFilePromisified } from '../../common/utils';
import { NotificationToast } from '../../modules/Common';

export const ParametersModel = types
  .model({
    inflowUrl: '',
    inflowUser: '',
    inflowPassword: '',
  })
  .actions((self) => {
    function setNewParameters(newParams: typeof ParametersModel.Type) {
      applySnapshot(self, newParams);
      saveParameters();
    }

    const saveParameters = flow(function*() {
      const jsonContent = JSON.stringify(self, null, 2);
      try {
        yield writeFilePromisified(PATHS.settingsFile, jsonContent, {
          encoding: 'utf8',
        });
        NotificationToast.showSuccess('Settings saved !');
      } catch (error) {
        NotificationToast.showError('Unable to save settings to file !');
      }
    });

    const loadParametersFromFile = flow(function*() {
      try {
        const fileExist = fs.existsSync(PATHS.settingsFile);
        if (!fileExist) {
          yield saveParameters();
        } else {
          const data = yield readFilePromisified(PATHS.settingsFile, {
            encoding: 'utf8',
          });
          const content = JSON.parse(data);
          applySnapshot(self, content);
        }
      } catch (error) {
        NotificationToast.showError(`Error while loading settings file ${error}`);
      }
    });

    return {
      saveParameters,
      loadParametersFromFile,
      setNewParameters,
    };
  });

export type ParametersType = typeof ParametersModel.Type;
