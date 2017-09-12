import React from 'react';

import { Link } from 'react-router-dom';
import { Menu, Dropdown } from 'semantic-ui-react';

function MobileNavbar ({loggedIn}) {
  return (
    <Menu.Menu className='Navbar-mobile-menu' position='right'>
      <Dropdown icon='content' item>
        {
          loggedIn
        ? (
            <Dropdown.Menu>
              <Dropdown.Item as={Link} to='/browse'>Browse</Dropdown.Item>
              <Dropdown.Item as={Link} to='/new'>Create Poll</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item as={Link} to='/me'>My Polls</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item>Log out</Dropdown.Item>
            </Dropdown.Menu>
          )
        : (
            <Dropdown.Menu>
              <Dropdown.Item as={Link} to='/browse'>Browse</Dropdown.Item>
              <Dropdown.Item as={Link} to='/signin'>Sign in</Dropdown.Item>
            </Dropdown.Menu>
          )
        }
      </Dropdown>
    </Menu.Menu>
  );
}

export default MobileNavbar;
