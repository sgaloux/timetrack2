import { inject, observer } from "mobx-react";
import React, { Component, Fragment } from "react";
import { ICommonStoreProps } from "../../common/ICommonStoreProps";
import SettingsForm from "./SettingsForm";

@inject("store")
@observer
class SettingsPage extends Component<ICommonStoreProps> {
  public render() {
    const { store } = this.props;
    return (
      <Fragment>
        <h1>Settings</h1>
        <SettingsForm
          settings={store!.parameters.allValues}
          onSubmit={store!.parameters.setNewParameters}
        />
      </Fragment>
    );
  }
}

export default SettingsPage;
