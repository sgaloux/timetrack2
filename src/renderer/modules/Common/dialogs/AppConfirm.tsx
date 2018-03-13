import { Button, Dialog, Intent } from "@blueprintjs/core";
import * as React from "react";
import { ICommonStoreProps } from "../../../common/ICommonStoreProps";
import { inject, observer } from "mobx-react";

@inject("store")
@observer
export default class AppConfirm extends React.Component<ICommonStoreProps> {
  public render() {
    const { store } = this.props;
    const { confirm } = store!.modalStore;
    return (
      <div>
        <Dialog
          iconName="warning-sign"
          isOpen={confirm.isOpen}
          onClose={confirm.cancel}
          title={confirm.title}
        >
          <div className="pt-dialog-body">{confirm.content}</div>
          <div className="pt-dialog-footer">
            <div className="pt-dialog-footer-actions">
              <Button text="No" onClick={confirm.cancel} />
              <Button intent={Intent.PRIMARY} onClick={confirm.confirm} text="Yes" />
            </div>
          </div>
        </Dialog>
      </div>
    );
  }
}
