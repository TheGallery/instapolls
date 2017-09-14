import React from 'react';
import { Container, Button, Icon, Header, Divider } from 'semantic-ui-react';
import './index.css';

function Signin () {
  return (
    <Container className='Signin-root flex-col-center' fluid>
      <div className='Signin-content'>
        <Header as='h2' textAlign='center'>Sign in</Header>
        <Divider />
        <Button as='a' href='/auth/twitter' color='twitter'>
          <Icon name='twitter' /> Sign in with Twitter
        </Button>
        <Button as='a' href='/auth/github'>
          <Icon name='github' /> Sign in with Github
        </Button>
        <Button as='a' href='/auth/google' color='google plus'>
          <Icon name='google' /> Sign in with Google
        </Button>
      </div>
    </Container>
  );
}

export default Signin;
