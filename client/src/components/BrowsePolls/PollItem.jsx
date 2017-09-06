import React from 'react';
import { Rail, Sticky } from 'semantic-ui-react';
import Poll from '../Poll';

function PollItem ({stickyContext}) {
  return (
    <Rail position='right' className='BrowsePolls-poll-item' close='very'>
      <Sticky context={stickyContext}>
        <Poll />
      </Sticky>
    </Rail>
  );
}

export default PollItem;
