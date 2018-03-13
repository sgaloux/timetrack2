import { NonIdealState, Button } from "@blueprintjs/core";
import { inject, observer } from "mobx-react";
import React from "react";

import { ICommonStoreProps } from "../../common/ICommonStoreProps";
import { WorkItemType } from "../../store/models/WorkItem";
import ActionBar from "./ActionBar";
import WorkItem from "./WorkItem";
import DateSelector from "./DateSelector";
import glamorous from "glamorous";

const ActionContainer = glamorous.div({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
});

@inject("store")
@observer
export default class TrackerPage extends React.Component<ICommonStoreProps> {
  public render() {
    const { store } = this.props;
    return (
      <div>
        <ActionContainer>
          <DateSelector />
          <ActionBar onAdd={store!.workDay.addWorkItem} />
        </ActionContainer>
        <hr />
        {store!.workDay.noItems ? (
          <NonIdealState title="No work items today..." visual="pt-icon-cross" />
        ) : (
          store!.workDay.allItems.map((i: WorkItemType) => (
            <WorkItem key={i.id.toString()} workItem={i} />
          ))
        )}
      </div>
    );
  }
}
