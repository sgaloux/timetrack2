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
import { RootStoreType } from '../../store';
import { mapStore } from '../../store/utils';

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
  rootStore?: RootStoreType;
}

@inject(
  mapStore((root) => ({
    rootStore: root,
  })),
)
@observer
export default class AppShell extends React.Component<AppShellProps> {
  public componentWillMount() {
    this.props.rootStore!.initialize();
  }

  public render() {
    const { rootStore } = this.props;
    const { initializeMessage, initializing } = rootStore!;
    return (
      <HashRouter>
        <React.Fragment>
          <AppConfirm />
          <NavigationBar onSync={rootStore!.synchronizeData} onQuit={rootStore!.quitApplication} />
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
