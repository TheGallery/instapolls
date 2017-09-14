import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Card } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { addVote, removeVote } from '../../redux/votes';
import { deletePoll } from '../../redux/polls';

import PollResults from './PollResults';
import PollActions from './PollActions';
import PollShare from './PollShare';
import PollOptions from './PollOptions';
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
          _id: `temp-${value}`, // need an ID for the chart
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
    if (this.state.currentValue) {
      this.props.addVote(this.props.poll._id, this.state.currentValue);
    }
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
    .then(data => {
      if (this.props.location.pathname !== '/browse') {
        this.props.history.push('/browse');
      }
      
      this.props.deletePoll(this.props.poll._id);
      
      this.setState({
        modal: false
      });
    });
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
    return this.props.user
      ? !!~this.props.user.polls.indexOf(this.props.poll._id)
      : false;
  };

  render () {
    return (
      <Card
        className={
          this.props.isFullScreen 
            ? 'Poll-root Poll-fullscreen' 
            : 'Poll-root'
        }
        fluid
      >
        <Card.Content className='Poll-header'>
          <Card.Header as={Link} to={`/polls/${this.props.poll._id}`}>
            {this.props.poll.name}
          </Card.Header>
          <Card.Meta>
            {`${this.props.poll.createdBy.name}, ${this.props.poll.createdAt}`}
          </Card.Meta>
        </Card.Content>
        { this.props.user && <PollShare poll={this.props.poll} />}
        <PollResults data={this.state.options} />
        <PollOptions
          isRegistered={!!this.props.user}
          options={this.getPollOptions(this.state.options)}
          value={this.state.currentValue}
          hasVoted={this.hasVoted()}
          handleAddOption={this.handleAddOption}
          handleOptionChange={this.handleOptionChange}
        />
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
    removeVote: (pollId) => dispatch(removeVote(pollId)),
    deletePoll: (pollId) => dispatch(deletePoll(pollId))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Poll));
