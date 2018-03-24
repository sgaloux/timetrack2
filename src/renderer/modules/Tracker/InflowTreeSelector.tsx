import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { CommonStoreProps } from '../../common/CommonStoreProps';
import { Tree, ITreeNode, Classes } from '@blueprintjs/core';
import { InflowNodeTreeType } from '../../store/models/InflowStore';
import glamorous from 'glamorous';

interface InflowTreeSelectorState {
  nodes: ITreeNode[];
}

@inject('store')
@observer
export default class InflowTreeSelector extends React.Component<
  CommonStoreProps,
  InflowTreeSelectorState
> {
  public constructor(props: CommonStoreProps) {
    super(props);
    const store = props.store!;
    const tree = store.inflowStore.inflowTree;
    this.state = {
      nodes: this.getNodes(tree),
    };
  }

  public render() {
    const Container = glamorous.div({
      maxHeight: '50vh',
      overflow: 'auto',
    });
    return (
      <Container>
        <Tree
          contents={this.state.nodes}
          onNodeClick={this.handleNodeClick}
          onNodeCollapse={this.handleNodeCollapse}
          onNodeExpand={this.handleNodeExpand}
          className={Classes.ELEVATION_0}
        />
      </Container>
    );
  }

  private getNodes(tree: InflowNodeTreeType[]): ITreeNode[] {
    return tree.map((el) => {
      const node: ITreeNode = {
        label: el.name,
        id: el.inflowId,
        iconName: 'box',
      };
      if (el.children.length > 0) {
        node.hasCaret = true;
        node.childNodes = this.getNodes(el.children);
      }
      return node;
    });
  }

  private handleNodeClick = (
    nodeData: ITreeNode,
    _nodePath: number[],
    e: React.MouseEvent<HTMLElement>,
  ) => {
    const originallySelected = nodeData.isSelected;
    if (!e.shiftKey) {
      this.forEachNode(this.state.nodes, (n) => (n.isSelected = false));
    }
    nodeData.isSelected = originallySelected == null ? true : !originallySelected;
    this.setState(this.state);
  };

  private handleNodeCollapse = (nodeData: ITreeNode) => {
    nodeData.isExpanded = false;
    this.setState(this.state);
  };

  private handleNodeExpand = (nodeData: ITreeNode) => {
    nodeData.isExpanded = true;
    this.setState(this.state);
  };

  private forEachNode(nodes: ITreeNode[], callback: (node: ITreeNode) => void) {
    if (nodes == null) {
      return;
    }

    for (const node of nodes) {
      callback(node);
      this.forEachNode(node.childNodes!, callback);
    }
  }
}
