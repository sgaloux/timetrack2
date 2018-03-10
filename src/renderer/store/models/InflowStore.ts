import { types, flow } from 'mobx-state-tree';
import { unflatten } from 'un-flatten-tree';
import { GetParameters } from '../utils';
import { NotificationToast } from '../../modules/Common';
import { getInflowTypes, getInflowTree } from '../../services/inflowService';
import { writeFilePromisified, PATHS } from '../../common/utils';

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
      const nodes = <InflowNodeTreeType[]>self.inflowNodes.map((node: InflowNodeType) => ({
        ...node,
        children: [],
      }));
      const tree = unflatten(
        nodes,
        (node, parentNode) => node.parentId === parentNode.inflowId,
        (node, parentNode) => parentNode.children.push(node),
      );
      return tree;
    },
  }))
  .actions((self) => {
    const loadInflowTypes = flow(function*() {
      const types = yield getInflowTypes(GetParameters(self));
      self.inflowTypes = types;
    });

    const loadInflowTree = flow(function*() {
      const nodes = yield getInflowTree(GetParameters(self));
      self.inflowNodes = nodes;
    });

    const saveInflowTypesToFile = flow(function*(){
      try{
        const typesContent = JSON.stringify(self.inflowTypes,null,2);
        yield writeFilePromisified(PATHS.inflowTypesFile, typesContent, {encoding: 'utf8'})
      }catch(error){
        NotificationToast.showError('Error while saving inflow types file' + error);
      }
    })

    const saveInflowNodesToFile = flow(function*(){
      try{
        const typesContent = JSON.stringify(self.inflowNodes,null,2);
        yield writeFilePromisified(PATHS.inflowNodesFile, typesContent, {encoding: 'utf8'})
      }catch(error){
        NotificationToast.showError('Error while saving inflow nodes file' + error);
      }
    })

    return { loadInflowTypes, loadInflowTree, saveInflowTypesToFile,saveInflowNodesToFile };
  });
