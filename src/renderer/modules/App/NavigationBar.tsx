import { Navbar, NavbarGroup, NavbarHeading } from "@blueprintjs/core";
import React, { Component } from "react";
import { NavLink } from "react-router-dom";

interface IButtonLinkProps {
  icon: string;
  to: string;
  label: string;
}

const ButtonLink = (props: IButtonLinkProps) => {
  const { icon, to, label } = props;
  return (
    <NavLink
      className={`pt-button pt-minimal ${icon}`}
      activeClassName={`pt-button pt-minimal ${icon} pt-active`}
      to={to}
    >
      {label}
    </NavLink>
  );
};

interface INavigationBarProps {
  onSync: () => void;
  onQuit: () => void;
}

class NavigationBar extends Component<INavigationBarProps> {
  public render() {
    return (
      <Navbar className="pt-dark">
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
