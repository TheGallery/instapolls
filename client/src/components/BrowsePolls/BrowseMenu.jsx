import React from 'react';
import { Link } from 'react-router-dom';
import { Dropdown, Button } from 'semantic-ui-react';

const options = [
  {
    key: 'new',
    text: 'newest',
    value: 'new'
  },
  {
    key: 'old',
    text: 'oldest',
    value: 'old'
  },
  {
    key: 'votedesc',
    text: 'most voted',
    value: 'votedesc'
  }
];

function BrowseMenu ({isUser}) {
  return (
    <div className='BrowsePolls-menu'>
      {
        isUser
      ? (
          <div className='hasBtn'>
            Browse my polls
            <Button
              as={Link}
              to='/new'
              floated='right'
              color='teal'
            >
              Create Poll
            </Button>
          </div>
        )
      : (
          <div>
            Browse the
            {' '}
            <Dropdown defaultValue={options[0].value} options={options} inline />
            {' '}
            polls
          </div>
        )
      }
    </div>
  );
}

export default BrowseMenu;
