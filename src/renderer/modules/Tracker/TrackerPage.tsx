import { NonIdealState, Overlay, Classes } from '@blueprintjs/core';
import { inject, observer } from 'mobx-react';
import React from 'react';

import ActionBar from './ActionBar';
import WorkItem from './WorkItem';
import DateSelector from './DateSelector';
import { Div } from 'glamorous';
import { WorkItemType } from '../../store/models/WorkItemModel';
import { IconNames } from '@blueprintjs/icons';
import classNames from 'classnames';
import { GetRootStore } from '../../store/utils';
import { WorkDayStoreType } from '../../store/models/WorkDayStore';

interface TrackerPageState {
  inflowSelectorOverlayOpened: boolean;
  youtrackSelectorOverlayOpened: boolean;
}

interface TrackerPageProps {
  workDay?: WorkDayStoreType;
}
@inject((s) => ({
  workDay: GetRootStore(s).WorkDayStore,
}))
@observer
export default class TrackerPage extends React.Component<TrackerPageProps, TrackerPageState> {
  public state = {
    inflowSelectorOverlayOpened: false,
    youtrackSelectorOverlayOpened: false,
  };

  public render() {
    const workDay = this.props.workDay!;
    const overlayClasses = classNames(Classes.CARD, Classes.ELEVATION_4, 'animationPane');

    return (
      <div>
        <Div
          css={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <DateSelector />
          <ActionBar onAdd={workDay.addWorkItem} onClear={workDay.clearTheDay} />
        </Div>
        <hr />
        <Overlay
          isOpen={this.state.inflowSelectorOverlayOpened}
          className={Classes.OVERLAY_SCROLL_CONTAINER}
          transitionDuration={10}
          onClose={() => this.setState({ inflowSelectorOverlayOpened: false })}
        >
          <div className={overlayClasses}>Content</div>
        </Overlay>
        {workDay.noItems ? (
          <NonIdealState title="No work items found..." visual={IconNames.PREDICTIVE_ANALYSIS} />
        ) : (
          workDay.allItems.map((i: WorkItemType) => (
            <WorkItem
              key={i.id.toString()}
              workItem={i}
              onDeleteItem={workDay.deleteItem}
              onInflowButtonClicked={this.showInflowSelector}
            />
          ))
        )}
      </div>
    );
  }
  private showInflowSelector = () => {
    this.setState({
      inflowSelectorOverlayOpened: true,
    });
  };
}
