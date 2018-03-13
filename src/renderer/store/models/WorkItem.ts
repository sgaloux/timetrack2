import { types } from "mobx-state-tree";
import { v4 } from "uuid";
import { GetParameters } from "../utils";

export const WorkItem = types
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

    return {
      uploadToInflow,
    };
  });
export type WorkItemType = typeof WorkItem.Type;
