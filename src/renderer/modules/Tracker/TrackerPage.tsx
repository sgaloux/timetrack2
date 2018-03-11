import { NonIdealState } from "@blueprintjs/core";
import { inject, observer } from "mobx-react";
import React from "react";
import { ICommonStoreProps } from "../../common/ICommonStoreProps";
import { WorkItemType } from "../../store/models/WorkItem";
import ActionBar from "./ActionBar";
import WorkItem from "./WorkItem";

@inject("store")
@observer
export default class TrackerPage extends React.Component<ICommonStoreProps> {
  public render() {
    const { store } = this.props;
    return (
      <div>
        <h1>{store!.workDay.formattedDate}</h1>
        <ActionBar onAdd={store!.workDay.addWorkItem} />
        {store!.workDay.noItems ? (
          <NonIdealState
            title="No work items today..."
            visual="pt-icon-cross"
          />
        ) : (
          store!.workDay.allItems.map((i: WorkItemType) => (
            <WorkItem workItem={i} />
          ))
        )}
      </div>
    );
  }
}
