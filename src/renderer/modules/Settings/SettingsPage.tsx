import { inject, observer } from 'mobx-react';
import React, { Component, Fragment } from 'react';
import SettingsForm from './SettingsForm';
import { ParametersStoreType } from '../../store';
import { mapStore } from '../../store/utils';

interface SettingsPageProps {
  parameters?: ParametersStoreType;
}

@inject(mapStore(root => ({
  parameters: root.ParametersStore,
})))
@observer
class SettingsPage extends Component<SettingsPageProps> {
  public render() {
    const parameters = this.props.parameters!;
    return (
      <Fragment>
        <h1>Settings</h1>
        <SettingsForm settings={parameters} onSubmit={parameters.setNewParameters}/>
      </Fragment>
    );
  }
}

export default SettingsPage;
