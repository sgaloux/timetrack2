import * as React from 'react';
import { Div } from 'glamorous';
import { InflowStoreType, InflowNodeTreeType } from '../../../store';
import { inject, observer } from 'mobx-react';
import { mapStore } from '../../../store/utils';
import GeneralTree, { GeneralTreeNode, TreeNodeData } from '../../Common/GeneralTree';

interface InflowTreeSelectorProps {
  inflowStore?: InflowStoreType;
}
@inject(
  mapStore((root) => ({
    inflowStore: root.InflowStore,
  })),
)
@observer
export default class InflowTreeSelector extends React.Component<InflowTreeSelectorProps> {
  public render() {
    console.log('render');
    return (
      <Div
        css={{
          maxHeight: '80%',
          overflow: 'auto',
        }}
      >
        <GeneralTree contents={this.buildNodes(this.props.inflowStore!.inflowTree)} filter={true} />
        {/* <InflowTree data={this.props.inflowStore!.inflowTree} /> */}
      </Div>
    );
  }

  private buildNodes = (nodes: InflowNodeTreeType[]): GeneralTreeNode<TreeNodeData>[] => {
    return nodes.map((n) => {
      return {
        childNodes: this.buildNodes(n.children),
        id: n.inflowId,
        label: n.name,
        isExpanded: false,
        nodeData: {
          nodeText: n.name,
        },
      };
    });
  };
}
