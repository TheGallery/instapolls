import React from 'react';
import { Card, Button, Icon } from 'semantic-ui-react';

function getTwitterUrl (poll) {
  return encodeURI(`https://twitter.com/intent/tweet?text=${poll.name} | Instapolls&url=https://instapolls.herokuapp.com/polls/${poll._id}`);
}

function PollShare ({poll}) {
  return (
    <Card.Content className='Poll-share'>
      <Button
        as='a'
        href={getTwitterUrl(poll)}
        target='_blank'
        color='blue'
        size='large'
        icon
        circular
        basic
      >
        <Icon name='twitter' />
      </Button>
    </Card.Content>
  );
}

export default PollShare;
