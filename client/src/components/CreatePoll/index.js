import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Header, Divider, Form, Message } from 'semantic-ui-react';

class CreatePoll extends Component {
  render () {
    return (
      <Container>
        <Header as='h2'>Create Poll</Header>
        <Divider />
        <Form error>
          <Message floating success>
            <Message.Header>Poll submitted!</Message.Header>
            <Message.Content>
              <Link to='/'>Click here</Link> to view or share it.
            </Message.Content>
          </Message>
          <Message floating error>
            <Message.Header>An error occured.</Message.Header>
            <Message.Content>
              Make sure there are no errors in your input. If the problem persists, it might be on our end.
            </Message.Content>
          </Message>
          <Form.Field>
            <label>Poll Title</label>
            <input placeholder={`What's this about?`} />
          </Form.Field>
          <Form.TextArea label='Poll Options' placeholder='Put one option in each line' />
          <Form.Button>Submit</Form.Button>
        </Form>
      </Container>
    );
  }
}

export default CreatePoll;
