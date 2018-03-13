import { Button, ButtonGroup, Intent } from "@blueprintjs/core";
import * as React from "react";

interface IActionBarProps {
  onAdd: () => void;
}

export default class Actionbar extends React.Component<IActionBarProps> {
  public render() {
    return (
      <div>
        <ButtonGroup>
          <Button onClick={this.props.onAdd} intent={Intent.PRIMARY} text="Add" iconName="add" />
          <Button
            onClick={this.props.onAdd}
            intent={Intent.SUCCESS}
            text="Add and start"
            iconName="play"
          />
        </ButtonGroup>
      </div>
    );
  }
}
