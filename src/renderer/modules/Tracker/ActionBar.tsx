import { Button, ButtonGroup, Intent } from '@blueprintjs/core';
import * as React from 'react';
import glamorous from 'glamorous';

interface IActionBarProps {
  onAdd: () => void;
  onClear: () => void;
}

const Container = glamorous.div({
  display: 'flex',
  flexDirection: 'row',
});

export default class Actionbar extends React.Component<IActionBarProps> {
  public render() {
    return (
      <Container>
        <ButtonGroup>
          <Button onClick={this.props.onAdd} intent={Intent.PRIMARY} text="Add" iconName="add" />
          <Button
            onClick={this.props.onAdd}
            intent={Intent.SUCCESS}
            text="Add and start"
            iconName="play"
          />
        </ButtonGroup>
        &nbsp;
        <ButtonGroup>
          <Button
            onClick={this.props.onClear}
            intent={Intent.DANGER}
            iconName="delete"
            text="Clear"
          />
        </ButtonGroup>
      </Container>
    );
  }
}
