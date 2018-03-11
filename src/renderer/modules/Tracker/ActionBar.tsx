import { Button } from "@blueprintjs/core";
import * as React from "react";

interface IActionBarProps {
  onAdd: () => void;
}

export default class Actionbar extends React.Component<IActionBarProps> {
  public render() {
    return (
      <div>
        <Button onClick={this.props.onAdd}>Add</Button>
      </div>
    );
  }
}
