import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';

function BrowseMenu ({isUser}) {
  return (
    <div className='BrowsePolls-menu'>
      {
        isUser
      ? <div className='hasBtn'>
          Browse my polls
          <Button as={Link} to='/new' floated='right' color='teal'>
            Create Poll
          </Button>
        </div>
      : <div>Browse polls</div>
      }
    </div>
  );
}

export default BrowseMenu;
