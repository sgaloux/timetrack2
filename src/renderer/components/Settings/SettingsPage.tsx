import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import { ICommonStoreProps } from '../../common/ICommonStoreProps';
import ParametersForm from './ParametersForm';

@inject('store')
@observer
class SettingsPage extends Component<ICommonStoreProps> {
  public render() {
    const { store } = this.props;
    return (
      <ParametersForm settings={store!.parameters.allValues} onSubmit={store!.parameters.setNewParameters} />
    );
  }
}

export default SettingsPage;
