import * as React from 'react';
import { CSSTransition } from 'react-transition-group';
import classNames from 'classnames';

import { Button, Card } from '@blueprintjs/core';
import { Div } from 'glamorous';

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

  public close = () => {
    this.setState({
      active: false,
    });
  };

  escFunction = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      // Listen to escape key for close
      this.close();
    }
  };

  componentDidMount() {
    document.addEventListener('keydown', this.escFunction, false);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.escFunction, false);
  }

  public render() {
    return (
      <Div
        css={{
          '& .sliderPanel': {
            height: '640px',
            width: '80%',
            marginLeft: 'auto',
            marginRight: 'auto',
            position: 'fixed',
            left: '10%',
            bottom: '-640px',
            padding: '5px',
            transition: 'all 0.3s ease-in-out',
          },
          '& .sliderPanel-enter-done': {
            bottom: 0,
          },
        }}
      >
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
                  <hr/>
                  <Button onClick={this.close} text="Close"/>
                </Card>
              </div>
            );
          }}
        </CSSTransition>
      </Div>
    );
  }
}
