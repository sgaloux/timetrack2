import {
  Navbar,
  NavbarGroup,
  NavbarHeading,
  Button,
  Popover,
  Menu,
  MenuItem,
  Position,
  MenuDivider,
  IconName,
  Classes,
  IconClasses,
  PopoverInteractionKind,
  Colors,
} from '@blueprintjs/core';
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';

interface IButtonLinkProps {
  icon: IconName;
  to: string;
  label: string;
}

const ButtonLink = (props: IButtonLinkProps) => {
  const { icon, to, label } = props;
  return (
    <NavLink className={`pt-button pt-minimal ${icon}`} activeClassName={`pt-active`} to={to}>
      {label}
    </NavLink>
  );
};

interface IMenuLinkProps {
  icon: IconName;
  label: string;
}

const MenuLink = (props: IMenuLinkProps) => {
  const { icon, label } = props;

  return (
    <Popover
      hoverOpenDelay={0}
      hoverCloseDelay={50}
      content={
        <Menu>
          <MenuItem iconName="new-text-box" text="New text box" />
          <MenuItem text="Settings..." iconName="cog" />
        </Menu>
      }
      interactionKind={PopoverInteractionKind.HOVER}
      position={Position.BOTTOM}
    >
      <Button
        text={label}
        iconName={icon}
        rightIconName={IconClasses.CARET_DOWN}
        className={Classes.MINIMAL}
      />
    </Popover>
  );
};

interface INavigationBarProps {
  onSync: () => void;
  onQuit: () => void;
}

class NavigationBar extends Component<INavigationBarProps> {
  public render() {
    return (
      <Navbar className={Classes.DARK}>
        <NavbarGroup>
          <NavbarHeading>TimeTrack 2</NavbarHeading>
        </NavbarGroup>
        <NavbarGroup>
          <ButtonLink label="Tracker" icon="pt-icon-time" to="/tracker" />
        </NavbarGroup>
        <NavbarGroup align="right">
          <NavLink
            className="pt-button pt-minimal pt-icon-exchange"
            onClick={this.props.onSync}
            to=""
          >
            Sync Inflow Tree
          </NavLink>
          <ButtonLink label="Settings" icon="pt-icon-cog" to="/settings" />
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
