import { NonIdealState } from '@blueprintjs/core';
import { inject, observer } from 'mobx-react';
import React from 'react';

import { CommonStoreProps } from '../../common/CommonStoreProps';
import ActionBar from './ActionBar';
import WorkItem from './WorkItem';
import DateSelector from './DateSelector';
import glamorous from 'glamorous';
import { WorkItemType } from '../../store/models/WorkItemModel';
import { IconNames } from '@blueprintjs/icons';

const ActionContainer = glamorous.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
});

@inject('store')
@observer
export default class TrackerPage extends React.Component<CommonStoreProps> {
  public render() {
    const { store } = this.props;
    return (
      <div>
        <ActionContainer>
          <DateSelector />
          <ActionBar onAdd={store!.workDay.addWorkItem} onClear={store!.workDay.clearTheDay} />
        </ActionContainer>
        <hr />
        {store!.workDay.noItems ? (
          <NonIdealState title="No work items found..." visual={IconNames.PREDICTIVE_ANALYSIS} />
        ) : (
          store!.workDay.allItems.map((i: WorkItemType) => (
            <WorkItem key={i.id.toString()} workItem={i} onDeleteItem={store!.workDay.deleteItem} />
          ))
        )}
      </div>
    );
  }
}
