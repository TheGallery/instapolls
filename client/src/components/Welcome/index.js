import React from 'react';
import { Link } from 'react-router-dom';
import { Header, Button } from 'semantic-ui-react';
import './index.css';

function Welcome () {
  return (
    <div className='root flex-col-center'>
      <Header as='h1' className='title' textAlign='center'>
        Instapolls
        <Header.Subheader>
          Instantly create and share polls.
        </Header.Subheader>
      </Header>
      <Button.Group size='huge' className='actions'>
        <Button as={Link} to='/browse'>View polls</Button>
        <Button.Or />
        <Button as={Link} to='/new'>Create a poll</Button>
      </Button.Group>
    </div>
  );
}

export default Welcome;
