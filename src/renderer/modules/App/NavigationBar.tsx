import {
  Navbar,
  NavbarGroup,
  NavbarHeading,
  IconName,
  Classes,
  Alignment,
} from '@blueprintjs/core';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { IconNames } from '@blueprintjs/icons';

interface ButtonLinkProps {
  icon: IconName;
  to: string;
  label: string;
}

const ButtonLink = (props: ButtonLinkProps) => {
  const { icon, to, label } = props;
  return (
    <NavLink className={`pt-button pt-minimal ${icon}`} activeClassName={`pt-active`} to={to}>
      {label}
    </NavLink>
  );
};

interface NavigationBarProps {
  onSync: () => void;
  onQuit: () => void;
}

class NavigationBar extends React.Component<NavigationBarProps> {
  public render() {
    return (
      <Navbar className={Classes.DARK}>
        <NavbarGroup>
          <NavbarHeading>TimeTrack 2</NavbarHeading>
        </NavbarGroup>
        <NavbarGroup>
          <ButtonLink label="Tracker" icon={IconNames.TIME} to="/tracker" />
        </NavbarGroup>
        <NavbarGroup align={Alignment.RIGHT}>
          <NavLink
            className="pt-button pt-minimal pt-icon-exchange"
            onClick={this.props.onSync}
            to=""
          >
            Sync Inflow Tree
          </NavLink>
          <ButtonLink label="Settings" icon={IconNames.COG} to="/settings" />
          <NavLink
            className="pt-button pt-minimal pt-icon-log-out"
            onClick={this.props.onQuit}
            to=""
          >
            Quit
          </NavLink>
        </NavbarGroup>
      </Navbar>
    );
  }
}

export default NavigationBar;
