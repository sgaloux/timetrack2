import { inject, observer } from 'mobx-react';
import React from 'react';
import { ICommonStoreProps } from '../../common/ICommonStoreProps';

@inject('store')
@observer
export default class TrackerPage extends React.Component<ICommonStoreProps> {
  public render() {
    const { store } = this.props;
    return (
      <div>
        <h1>{store!.workDay.formattedDate}</h1>
      </div>
    );
  }
}
