import * as React from 'react';
import { Classes, ITreeNode, Tree } from '@blueprintjs/core';
import { Div } from 'glamorous';
import { IconNames } from '@blueprintjs/icons';
import { InflowNodeTreeType, InflowStoreType } from '../../store';

interface InflowTreeSelectorState {
  nodes: ITreeNode[];
}

interface InflowTreeSelectorProps {
  inflowStore?: InflowStoreType;
}

export class InflowTreeSelector extends React.Component<InflowTreeSelectorProps, InflowTreeSelectorState> {
  public constructor(props: InflowTreeSelectorProps) {
    super(props);
    const tree = this.props.inflowStore!.inflowTree;
    console.time('tree');
    this.state = {
      nodes: this.getNodes(tree),
    };
    console.timeEnd('tree');
  }

  public render() {
    return (
      <Div
        css={{
          maxHeight: '50vh',
          overflow: 'auto',
        }}
      >
        <Tree
          contents={this.state.nodes}
          onNodeClick={this.handleNodeClick}
          onNodeCollapse={this.handleNodeCollapse}
          onNodeExpand={this.handleNodeExpand}
          className={Classes.ELEVATION_0}
        />
      </Div>
    );
  }

  private getNodes(tree: InflowNodeTreeType[]): ITreeNode[] {
    return tree.map((el) => {
      const node: ITreeNode = {
        label: el.name,
        id: el.inflowId,
        icon: IconNames.BOX,
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
