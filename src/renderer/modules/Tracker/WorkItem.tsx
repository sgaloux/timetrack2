import * as React from 'react';
import { Card, Elevation, ButtonGroup, Intent } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import glamorous from 'glamorous';
import TooltipButton from '../Common/TooltipButton';
import WorkItemEditForm from './WorkItemEditForm';
import { WorkItemType } from '../../store/models/WorkItemModel';

interface WorkItemProps {
  workItem: WorkItemType;
  onDeleteItem: (item: WorkItemType) => any;
}

const Container = glamorous.div({
  marginBottom: 5,
});

const CardContainerContent = glamorous.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
});

export default class WorkItem extends React.Component<WorkItemProps> {
  public render() {
    const { workItem } = this.props;
    return (
      <Container>
        <Card interactive={true} elevation={Elevation.TWO}>
          <CardContainerContent>
            <WorkItemEditForm workItem={workItem} onSave={workItem.setValues} />
            <ButtonGroup>
              <TooltipButton
                tooltipContent="Delete work item"
                icon={IconNames.CROSS}
                intent={Intent.DANGER}
                onClick={() => this.props.onDeleteItem(workItem)}
              />
            </ButtonGroup>
          </CardContainerContent>
        </Card>
      </Container>
    );
  }
}
