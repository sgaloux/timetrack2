import { Provider } from 'mobx-react';
import { getSnapshot } from 'mobx-state-tree';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { RootStore } from './store';

import Shell from './components/Shell';

const store = RootStore.create();

(window as any).rootStore = store;
(window as any).printState = () => console.log(JSON.stringify(getSnapshot(store), null, 2));

ReactDOM.render(
  <Provider store={store}>
    <Shell />
  </Provider>,
  document.getElementById('app'),
);
