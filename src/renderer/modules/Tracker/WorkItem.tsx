import * as React from 'react';
import { WorkItemType } from '../../store/models/WorkItem';

interface IWorkItemProps {
  workItem: WorkItemType;
}

export default class WorkItem extends React.Component<IWorkItemProps> {
  public render() {
    const {workItem} = this.props;
    return (
      <div>
        {workItem.id}
      </div>
    );
  }
}
