import * as React from 'react';
import { Card, Elevation, ButtonGroup, Intent, Button, Classes } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import { Div } from 'glamorous';
import TooltipButton from '../Common/TooltipButton';
import WorkItemEditForm from './WorkItemEditForm';
import { WorkItemType } from '../../store/models';

interface WorkItemProps {
  workItem: WorkItemType;
  onDeleteItem: (item: WorkItemType) => any;
  onInflowButtonClicked: () => any;
}

export default class WorkItem extends React.Component<WorkItemProps> {
  public render() {
    const { workItem, onInflowButtonClicked } = this.props;
    return (
      <Div marginBottom={5}>
        <Card interactive={true} elevation={Elevation.TWO}>
          <Div
            css={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <WorkItemEditForm workItem={workItem} onSave={workItem.setValues} />
            <Button
              text="Inflow..."
              className={Classes.MINIMAL}
              intent={Intent.PRIMARY}
              onClick={onInflowButtonClicked}
            />
            <Button text="Youtrack..." className={Classes.MINIMAL} intent={Intent.PRIMARY} />
            <ButtonGroup>
              <TooltipButton
                tooltipContent="Delete work item"
                icon={IconNames.CROSS}
                intent={Intent.DANGER}
                onClick={() => this.props.onDeleteItem(workItem)}
              />
            </ButtonGroup>
          </Div>
        </Card>
      </Div>
    );
  }
}
