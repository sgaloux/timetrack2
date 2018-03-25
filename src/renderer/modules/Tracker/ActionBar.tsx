import { Button, ButtonGroup, Intent } from '@blueprintjs/core';
import * as React from 'react';
import glamorous from 'glamorous';
import { IconNames } from '@blueprintjs/icons';

interface ActionBarProps {
  onAdd: () => void;
  onClear: () => void;
}

const Container = glamorous.div({
  display: 'flex',
  flexDirection: 'row',
});

export default class Actionbar extends React.Component<ActionBarProps> {
  public render() {
    return (
      <Container>
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
            onClick={this.props.onClear}
            intent={Intent.DANGER}
            icon={IconNames.DELETE}
            text="Clear"
          />
        </ButtonGroup>
      </Container>
    );
  }
}
