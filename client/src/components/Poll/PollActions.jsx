import React from 'react';
import { Card, Button, Confirm } from 'semantic-ui-react';

function PollActions (props) {
  const {
    ownsPoll,
    hasVoted,
    modal,
    handleRemoveVote,
    handleAddVote,
    toggleModal,
    handlePollDeleteAccept
  } = props;

  return (
    <Card.Content className='Poll-actions'>
      { ownsPoll &&
        <Button
          content='Delete Poll'
          icon='warning'
          color='red'
          onClick={toggleModal.bind(null, true)}
        />
      }
      { hasVoted
        ? <Button
          content='Remove Vote'
          color='blue'
          onClick={handleRemoveVote}
          basic
          />
        : <Button
          content='Vote'
          color='blue'
          onClick={handleAddVote}
          />
      }
      <Confirm
        open={modal}
        content='Are you sure you want to delete this poll permanently?'
        onCancel={toggleModal.bind(null, false)}
        onConfirm={handlePollDeleteAccept}
      />
    </Card.Content>
  );
}

export default PollActions;
