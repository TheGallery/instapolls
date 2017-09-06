import React from 'react';
import { Link } from 'react-router-dom';
import { List, Button } from 'semantic-ui-react';
import _times from 'lodash/times';

function PollList () {
  return (
    <List className='BrowsePolls-list' divided selection>
    { _times(40, () => (
      <List.Item>
        <List.Header>Favourite Programming Language</List.Header>
        <List.Content>
          <Button as={Link} to='/' icon='arrow right' circular basic />
        </List.Content>
      </List.Item>
      ))
    }
    </List>
  );
}

export default PollList;
