import { existsSync, readFile } from "fs";
import { applySnapshot, flow, onSnapshot, types } from "mobx-state-tree";
import moment from "moment";
import path from "path";
import {
  PATHS,
  readFilePromisified,
  writeFilePromisified,
} from "../../common/utils";
import { NotificationToast } from "../../modules/Common";
import { WorkItem } from "./WorkItem";

const WorkDayShape = types.model({
  date: types.optional(types.Date, new Date()),
  workItems: types.optional(types.array(WorkItem), []),
});
export type WorkDayType = typeof WorkDayShape.Type;

export const WorkDay = WorkDayShape.views((self) => ({
  get formattedDate() {
    return moment(self.date).format("DD/MM/YY");
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
      return `${moment(self.date).format("YYYY-MM-DD")}.json`;
    },
    get fullPath() {
      return path.join(PATHS.dataPath, this.fileName);
    },
  }))
  .actions((self) => {
    const loadFromFile = flow(function*() {
      if (!existsSync(self.fullPath)) {
        yield saveToFile();
      }
      try {
        const content = yield readFilePromisified(self.fullPath, {
          encoding: "utf8",
        });
        applySnapshot(self, JSON.parse(content));
      } catch (error) {
        NotificationToast.showError(
          `Unable to load file ${self.fullPath} : ${error}`
        );
      }
    });

    const saveToFile = flow(function*() {
      const jsonContent = JSON.stringify(self, null, 2);
      try {
        yield writeFilePromisified(self.fullPath, jsonContent, {
          encoding: "utf8",
        });
      } catch (error) {
        NotificationToast.showError(
          `Unable to save workday to file : ${self.fullPath} : ${error}`
        );
      }
    });

    function loadDate(newDate: Date = new Date()) {
      // read from disk
      self.date = newDate;
      loadFromFile();
    }

    function addWorkItem() {
      const newItem = WorkItem.create();
      self.workItems.push(newItem);
    }

    function afterAttach() {
      console.log(`After attach WorkDay ${self.formattedDate}`);
      onSnapshot(self, saveToFile);
    }

    function afterCreate() {
      loadDate();
    }

    return {
      loadDate,
      addWorkItem,
      afterAttach,
      afterCreate,
    };
  });
