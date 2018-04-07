import * as React from 'react';
import { Div } from 'glamorous';
import { InflowStoreType } from '../../../store';
import { inject, observer } from 'mobx-react';
import { mapStore } from '../../../store/utils';
import InflowTree from './InflowTree';

interface InflowTreeSelectorProps {
  inflowStore?: InflowStoreType;
}
@inject(
  mapStore((root) => ({
    inflowStore: root.InflowStore,
  })),
)
@observer
export default class InflowTreeSelector extends React.Component<InflowTreeSelectorProps> {
  public render() {
    return (
      <Div
        css={{
          maxHeight: '80%',
          overflow: 'auto',
        }}
      >
        <InflowTree data={this.props.inflowStore!.inflowTree} />
      </Div>
    );
  }
}
