import { Classes, NonIdealState, Overlay } from '@blueprintjs/core';
import { inject, observer } from 'mobx-react';
import React from 'react';

import ActionBar from './ActionBar';
import WorkItem from './WorkItem';
import DateSelector from './DateSelector';
import { Div } from 'glamorous';
import { IconNames } from '@blueprintjs/icons';
import classNames from 'classnames';
import { WorkDayStoreType } from '../../store';
import { WorkItemType } from '../../store/models';
import { mapStore } from '../../store/utils';

interface TrackerPageState {
  inflowSelectorOverlayOpened: boolean;
  youtrackSelectorOverlayOpened: boolean;
}

interface TrackerPageProps {
  workDay?: WorkDayStoreType;
}

@inject(mapStore(root => ({
  workDay: root.WorkDayStore,
})))
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
          <DateSelector/>
          <ActionBar onAdd={workDay.addWorkItem} onClear={workDay.clearTheDay} clearButtonDisabled={workDay.noItems}/>
        </Div>
        <hr/>
        <Overlay
          isOpen={this.state.inflowSelectorOverlayOpened}
          className={Classes.OVERLAY_SCROLL_CONTAINER}
          transitionDuration={10}
          onClose={() => this.setState({ inflowSelectorOverlayOpened: false })}
        >
          <div className={overlayClasses}>Content</div>
        </Overlay>
        {workDay.noItems ? (
          <NonIdealState title="No work items found..." visual={IconNames.PREDICTIVE_ANALYSIS}/>
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
