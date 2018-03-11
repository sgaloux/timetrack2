import { Alignment, IconName, Navbar, NavbarGroup, NavbarHeading } from '@blueprintjs/core';
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

interface IButtonLinkProps {
  icon: IconName;
  to?: string;
  label: string;
  onClick?: () => any;
}

const ButtonLink = (props: IButtonLinkProps) => {
  const {to = '', label, icon, onClick} = props;
  return (
    <NavLink
      activeClassName={to && 'pt-active'}
      className={`pt-button pt-minimal pt-icon-${icon}`}
      to={to}
      onClick={onClick}
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
      <Navbar className='pt-dark'>
        <NavbarGroup>
          <NavbarHeading>TimeTrack 2</NavbarHeading>
        </NavbarGroup>
        <NavbarGroup>
          <ButtonLink label='Tracker' icon='home' to='/tracker'/>
        </NavbarGroup>
        <NavbarGroup align={Alignment.RIGHT}>
          <ButtonLink icon='exchange' onClick={this.props.onSync} label='Sync inflow tree'/>
          <ButtonLink label='Settings' icon='cog' to='/settings'/>
          <ButtonLink icon='log-out' onClick={this.props.onQuit} label='Quit'/>
        </NavbarGroup>
      </Navbar>
    );
  }
}

export default NavigationBar;
