import glamorous from 'glamorous';
import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { HashRouter } from 'react-router-dom';
import { SettingsPage } from '../Settings';
import { TrackerPage } from '../Tracker';
import NavigationBar from './NavigationBar';
import { inject, observer } from 'mobx-react';
import { ICommonStoreProps } from '../../common/ICommonStoreProps';
import { Spinner } from '@blueprintjs/core';

const ContainerDiv = glamorous.div({
  padding: '5px',
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

//const key = OurToaster.show({ message: "Toasted!" });
//OurToaster.update(key, { message: "Still toasted!" });

@inject('store')
@observer
export default class AppShell extends React.Component<ICommonStoreProps> {
  public render() {
    const { store } = this.props;
    const { initializeMessage, initializing } = store!;
    return (
      <>
        {initializing ? (
          <InitializeContainerDiv>
            <InitializeContentDiv>
              <Spinner />
              <h1>{initializeMessage}</h1>
            </InitializeContentDiv>
          </InitializeContainerDiv>
        ) : (
          <HashRouter>
            <React.Fragment>
              <NavigationBar />
              <ContainerDiv>
                <Switch>
                  <Route path="/tracker" component={TrackerPage} />
                  <Route path="/settings" component={SettingsPage} />
                  <Redirect to="/tracker" />
                </Switch>
              </ContainerDiv>
            </React.Fragment>
          </HashRouter>
        )}
      </>
    );
  }
}
