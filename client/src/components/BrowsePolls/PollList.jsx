import React from 'react';
import { Link } from 'react-router-dom';
import { List, Button } from 'semantic-ui-react';
import _map from 'lodash/map';

function PollList ({polls, handlePollSelect}) {
  return (
    <List className='BrowsePolls-list' size='large' celled relaxed selection>
    {
      Object.keys(polls).length
    ? (
        _map(polls, (poll, id) => (
          <List.Item key={id} id={id} onClick={handlePollSelect}>
            <List.Header>{poll.name}</List.Header>
            <List.Content>
              <Button
                as={Link}
                to={`/polls/${id}`}
                icon='arrow right'
                circular
                basic
              />
            </List.Content>
          </List.Item>
        ))
      )
    : (
        <div>
          There are no polls available.
        </div>
      )
    }
    </List>
  );
}

export default PollList;
