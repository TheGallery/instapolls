import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Menu, Dropdown } from 'semantic-ui-react';
import MobileNavbar from './MobileNavbar';

import './index.css';

class Navbar extends Component {
  render () {
    return (
      <Menu size='huge' color='teal' className='Navbar' borderless>
        <Menu.Item className='Navbar-title' header>Instapolls</Menu.Item>

        { /* Desktop Menu */ }
        <Menu.Item
          as={Link}
          to='/browse'
          name='browse'
          active={isActiveRoute('browse', this.props.location.pathname)}
        >
          Browse
        </Menu.Item>
        <Menu.Item
          as={Link}
          to='/new'
          name='newpoll'
          active={isActiveRoute('new', this.props.location.pathname)}
        >
          Create Poll
        </Menu.Item>
        {
          !!this.props.user
        ? (
            <Menu.Menu position='right'>
              <Dropdown text={`Hello ${this.props.user.name}`} item>
                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to='/me'>My Polls</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item as='a' href='/auth/logout'>Log out</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Menu.Menu>
          )
        : (
            <Menu.Item as={Link} to='/signin' position='right'>
              Sign in
            </Menu.Item>
          )
        }

        { /* Small device Menu */ }
        <MobileNavbar loggedIn={!!this.props.user} />
      </Menu>
    );
  }
}

function isActiveRoute (route, pathname) {
  return route === pathname.substr(1);
}

function mapStateToProps (state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps)(Navbar);
