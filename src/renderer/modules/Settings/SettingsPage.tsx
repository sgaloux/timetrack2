import { inject, observer } from 'mobx-react';
import React, { Component, Fragment } from 'react';
import SettingsForm from './SettingsForm';
import { GetRootStore } from '../../store/utils';
import { ParametersStoreType } from '../../store/ParametersStore';

@inject((s) => ({
  parameters: GetRootStore(s).ParametersStore,
}))
@observer
class SettingsPage extends Component<{
  parameters?: ParametersStoreType;
}> {
  public render() {
    const parameters = this.props.parameters!;
    return (
      <Fragment>
        <h1>Settings</h1>
        <SettingsForm settings={parameters} onSubmit={parameters.setNewParameters} />
      </Fragment>
    );
  }
}

export default SettingsPage;
