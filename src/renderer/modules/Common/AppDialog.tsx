import { Button, Dialog, Intent } from "@blueprintjs/core";
import * as React from "react";

interface IAppDialogState {
  isOpen: boolean;
}

export default class AppDialog extends React.Component<{}, IAppDialogState> {
  public state = { isOpen: false };

  public render() {
    return (
      <div>
        <Dialog
          iconName="inbox"
          isOpen={this.state.isOpen}
          onClose={this.toggleDialog}
          title="Dialog header"
        >
          <div className="pt-dialog-body">Some content</div>
          <div className="pt-dialog-footer">
            <div className="pt-dialog-footer-actions">
              <Button text="Secondary" />
              <Button
                intent={Intent.PRIMARY}
                onClick={this.toggleDialog}
                text="Primary"
              />
            </div>
          </div>
        </Dialog>
      </div>
    );
  }

  private toggleDialog = () => this.setState({ isOpen: !this.state.isOpen });
}
