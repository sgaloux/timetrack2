import { existsSync } from 'fs';
import { applySnapshot, flow, types } from 'mobx-state-tree';
import { unflatten } from 'un-flatten-tree';
import { getInflowTree, getInflowTypes } from '../services/inflowService';
import { GetParameters } from './utils/utils';
import { PATHS, readFilePromisified, writeFilePromisified } from '../common';
import { NotificationToast } from '../modules/Common';
import { InflowNode, InflowNodeType, InflowActivity } from './models';

export interface InflowNodeTreeType extends InflowNodeType {
  children: InflowNodeTreeType[];
}

export const InflowStore = types
  .model({
    inflowActivities: types.optional(types.array(InflowActivity), []),
    inflowNodes: types.optional(types.array(InflowNode), []),
    nodeSearchTerm: types.optional(types.string, ''),
  })
  .views((self) => {
    return {
      get inflowTree() {
        console.log('getting tree...');
        const nodes = self.inflowNodes
          .filter((node: InflowNodeType) => node.name.toLowerCase().includes(self.nodeSearchTerm.toLowerCase()))
          .map((node: InflowNodeType) => ({
            ...node,
            children: [],
          })) as InflowNodeTreeType[];
        return unflatten(
          nodes,
          (node, parentNode) => node.parentId === parentNode.inflowId,
          (node, parentNode) => parentNode.children.push(node),
        );
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
          console.time('Reading nodes file');
          const content = yield readFilePromisified(PATHS.inflowNodesFile, {
            encoding: 'utf8',
          });

          console.timeEnd('Reading nodes file');

          console.time('parseJson');
          const newLocal = JSON.parse(content);
          console.timeEnd('parseJson');
          console.time('node snapshot');
          applySnapshot(self.inflowNodes, newLocal);
          console.timeEnd('node snapshot');
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

    return {
      loadInflowTypesFromServer,
      loadInflowNodesFromServer,
      saveInflowTypesToFile,
      saveInflowNodesToFile,
      tryToLoadTypes,
      tryToLoadNodes,
      searchNodes,
    };
  });

export type InflowStoreType = typeof InflowStore.Type;
