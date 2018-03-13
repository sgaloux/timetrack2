import * as React from "react";
import { WorkItemType } from "../../store/models/WorkItem";
import { Card, Elevation, ButtonGroup, Button, Intent, Tooltip, Position } from "@blueprintjs/core";
import glamorous from "glamorous";

interface IWorkItemProps {
  workItem: WorkItemType;
  onDeleteItem: (item: WorkItemType) => any;
}

const Container = glamorous.div({
  marginBottom: 5,
});

const CardContainerContent = glamorous.div({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
});

export default class WorkItem extends React.Component<IWorkItemProps> {
  public render() {
    const { workItem } = this.props;
    return (
      <Container>
        <Card interactive elevation={Elevation.TWO}>
          <CardContainerContent>
            <div>{workItem.id}</div>
            <ButtonGroup>
              <Tooltip content="Delete work item" position={Position.TOP_RIGHT}>
                <Button
                  iconName="cross"
                  intent={Intent.DANGER}
                  onClick={() => this.props.onDeleteItem(workItem)}
                />
              </Tooltip>
            </ButtonGroup>
          </CardContainerContent>
        </Card>
      </Container>
    );
  }
}
