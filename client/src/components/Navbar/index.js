import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Dropdown } from 'semantic-ui-react';
import MobileNavbar from './MobileNavbar';

import './index.css';

function Navbar ({location}) {
  const loggedIn = true;

  return (
    <Menu size='huge' color='teal' className='Navbar' borderless>
      <Menu.Item className='Navbar-title' header>Instapolls</Menu.Item>

      { /* Desktop Menu */ }
      <Menu.Item
        as={Link}
        to='/browse'
        name='browse'
        active={isActiveRoute('browse', location.pathname)}
      >
        Browse
      </Menu.Item>
      <Menu.Item
        as={Link}
        to='/new'
        name='newpoll'
        active={isActiveRoute('new', location.pathname)}
      >
        Create Poll
      </Menu.Item>
      {
        loggedIn
      ? (
          <Menu.Menu position='right'>
            <Dropdown text='Hello Joseph' item>
              <Dropdown.Menu>
                <Dropdown.Item as={Link} to='/me'>My Polls</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item>Log out</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Menu>
        )
      : (
          <Menu.Item as={Link} to='/' position='right'>
            Log in
          </Menu.Item>
        )
      }

      { /* Small device Menu */ }
      <MobileNavbar />
    </Menu>
  );
}

function isActiveRoute (route, pathname) {
  return route === pathname.substr(1);
}

export default Navbar;
