import * as React from 'react';
import { CSSTransition } from 'react-transition-group';
import classNames from 'classnames';

import './SliderPanel.css';
import { Button, Card } from '@blueprintjs/core';

interface SliderPanelProps {
  active: boolean;
  onClosed: () => any;
  children: JSX.Element | JSX.Element[];
}

interface SliderPanelState {
  active: boolean;
}

export default class SliderPanel extends React.Component<SliderPanelProps, SliderPanelState> {

  public state = {
    active: false,
  };

  static getDerivedStateFromProps(nextProps: SliderPanelProps) {
    return {
      active: nextProps.active,
    };
  }

  public close = (e) => {
    this.setState({
      active: false,
    });
  };

  public render() {
    return (
      <CSSTransition
        in={this.state.active}
        timeout={0}
        classNames="sliderPanel"
        onExited={this.props.onClosed}
      >
        {(state: any) => {
          const cl = classNames({
            'sliderPanel-active-exit': state === 'exited',
            sliderPanel: true,
          });
          return (
            <div className={cl}>
              <Card style={{ width: '100%', height: '100%' }}>

                {this.props.children}
                <Button
                  onClick={this.close}
                  text="Close"
                />
              </Card>
            </div>
          );
        }}
      </CSSTransition>
    );
  }
}