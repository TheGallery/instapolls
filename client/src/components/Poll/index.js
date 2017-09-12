import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Card, Dropdown, Icon } from 'semantic-ui-react';
import PollResults from './PollResults';
import PollActions from './PollActions';
import { connect } from 'react-redux';
import { addVote, removeVote } from '../../redux/votes';
import './index.css';

class Poll extends Component {
  state = {
    currentValue: '',
    options: this.props.poll.options,
    modal: false
  };

  componentWillReceiveProps (nextProps) {
    if (nextProps.poll._id !== this.props.poll._id ||
      nextProps.poll.totalVotes !== this.props.poll.totalVotes) {
      this.setState({
        currentValue: '',
        options: nextProps.poll.options
      });
    }
  }

  handleAddOption = (e, {value}) => {
    this.setState({
      options: [
        ...this.state.options,
        {
          _id: `temp-${value}`,
          name: value
        }
      ]
    });
  };

  handleOptionChange = (e, {value}) => {
    this.setState({
      currentValue: value
    });
  };

  handleAddVote = () => {
    this.props.addVote(this.props.poll._id, this.state.currentValue);
  };

  handleRemoveVote = () => {
    this.props.removeVote(this.props.poll._id)
  };

  handlePollDeleteAccept = () => {
    fetch(`/api/polls/${this.props.poll._id}`, {
      method: 'DELETE',
      credentials: 'include'
    })
    .then(res => res.json())
    .then(data =>
      this.props.history.push('/browse')
    );
  };

  toggleModal = (open) => {
    this.setState({
      modal: open
    });
  };

  getPollOptions = (options) => {
    return options.map(opt => {
      return {
        key: opt._id,
        text: opt.name,
        value: opt.name
      };
    });
  };

  hasVoted = () => {
    return !!~this.props.votes.indexOf(this.props.poll._id);
  };

  ownsPoll = () => {
    if (this.props.user) {
      return ~this.props.user.polls.indexOf(this.props.poll._id);
    }

    return false;
  };

  render () {
    const {
      isFullScreen,
      poll
    } = this.props;
    return (
      <Card
        className={isFullScreen ? 'Poll-root Poll-fullscreen' : 'Poll-root'}
        fluid
      >
        <Card.Content>
          <Card.Header as={Link} to={`/polls/${poll._id}`}>
            {poll.name}
          </Card.Header>
          <Card.Meta>
            {`${poll.createdBy.name}, ${poll.createdAt}`}
          </Card.Meta>
        </Card.Content>
        <PollResults data={this.state.options} />
        <Card.Content>
          <Card.Description>
            You can select one of the available options or type your own.
          </Card.Description>
          <Dropdown
            options={this.getPollOptions(this.state.options)}
            placeholder='Cast your vote'
            additionLabel='Add option: '
            value={this.state.currentValue}
            onAddItem={this.handleAddOption}
            onChange={this.handleOptionChange}
            disabled={this.hasVoted()}
            allowAdditions={!!this.props.user}
            search
            selection
            fluid
          />
          { this.hasVoted() &&
            (
              <div className='Poll-vote-result'>
                <Icon name='checkmark' /> You've voted in this poll.
              </div>
            )
          }
        </Card.Content>
        <PollActions
          ownsPoll={this.ownsPoll()}
          hasVoted={this.hasVoted()}
          modal={this.state.modal}
          handleRemoveVote={this.handleRemoveVote}
          handleAddVote={this.handleAddVote}
          toggleModal={this.toggleModal}
          handlePollDeleteAccept={this.handlePollDeleteAccept}
        />
      </Card>
    );
  }
};

function mapStateToProps (state) {
  return {
    votes: state.votes,
    user: state.user
  };
}

function mapDispatchToProps (dispatch) {
  return {
    addVote: (pollId, option) => dispatch(addVote(pollId, option)),
    removeVote: (pollId) => dispatch(removeVote(pollId))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Poll));
