import * as React from 'react';
import { ITreeNode, ITreeProps, Tree } from '@blueprintjs/core';
import { Div } from 'glamorous';

interface GeneralTreeProps<T extends TreeNodeData> extends ITreeProps {
  contents: GeneralTreeNode<T>[];
  keepNodeStateOnFilter?: boolean;
}

interface GeneralTreeState<T extends TreeNodeData> {
  originalContents: GeneralTreeNode<T>[];
  displayedContents: GeneralTreeNode<T>[];
  filterText?: string;
}

export interface TreeNodeData {
  nodeText: string;
}

export interface GeneralTreeNode<T extends TreeNodeData> extends ITreeNode {
  nodeData: T;
  childNodes?: GeneralTreeNode<T>[];
}

export default class GeneralTree<T extends TreeNodeData> extends React.Component<
  GeneralTreeProps<T>,
  GeneralTreeState<T>
> {
  public static defaultProps = {
    keepNodeStateOnFilter: true,
  };

  public state = {
    originalContents: [],
    displayedContents: [],
  };

  static buildDisplayContent<T extends TreeNodeData>(nodes: GeneralTreeNode<T>[], filter?: string) {
    let result: GeneralTreeNode<T>[] = [];
    for (let node of nodes) {
      let children = node.childNodes
        ? GeneralTree.buildDisplayContent(node.childNodes, filter)
        : undefined;
      if (
        !filter ||
        node.nodeData.nodeText.toUpperCase().includes(filter) ||
        (children && children.length)
      ) {
        result.push({ ...node, childNodes: children });
      }
    }

    return result;
  }

  static getDerivedStateFromProps<T extends TreeNodeData>(
    nextProps: GeneralTreeProps<T>,
  ): GeneralTreeState<T> {
    return {
      originalContents: nextProps.contents,
      displayedContents: GeneralTree.buildDisplayContent(nextProps.contents, ''),
    };
  }

  public findNode = (
    id: string | number,
    nodes: GeneralTreeNode<T>[],
  ): GeneralTreeNode<T> | null => {
    for (let node of nodes) {
      if (node.id === id) {
        return node;
      }
      if (node.childNodes) {
        let child = this.findNode(id, node.childNodes);
        if (child) {
          return child;
        }
      }
    }
    return null;
  };

  public switchNodeState = (node: ITreeNode, expand: boolean) => {
    node.isExpanded = true;
    if (this.props.keepNodeStateOnFilter) {
      let originalNode = this.findNode(node.id, this.state.originalContents);
      if (originalNode) {
        originalNode.isExpanded = expand;
      }
    }
    this.setState(this.state);
  };

  public render() {
    return (
      <Div>
        <Tree
          contents={this.state.displayedContents}
          onNodeExpand={(node: ITreeNode) => this.switchNodeState(node, true)}
          onNodeCollapse={(node: ITreeNode) => this.switchNodeState(node, false)}
        />
      </Div>
    );
  }
}
