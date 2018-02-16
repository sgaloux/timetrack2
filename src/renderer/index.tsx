import { Provider } from 'mobx-react';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { RootStore } from './store';

import Shell from './components/Shell';

const store = RootStore.create();

ReactDOM.render(
  <Provider store={store}>
    <Shell />
  </Provider>,
  document.getElementById('app'),
);
