import { types, applySnapshot } from "mobx-state-tree";
import { v4 } from "uuid";
import { GetParameters } from "../utils";

export const WorkItemModel = types
  .model({
    id: types.optional(types.identifier(), () => v4()),
    title: "",
    durationInSeconds: 0,
  })
  .actions((self) => {
    function uploadToInflow() {
      const params = GetParameters(self);
      console.log(params.inflowUrl);
    }

    function setValues(newValues: WorkItemType) {
      applySnapshot(self, newValues);
    }

    return {
      uploadToInflow,
      setValues,
    };
  });
export type WorkItemType = typeof WorkItemModel.Type;
