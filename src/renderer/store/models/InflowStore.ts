import { existsSync } from "fs";
import { applySnapshot, flow, types } from "mobx-state-tree";
import { unflatten } from "un-flatten-tree";
import { PATHS, readFilePromisified, writeFilePromisified } from "../../common/utils";
import { NotificationToast } from "../../modules/Common";
import { getInflowTree, getInflowTypes } from "../../services/inflowService";
import { GetParameters } from "../utils";

const InflowType = types.model({
  id: types.string,
  name: types.string,
});

const InflowNode = types.model({
  name: types.string,
  inflowId: types.string,
  parentId: types.maybe(types.string),
});

type InflowNodeType = typeof InflowNode.Type;

interface InflowNodeTreeType extends InflowNodeType {
  children: InflowNodeTreeType[];
}

export const InflowStore = types
  .model({
    inflowTypes: types.optional(types.array(InflowType), []),
    inflowNodes: types.optional(types.array(InflowNode), []),
  })
  .views((self) => ({
    get inflowTree() {
      const nodes = self.inflowNodes.map((node: InflowNodeType) => ({
        ...node,
        children: [],
      })) as InflowNodeTreeType[];
      const tree = unflatten(
        nodes,
        (node, parentNode) => node.parentId === parentNode.inflowId,
        (node, parentNode) => parentNode.children.push(node),
      );
      return tree;
    },
  }))
  .actions((self) => {
    const loadInflowTypesFromServer = flow(function*() {
      self.inflowTypes = yield getInflowTypes(GetParameters(self));
    });

    const loadInflowNodesFromServer = flow(function*() {
      self.inflowNodes = yield getInflowTree(GetParameters(self));
    });

    const tryToLoadTypes = flow(function*() {
      if (existsSync(PATHS.inflowTypesFile)) {
        try {
          const content = yield readFilePromisified(PATHS.inflowTypesFile, {
            encoding: "utf8",
          });
          applySnapshot(self.inflowTypes, JSON.parse(content));
        } catch (error) {
          NotificationToast.showError(`Unable to load inflow types from file ${error}`);
        }
      } else {
        yield loadInflowTypesFromServer();
        yield saveInflowTypesToFile();
      }
    });

    const tryToLoadNodes = flow(function*() {
      if (existsSync(PATHS.inflowNodesFile)) {
        try {
          const content = yield readFilePromisified(PATHS.inflowNodesFile, {
            encoding: "utf8",
          });
          applySnapshot(self.inflowNodes, JSON.parse(content));
        } catch (error) {
          NotificationToast.showError(`Unable to load inflow nodes from file ${error}`);
        }
      } else {
        yield loadInflowNodesFromServer();
        yield saveInflowNodesToFile();
      }
    });

    const saveInflowTypesToFile = flow(function*() {
      try {
        const typesContent = JSON.stringify(self.inflowTypes, null, 2);
        yield writeFilePromisified(PATHS.inflowTypesFile, typesContent, {
          encoding: "utf8",
        });
      } catch (error) {
        NotificationToast.showError(`Error while saving inflow types file ${error}`);
      }
    });

    const saveInflowNodesToFile = flow(function*() {
      try {
        const typesContent = JSON.stringify(self.inflowNodes, null, 2);
        yield writeFilePromisified(PATHS.inflowNodesFile, typesContent, {
          encoding: "utf8",
        });
      } catch (error) {
        NotificationToast.showError(`Error while saving inflow nodes file : ${error}`);
      }
    });

    return {
      loadInflowTypesFromServer,
      loadInflowNodesFromServer,
      saveInflowTypesToFile,
      saveInflowNodesToFile,
      tryToLoadTypes,
      tryToLoadNodes,
    };
  });
