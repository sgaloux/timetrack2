import { Button, ButtonGroup, Intent } from '@blueprintjs/core';
import * as React from 'react';
import { Div } from 'glamorous';
import { IconNames } from '@blueprintjs/icons';
import { observer } from 'mobx-react';

interface ActionBarProps {
  onAdd: () => void;
  onClear: () => void;
  clearButtonDisabled: boolean;
}

@observer
export default class Actionbar extends React.Component<ActionBarProps> {
  public render() {
    return (
      <Div display="flex" flexDirection="row">
        <ButtonGroup>
          <Button
            onClick={this.props.onAdd}
            intent={Intent.PRIMARY}
            text="Add"
            icon={IconNames.ADD}
          />
          <Button
            onClick={this.props.onAdd}
            intent={Intent.SUCCESS}
            text="Add and start"
            icon={IconNames.PLAY}
          />
        </ButtonGroup>
        &nbsp;
        <ButtonGroup>
          <Button
            disabled={this.props.clearButtonDisabled}
            onClick={this.props.onClear}
            intent={Intent.DANGER}
            icon={IconNames.DELETE}
            text="Clear"
          />
        </ButtonGroup>
      </Div>
    );
  }
}
