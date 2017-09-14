import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container } from 'semantic-ui-react';
import Poll from '../Poll';
import './index.css';

class ViewPoll extends Component {
  render () {
    const {
      match,
      polls
    } = this.props;

    return (
      <Container className='ViewPoll-root'>
        { Object.keys(polls).length &&
          <Poll poll={polls[match.params.id]} isFullScreen />
        }
      </Container>
    );
  }
}

function mapStateToProps (state) {
  return {
    polls: state.polls
  };
}

export default connect(mapStateToProps)(ViewPoll);
