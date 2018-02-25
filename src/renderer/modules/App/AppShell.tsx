import glamorous from 'glamorous';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { HashRouter } from 'react-router-dom';
import { ICommonStoreProps } from '../../common/ICommonStoreProps';
import { SettingsPage } from '../Settings';
import { TrackerPage } from '../Tracker';
import NavigationBar from './NavigationBar';

const ContainerDiv = glamorous.div({
  padding: '5px',
});

@inject('store')
@observer
export default class AppShell extends React.Component<ICommonStoreProps> {
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
