import React, { Component } from 'react';
import { connect } from 'react-redux';
import { pollArrToObj } from '../../utils/polls';

import BrowseMenu from './BrowseMenu';
import PollList from './PollList';
import PollItem from './PollItem';
import './index.css';

import { Container, Divider, Grid } from 'semantic-ui-react';

class BrowsePolls extends Component {
  state = {
    activePoll: ''
  };

  handleContextRef = (stickyContext) => {
    this.setState({ stickyContext });
  };

  handlePollSelect = (e, {id}) => {
    this.setState({
      activePoll: id
    });
  };

  hasVoted = () => {
    return !!~this.props.votes.indexOf(this.state.activePoll);
  };

  pollList = () => {
    if (!Object.keys(this.props.polls).length) return [];

    if (this.props.isUser) {
      const userPolls = this.props.user.polls.map(poll => {
        return this.props.polls[poll];
      });

      return pollArrToObj(userPolls);
    }

    return this.props.polls;
  }

  render () {
    return (
      <Container>
        <BrowseMenu isUser={this.props.isUser}/>
        <Divider hidden section />
        <Grid columns={2} doubling>
          <Grid.Column>
            <div ref={this.handleContextRef}>
              <PollList
                polls={this.pollList()}
                handlePollSelect={this.handlePollSelect}
              />
              {
                this.state.activePoll && 
                <PollItem
                  stickyContext={this.state.stickyContext}
                  poll={this.props.polls[this.state.activePoll]}
                  hasVoted={this.hasVoted()}
                />
              }
            </div>
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

function mapStateToProps (state) {
  return {
    user: state.user,
    polls: state.polls,
    votes: state.votes
  };
}

export default connect(mapStateToProps)(BrowsePolls);
