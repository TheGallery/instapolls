import React from 'react';

import Poll from '../Poll';

import { Container } from 'semantic-ui-react';

import './index.css';

function ViewPoll () {
  return (
    <Container className='ViewPoll-root'>
      <Poll isFullScreen />
    </Container>
  );
}

export default ViewPoll;
