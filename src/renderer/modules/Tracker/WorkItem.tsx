import * as React from 'react';
import { Button, ButtonGroup, Classes, Intent } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import { Div } from 'glamorous';
import TooltipButton from '../Common/TooltipButton';
import WorkItemEditForm from './WorkItemEditForm';
import { WorkItemType } from '../../store/models';

interface WorkItemProps {
  workItem: WorkItemType;
  onDeleteItem: (item: WorkItemType) => any;
  onInflowButtonClicked: () => any;
  onYoutrackButtonClicked: () => any;
}

export default class WorkItem extends React.Component<WorkItemProps> {
  public render() {
    const { workItem, onInflowButtonClicked, onYoutrackButtonClicked } = this.props;
    return (
      <Div
        css={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          margin: 10,
        }}
      >
        <WorkItemEditForm workItem={workItem} onSave={workItem.setValues}/>
        <Button
          text="Inflow..."
          className={Classes.MINIMAL}
          intent={Intent.PRIMARY}
          onClick={onInflowButtonClicked}
        />
        <Button
          text="Youtrack..."
          className={Classes.MINIMAL}
          intent={Intent.PRIMARY}
          onClick={onYoutrackButtonClicked}
        />
        <ButtonGroup>
          <TooltipButton
            tooltipContent="Delete work item"
            icon={IconNames.CROSS}
            intent={Intent.DANGER}
            onClick={() => this.props.onDeleteItem(workItem)}
          />
        </ButtonGroup>
      </Div>
    );
  }
}
