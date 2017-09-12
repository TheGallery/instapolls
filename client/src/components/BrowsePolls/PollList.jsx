import React from 'react';
import { Link } from 'react-router-dom';
import { List, Button } from 'semantic-ui-react';
import _map from 'lodash/map';

function PollList (props) {
  const {
    polls,
    handlePollSelect
  } = props;

  return (
    <List className='BrowsePolls-list' divided selection>
    {
      Object.keys(polls).length
    ? (
        _map(polls, (poll, id) => (
          <List.Item key={id} id={id} onClick={handlePollSelect}>
            <List.Header>{poll.name}</List.Header>
            <List.Content>
              <Button as={Link} to={`/polls/${id}`} icon='arrow right' circular basic />
            </List.Content>
          </List.Item>
        ))
      )
    : (
        <div>Nothing to show here</div>
      )
    }
    </List>
  );
}

export default PollList;
