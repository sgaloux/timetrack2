import { Button, Dialog, Intent } from '@blueprintjs/core';
import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { GetRootStore } from '../../../store';
import { ModalStoreType } from '../../../store';

@inject((s) => ({
  modalStore: GetRootStore(s).ModalStore,
}))
@observer
export default class AppConfirm extends React.Component<{
  modalStore?: ModalStoreType;
}> {
  public render() {
    const { confirm } = this.props.modalStore!;
    return (
      <div>
        <Dialog
          icon="warning-sign"
          isOpen={confirm.isOpen}
          onClose={confirm.cancel}
          title={confirm.title}
        >
          <div className="pt-dialog-body" style={{ textAlign: 'center' }}>
            {confirm.content.split('\n').map((s, index) => <div key={index}>{s}</div>)}
          </div>
          <div className="pt-dialog-footer">
            <div className="pt-dialog-footer-actions">
              <Button text="No" onClick={confirm.cancel} className="pt-fill" />
              <Button
                intent={Intent.PRIMARY}
                onClick={confirm.confirm}
                text="Yes"
                className="pt-fill"
              />
            </div>
          </div>
        </Dialog>
      </div>
    );
  }
}
