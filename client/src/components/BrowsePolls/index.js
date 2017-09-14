import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPolls } from '../../utils/polls';

import BrowseMenu from './BrowseMenu';
import PollList from './PollList';
import PollItem from './PollItem';

import { Container, Divider, Grid } from 'semantic-ui-react';
import './index.css';

class BrowsePolls extends Component {
  state = {
    activePoll: null
  };

  componentWillReceiveProps (nextProps) {

    if (Object.keys(this.props.polls).length !== Object.keys(nextProps.polls).length) {
      this.setState({
        activePoll: Object.keys(nextProps.polls)[0] || ''
      });
    }
  };

  // https://react.semantic-ui.com/modules/sticky
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

  render () {
    return (
      <Container>
        <BrowseMenu isUser={this.props.isUser}/>
        <Divider hidden section />
        <Grid columns={2} doubling>
          <Grid.Column>
            <div ref={this.handleContextRef}>
              <PollList
                polls={this.props.polls}
                handlePollSelect={this.handlePollSelect}
              />
              {
                this.state.activePoll && 
                <PollItem
                  stickyContext={this.state.stickyContext}
                  poll={this.props.polls[this.state.activePoll]}
                />
              }
            </div>
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

function mapStateToProps (state, ownProps) {
  return {
    user: state.user,
    polls: getPolls(state.polls, ownProps.isUser, state.user),
    votes: state.votes
  };
}

export default connect(mapStateToProps)(BrowsePolls);
