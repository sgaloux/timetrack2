import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { HashRouter, Link } from 'react-router-dom';
import { SettingsPage } from '../Settings';
import { TrackerPage } from '../Tracker';

export default class AppShell extends React.Component {
  public render() {
    return (
      <HashRouter>
        <React.Fragment>
          <div>
            <Link to='/tracker'>Tracker</Link><br />
            <Link to='/settings'>Settings</Link>
          </div>
          <Switch>
            <Route path='/tracker' component={TrackerPage} />
            <Route path='/settings' component={SettingsPage} />
            <Redirect to='/tracker' />
          </Switch>
        </React.Fragment>
      </HashRouter>
    );
  }
}
