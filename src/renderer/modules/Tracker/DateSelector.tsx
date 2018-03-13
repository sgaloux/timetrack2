import * as React from "react";
import { observer, inject } from "mobx-react";
import { ICommonStoreProps } from "../../common/ICommonStoreProps";
import { Button, Popover, Position, PopoverInteractionKind } from "@blueprintjs/core";
import glamorous from "glamorous";
import { DatePicker } from "@blueprintjs/datetime";
import moment from "moment";
import MomentLocaleUtils from "react-day-picker/moment";
import "moment/locale/fr";

const Container = glamorous.div({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
});

const DateText = glamorous.h2({
  margin: 0,
  cursor: "pointer",
});

interface IDateSelectorState {
  popoverOpened: boolean;
}

@inject("store")
@observer
export default class DateSelector extends React.Component<ICommonStoreProps, IDateSelectorState> {
  public state = {
    popoverOpened: false,
  };

  private selectDate = (date: Date, hasUserManuallySelectedDate: boolean) => {
    const { store } = this.props;
    const { workDay } = store!;
    workDay.loadDate(date);
    console.log("selectedDate - manual? " + hasUserManuallySelectedDate, date);
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

  public render() {
    const { store } = this.props;
    const { workDay } = store!;
    return (
      <Container>
        <Button
          className="pt-minimal pt-small"
          iconName="direction-left"
          onClick={workDay.loadPreviousDate}
        />&nbsp;
        <Popover
          content={
            <DatePicker
              value={workDay.date}
              onChange={this.selectDate}
              locale="fr"
              localeUtils={MomentLocaleUtils}
              showActionsBar
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
          iconName="direction-right"
          onClick={workDay.loadNextDate}
        />
      </Container>
    );
  }
}
