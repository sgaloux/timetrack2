import { Provider } from 'mobx-react';
import { getSnapshot } from 'mobx-state-tree';
import { addMiddleware } from 'mobx-state-tree';
import { actionLogger } from 'mst-middlewares';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import 'normalize.css/normalize.css';
import '@blueprintjs/core/lib/css/blueprint.css';

import './index.css';

import { AppShell } from './modules/App';
import { RootStore } from './store/RootStore';


const store = RootStore.create();
addMiddleware(store, actionLogger);

(window as any).rootStore = store;
(window as any).printState = () => console.log(JSON.stringify(getSnapshot(store), null, 2));

ReactDOM.render(
  <Provider store={store}>
    <AppShell />
  </Provider>,
  document.getElementById('app'),
);
