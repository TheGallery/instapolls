import React from 'react';
import { Card, Dropdown, Icon } from 'semantic-ui-react';

function PollOptions (props) {
  const {
    isRegistered,
    options,
    value,
    hasVoted,
    handleAddOption,
    handleOptionChange
  } = props;

  return (
    <Card.Content>
      {isRegistered &&
        <Card.Description>
          You can select one of the available options or type your own.
        </Card.Description>
      }
      <Dropdown
        options={options}
        placeholder='Cast your vote'
        additionLabel='Add option: '
        value={value}
        onAddItem={handleAddOption}
        onChange={handleOptionChange}
        disabled={hasVoted}
        allowAdditions={isRegistered}
        search
        selection
        fluid
      />
      { hasVoted &&
        <div className='Poll-vote-result'>
          <Icon name='checkmark' /> You have voted in this poll.
        </div>
      }
    </Card.Content>
  );
}

export default PollOptions;
