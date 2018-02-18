import glamorous from 'glamorous';
import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { HashRouter } from 'react-router-dom';
import { SettingsPage } from '../Settings';
import { TrackerPage } from '../Tracker';
import NavigationBar from './NavigationBar';

const ContainerDiv = glamorous.div({
  padding: '5px'
});

export default class AppShell extends React.Component {
  public render() {
    return (
      <HashRouter>
        <React.Fragment>
          <NavigationBar />
          <ContainerDiv>
            <Switch>
              <Route path='/tracker' component={TrackerPage} />
              <Route path='/settings' component={SettingsPage} />
              <Redirect to='/tracker' />
            </Switch>
          </ContainerDiv>
        </React.Fragment>
      </HashRouter>
    );
  }
}
