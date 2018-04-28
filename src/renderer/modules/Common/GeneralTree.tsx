import * as React from 'react';
import { ITreeNode, ITreeProps, Tree, Classes } from '@blueprintjs/core';
import { Div } from 'glamorous';

interface GeneralTreeProps<T extends TreeNodeData> extends ITreeProps {
  contents: GeneralTreeNode<T>[];
  keepNodeStateOnFilter?: boolean;
  filter: boolean;
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

  static buildDisplayContent<T extends TreeNodeData>(
    nodes: GeneralTreeNode<T>[],
    filter?: string,
    filterStopAtFirstNode?: boolean,
  ) {
    let result: GeneralTreeNode<T>[] = [];
    for (let node of nodes) {
      let children;
      if (filter) {
        if (node.nodeData.nodeText.toUpperCase().includes(filter)) {
          let childFilter = filterStopAtFirstNode ? undefined : filter;
          children = node.childNodes
            ? GeneralTree.buildDisplayContent(node.childNodes, childFilter)
            : undefined;
        } else {
          children = node.childNodes
            ? GeneralTree.buildDisplayContent(node.childNodes, filter)
            : undefined;
          if (!(children && children.length)) {
            continue;
          }
        }
      } else {
        children = node.childNodes
          ? GeneralTree.buildDisplayContent(node.childNodes, filter)
          : undefined;
      }
      result.push({ ...node, childNodes: children });
    }

    return result;
  }

  static calculateCaret(node: ITreeNode) {
    if (node.hasCaret == null) {
      node.hasCaret = node.childNodes ? node.childNodes.length > 0 : false;
    }
    if (node.childNodes) {
      node.childNodes.forEach(GeneralTree.calculateCaret);
    }
  }

  static getDerivedStateFromProps<T extends TreeNodeData>(
    nextProps: GeneralTreeProps<T>,
  ): GeneralTreeState<T> {
    nextProps.contents.forEach(GeneralTree.calculateCaret);
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
    node.isExpanded = expand;
    if (this.props.keepNodeStateOnFilter) {
      let originalNode = this.findNode(node.id, this.state.originalContents);
      if (originalNode) {
        originalNode.isExpanded = expand;
      }
    }
    this.setState(this.state);
  };

  public renderFilter = () => {
    return <div>filter</div>;
  };

  public render() {
    return (
      <Div
        css={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'stretch',
          alignContent: 'stretch',
          flex: 1,
        }}
      >
        {this.renderFilter()}
        <Div
          className={Classes.ELEVATION_2}
          css={{
            overflow: 'auto',
          }}
        >
          <Tree
            contents={this.state.displayedContents}
            onNodeExpand={(node: ITreeNode) => this.switchNodeState(node, true)}
            onNodeCollapse={(node: ITreeNode) => this.switchNodeState(node, false)}
          />
        </Div>
      </Div>
    );
  }
}
