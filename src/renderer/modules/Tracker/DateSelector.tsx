import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { Button, Popover, PopoverInteractionKind, Position } from '@blueprintjs/core';
import { Div } from 'glamorous';
import { DatePicker } from '@blueprintjs/datetime';
// @ts-ignore
import MomentLocaleUtils from 'react-day-picker/moment';
import 'moment/locale/fr';
import { IconNames } from '@blueprintjs/icons';
import { WorkDayStoreType } from '../../store';
import { mapStore } from '../../store/utils';

interface DateSelectorState {
  popoverOpened: boolean;
}

interface DateSelectorProps {
  workDay?: WorkDayStoreType;
}

@inject(mapStore(root => ({
  workDay: root.WorkDayStore,
})))
@observer
export default class DateSelector extends React.Component<DateSelectorProps, DateSelectorState> {
  public state = {
    popoverOpened: false,
  };

  public render() {
    const workDay = this.props.workDay!;
    return (
      <Div display="flex" flexDirection="row" alignItems="center">
        <Button
          className="pt-minimal pt-small"
          icon={IconNames.DIRECTION_LEFT}
          onClick={workDay.loadPreviousDate}
        />&nbsp;
        <Popover
          content={
            <DatePicker
              value={workDay.date}
              onChange={this.selectDate}
              locale="fr"
              localeUtils={MomentLocaleUtils}
              showActionsBar={true}
            />
          }
          position={Position.BOTTOM_LEFT}
          interactionKind={PopoverInteractionKind.CLICK}
          onInteraction={(state) => this.handleInteraction(state)}
          isOpen={this.state.popoverOpened}
        >
          <Div
            css={{
              margin: 0,
              cursor: 'pointer',
            }}
          >
            {workDay.formattedDate}
          </Div>
        </Popover>
        &nbsp;
        <Button
          className="pt-minimal pt-small"
          icon={IconNames.DIRECTION_RIGHT}
          onClick={workDay.loadNextDate}
        />
      </Div>
    );
  }

  private selectDate = (date: Date, hasUserManuallySelectedDate: boolean) => {
    const workDay = this.props.workDay!;
    workDay.loadDate(date);
    console.log('selectedDate - manual? ' + hasUserManuallySelectedDate, date);
    if (hasUserManuallySelectedDate) {
      this.setState({
        popoverOpened: false,
      });
    }
  };

  private handleInteraction = (nextOpenedState: boolean) => {
    this.setState({
      popoverOpened: nextOpenedState,
    });
  };
}
