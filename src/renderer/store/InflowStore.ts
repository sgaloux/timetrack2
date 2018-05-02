import { existsSync } from 'fs';
import { applySnapshot, flow, types, onSnapshot } from 'mobx-state-tree';
import { getInflowTree, getInflowTypes } from '../services/inflowService';
import { GetParameters } from './utils/utils';
import { PATHS, readFilePromisified, writeFilePromisified } from '../common';
import { NotificationToast } from '../modules/Common';
import { InflowNode, InflowActivity, InflowNodeType } from './models';

export const InflowStore = types
  .model({
    inflowActivities: types.optional(types.array(InflowActivity), []),
    inflowNodes: types.optional(types.array(InflowNode), []),
    nodeSearchTerm: types.optional(types.string, ''),
  })
  .volatile(() => {
    let mapOfChildItems: { [key: string]: InflowNodeType[] } = {};
    return {
      mapOfChildItems,
    };
  })
  .views((self) => {
    return {
      get inflowTree() {
        return self.inflowNodes.filter((node) => node.parentId === null);
      },
      childNodesForParent(nodeId: string | null): InflowNodeType[] {
        if (nodeId == null) {
          return [];
        } else {
          const data = self.mapOfChildItems[nodeId];
          if (data) {
            return data;
          } else {
            return [];
          }
        }
      },
    };
  })
  .actions((self) => {
    const loadInflowTypesFromServer = flow(function*() {
      self.inflowActivities = yield getInflowTypes(GetParameters(self));
    });

    const loadInflowNodesFromServer = flow(function*() {
      self.inflowNodes = yield getInflowTree(GetParameters(self));
    });

    const tryToLoadTypes = flow(function*() {
      if (existsSync(PATHS.inflowTypesFile)) {
        try {
          const content = yield readFilePromisified(PATHS.inflowTypesFile, {
            encoding: 'utf8',
          });
          applySnapshot(self.inflowActivities, JSON.parse(content));
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
            encoding: 'utf8',
          });
          const newLocal = JSON.parse(content);
          applySnapshot(self.inflowNodes, newLocal);
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
        const typesContent = JSON.stringify(self.inflowActivities, null, 2);
        yield writeFilePromisified(PATHS.inflowTypesFile, typesContent, {
          encoding: 'utf8',
        });
      } catch (error) {
        NotificationToast.showError(`Error while saving inflow types file ${error}`);
      }
    });

    const saveInflowNodesToFile = flow(function*() {
      try {
        const typesContent = JSON.stringify(self.inflowNodes, null, 2);
        yield writeFilePromisified(PATHS.inflowNodesFile, typesContent, {
          encoding: 'utf8',
        });
      } catch (error) {
        NotificationToast.showError(`Error while saving inflow nodes file : ${error}`);
      }
    });

    const searchNodes = (searchterm: string) => {
      self.nodeSearchTerm = searchterm;
    };

    const afterCreate = () => {
      onSnapshot(self.inflowNodes, () => {
        self.mapOfChildItems = self.inflowNodes.reduce((acc: any, current) => {
          if (current.parentId !== null) {
            if (acc[current.parentId!] === undefined) {
              acc[current.parentId!] = [];
            }
            acc[current.parentId!].push(current);
          }
          return acc;
        }, {});
      });
    };

    return {
      loadInflowTypesFromServer,
      loadInflowNodesFromServer,
      saveInflowTypesToFile,
      saveInflowNodesToFile,
      tryToLoadTypes,
      tryToLoadNodes,
      searchNodes,
      afterCreate,
    };
  });

export type InflowStoreType = typeof InflowStore.Type;
