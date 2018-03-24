import { inject, observer } from 'mobx-react';
import React, { Component, Fragment } from 'react';
import { CommonStoreProps } from '../../common/ICommonStoreProps';
import SettingsForm from './SettingsForm';

@inject('store')
@observer
class SettingsPage extends Component<CommonStoreProps> {
  public render() {
    const { store } = this.props;
    return (
      <Fragment>
        <h1>Settings</h1>
        <SettingsForm
          settings={store!.parameters}
          onSubmit={store!.parameters.setNewParameters}
        />
      </Fragment>
    );
  }
}

export default SettingsPage;
