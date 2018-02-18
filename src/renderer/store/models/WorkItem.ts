import { types } from "mobx-state-tree";
import { GetParameters } from "../utils";

export const WorkItem = types
  .model({
    id: types.identifier(),
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
