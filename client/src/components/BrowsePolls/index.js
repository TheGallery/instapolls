import React, { Component } from 'react';
import BrowseMenu from './BrowseMenu';
import PollList from './PollList';
import PollItem from './PollItem';
import './index.css';

import { Container, Divider, Grid } from 'semantic-ui-react';

class BrowsePolls extends Component {
  state = {};

  handleContextRef = (stickyContext) => {
    this.setState({ stickyContext });
  };

  render () {
    return (
      <Container>
        <BrowseMenu isUser={this.props.isUser}/>
        <Divider hidden section />
        <Grid columns={2} doubling>
          <Grid.Column>
            <div ref={this.handleContextRef}>
              <PollList />
              <PollItem stickyContext={this.state.stickyContext} />
            </div>
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

export default BrowsePolls;
