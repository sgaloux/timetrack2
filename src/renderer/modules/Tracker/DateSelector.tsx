import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { CommonStoreProps } from '../../common/CommonStoreProps';
import { Button, Popover, Position, PopoverInteractionKind } from '@blueprintjs/core';
import glamorous from 'glamorous';
import { DatePicker } from '@blueprintjs/datetime';
// @ts-ignore
import MomentLocaleUtils from 'react-day-picker/moment';
import 'moment/locale/fr';
import { IconNames } from '@blueprintjs/icons';

const Container = glamorous.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
});

const DateText = glamorous.h2({
  margin: 0,
  cursor: 'pointer',
});

interface DateSelectorState {
  popoverOpened: boolean;
}

@inject('store')
@observer
export default class DateSelector extends React.Component<CommonStoreProps, DateSelectorState> {
  public state = {
    popoverOpened: false,
  };

  public render() {
    const { store } = this.props;
    const { workDay } = store!;
    return (
      <Container>
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
          <DateText>{workDay.formattedDate}</DateText>
        </Popover>
        &nbsp;
        <Button
          className="pt-minimal pt-small"
          icon={IconNames.DIRECTION_RIGHT}
          onClick={workDay.loadNextDate}
        />
      </Container>
    );
  }

  private selectDate = (date: Date, hasUserManuallySelectedDate: boolean) => {
    const { store } = this.props;
    const { workDay } = store!;
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
