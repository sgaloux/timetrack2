import * as React from 'react';
import { Tree, Classes, ITreeNode } from '@blueprintjs/core';
import { InflowNodeTreeType } from '../../../store';

interface InflowTreeProps {
  data: InflowNodeTreeType[];
}

interface InflowTreeState {
  nodes: ITreeNode[];
}

function getNodes(tree: InflowNodeTreeType[]): ITreeNode[] {
  return tree.map((el) => {
    const node: ITreeNode = {
      label: el.name,
      id: el.inflowId,
    };
    if (el.children.length > 0) {
      node.hasCaret = true;
      node.childNodes = getNodes(el.children);
    }
    return node;
  });
}

export default class InflowTree extends React.Component<InflowTreeProps, InflowTreeState> {
  public state = {
    nodes: [],
  };

  static getDerivedStateFromProps(nextProps: InflowTreeProps): InflowTreeState {
    return {
      nodes: getNodes(nextProps.data),
    };
  }

  public render() {
    return (
      <Tree
        contents={this.state.nodes}
        onNodeClick={this.handleNodeClick}
        onNodeCollapse={this.handleNodeCollapse}
        onNodeExpand={this.handleNodeExpand}
        className={Classes.ELEVATION_0}
      />
    );
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
