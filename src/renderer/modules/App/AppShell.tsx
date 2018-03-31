import { Spinner } from '@blueprintjs/core';
import glamorous from 'glamorous';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { HashRouter } from 'react-router-dom';
import { SettingsPage } from '../Settings';
import { TrackerPage } from '../Tracker';
import NavigationBar from './NavigationBar';
import AppConfirm from '../Common/dialogs/AppConfirm';
import { RootStoreType } from '../../store/RootStore';
import { GetRootStore } from '../../store/utils';

const ContainerDiv = glamorous.div({
  padding: '5px',
  marginTop: '10px',
});

const InitializeContainerDiv = glamorous.div({
  display: 'flex',
  paddingTop: '100px',
  justifyContent: 'center',
});

const InitializeContentDiv = glamorous.div({
  flexDirection: 'column',
  display: 'flex',
  alignItems: 'center',
});

interface AppShellProps {
  store: RootStoreType;
}

@inject((s) => ({
  store: GetRootStore(s),
}))
@observer
export default class AppShell extends React.Component<AppShellProps> {
  public render() {
    const { store } = this.props;
    const { initializeMessage, initializing } = store!;
    return (
      <HashRouter>
        <React.Fragment>
          <AppConfirm />
          <NavigationBar onSync={store!.synchronizeData} onQuit={store!.quitApplication} />
          {initializing ? (
            <InitializeContainerDiv>
              <InitializeContentDiv>
                <Spinner />
                <h1>{initializeMessage}</h1>
              </InitializeContentDiv>
            </InitializeContainerDiv>
          ) : (
            <ContainerDiv>
              <Switch>
                <Route path="/tracker" component={TrackerPage} />
                <Route path="/settings" component={SettingsPage} />
                <Redirect to="/tracker" />
              </Switch>
            </ContainerDiv>
          )}
        </React.Fragment>
      </HashRouter>
    );
  }
}
