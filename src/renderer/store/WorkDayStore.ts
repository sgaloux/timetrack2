import { existsSync } from 'fs';
import { applySnapshot, flow, onSnapshot, types } from 'mobx-state-tree';
import moment from 'moment';
import path from 'path';
import { WorkItem } from './models';
import { PATHS, readFilePromisified, writeFilePromisified } from '../common';
import { NotificationToast } from '../modules/Common';
import { GetModals } from './utils/utils';

export const WorkDayStore = types
  .model({
    date: types.optional(types.Date, new Date()),
    workItems: types.optional(types.array(WorkItem), []),
  })
  .views((self) => ({
    get formattedDate() {
      return moment(self.date).format('DD/MM/YY');
    },
  }))
  .views((self) => ({
    get allItems() {
      return self.workItems;
    },
    get noItems() {
      return self.workItems.length === 0;
    },
    get fileName() {
      return `${moment(self.date).format('YYYY-MM-DD')}.json`;
    },
    get fullPath() {
      return path.join(PATHS.dataPath, this.fileName);
    },
  }))
  .actions((self) => {
    const loadFromFile = flow(function* () {
      if (!existsSync(self.fullPath)) {
        yield saveToFile();
      }
      try {
        const content = yield readFilePromisified(self.fullPath, {
          encoding: 'utf8',
        });
        applySnapshot(self, JSON.parse(content));
      } catch (error) {
        NotificationToast.showError(`Unable to load file ${self.fullPath} : ${error}`);
      }
    });

    const saveToFile = flow(function* () {
      const jsonContent = JSON.stringify(self, null, 2);
      try {
        yield writeFilePromisified(self.fullPath, jsonContent, {
          encoding: 'utf8',
        });
      } catch (error) {
        NotificationToast.showError(`Unable to save workday to file : ${self.fullPath} : ${error}`);
      }
    });

    async function loadADate(newDate: Date= new Date()) {
      self.workItems.clear();
      self.date = newDate;

      await loadFromFile();
    }

    const loadDate = flow(function* (newDate: Date) {
      yield loadADate(newDate);
    });

    const loadNextDate = flow(function*() {
      yield loadADate(
        moment(self.date)
          .add(1, 'day')
          .toDate(),
      );
    });

    const loadPreviousDate = flow(function*() {
      yield loadADate(
        moment(self.date)
          .subtract(1, 'day')
          .toDate(),
      );
    });

    function addWorkItem() {
      const newItem = WorkItem.create();
      self.workItems.push(newItem);
      // noinspection JSIgnoredPromiseFromCall
      saveToFile();
    }

    function afterCreate() {
      loadDate(new Date());
      onSnapshot(self.workItems, saveToFile);
    }

    const clearTheDay = flow(function* () {
      const confirmed = yield GetModals(self).confirm.show(
        'Delete all',
        `Are you sure you want to clear the day?\n${
          self.workItems.length
          } item(s) will be deleted !`,
      );
      if (confirmed) {
        self.workItems.clear();
      }
    });

    const deleteItem = function(item: typeof WorkItem.Type) {
      self.workItems.remove(item);
      saveToFile();
    };

    return {
      loadDate,
      addWorkItem,
      afterCreate,
      loadNextDate,
      loadPreviousDate,
      deleteItem,
      clearTheDay,
    };
  });

export type WorkDayStoreType = typeof WorkDayStore.Type;
