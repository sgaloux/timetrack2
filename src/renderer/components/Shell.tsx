import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { RootStore } from '../store';

interface IShellProps {
  store?: typeof RootStore.Type;
}

@inject('store')
@observer
export default class Shell extends React.Component<IShellProps> {
  public render() {
    const { store } = this.props;
    return (
      <div>
        <h1>WorkItems</h1>
        <hr />
        <ul>
          {store!.workItems.values().map((item) => <li key={item.id.toString()}>{item.title}</li>)}
        </ul>
      </div>
    );
  }
}
