import { Navbar, NavbarGroup, NavbarHeading } from '@blueprintjs/core';
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

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

class NavigationBar extends Component {
  public render() {
    return (
      <Navbar className="pt-dark">
        <NavbarGroup>
          <NavbarHeading>TimeTrack 2</NavbarHeading>
        </NavbarGroup>
        <NavbarGroup>
          <ButtonLink label='Tracker' icon='pt-icon-gantt-chart' to='/tracker' />
        </NavbarGroup>
        <NavbarGroup align="right">
          <ButtonLink label='Settings' icon='pt-icon-cog' to='/settings' />
        </NavbarGroup>
      </Navbar>
    );
  }
}

export default NavigationBar;
