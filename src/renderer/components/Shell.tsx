import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { WorkItem } from '../store/models/WorkItem';
import { RootStore } from '../store/RootStore';

interface IShellProps {
  store?: typeof RootStore.Type;
}

const WorkItemView = observer((props: { item: typeof WorkItem.Type }) => (
  <div>{props.item.id}</div>
));

@inject('store')
@observer
export default class Shell extends React.Component<IShellProps> {
  public render() {
    const { store } = this.props;
    return (
      <div>
        <h1>WorkItems</h1>
        <hr />
        <button onClick={store!.addNewWorkItem}>Add</button>
        {store!.workItems.values().map((item) => (
          <WorkItemView item={item} key={item.id.toString()}>
            {item.title}
          </WorkItemView>
        ))}
      </div>
    );
  }
}
