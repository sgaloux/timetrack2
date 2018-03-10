import { existsSync, readFile } from 'fs';
import { types } from 'mobx-state-tree';
import moment from 'moment';
import path from 'path';
import { NotificationToast } from '../../modules/Common';
import { WorkItem } from './WorkItem';
import { PATHS } from '../../common/utils';

const WorkDayShape = types.model({
  date: types.optional(types.Date, new Date()),
  workItems: types.optional(types.map(WorkItem), {}),
});
export type WorkDayType = typeof WorkDayShape.Type;

export const WorkDay = WorkDayShape.views((self) => ({
  get formattedDate() {
    return moment(self.date).format('DD/MM/YY');
  },
})).actions((self) => {
  function loadFile() {
    const fileName = moment(self.date).format('YYYY-MM-DD') + '.json';
    const fullPath = path.join(PATHS.dataPath, fileName);
    if (existsSync(fullPath)) {
      readFile(fullPath, { encoding: 'utf8' }, (err, data) => {
        if (!err) {
          const content = JSON.parse(data);
          console.log('CONTENT', content);
        } else {
          console.error('Unable to load settings file ' + fileName, err);
          NotificationToast.showSuccess('Unable to load data file ' + fileName);
        }
      });
    }
  }

  function loadDate(newDate: Date = new Date()) {
    // read from disk
    self.date = newDate;
    loadFile();
  }

  return {
    loadDate,
  };
});
