import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Header, Divider, Form, Message } from 'semantic-ui-react';
import * as validator from '../../utils/validator';
import { connect } from 'react-redux';
import { addPoll } from '../../redux/polls';

class CreatePoll extends Component {
  state = {
    status: 'loaded',
    poll: {
      name: '',
      options: []
    },
    message: {
      type: '',
      context: '',
      text: ''
    }
  };

  handleNameChange = (e) => {
    const validStatus = validator.validateName(e.target.value);

    if (validStatus.valid) {
      this.setState({
        poll: {
          ...this.state.poll,
          name: e.target.value
        },
        message: {
          type: '',
          context: '',
          text: ''
        }
      })
    } else {
      this.setState({
        message: {
          type: 'error',
          context: 'name',
          text: validStatus.error
        }
      })
    }
  };

  handleOptionsChange = (e) => {
    const validStatus = validator.validateOptions(e.target.value);

    if (validStatus.valid) {
      this.setState({
        poll: {
          ...this.state.poll,
          options: e.target.value.split('\n')
        },
        message: {
          type: '',
          context: '',
          text: ''
        }
      })
    } else {
      this.setState({
        message: {
          type: 'error',
          context: 'options',
          text: validStatus.error
        }
      })
    }
  };

  handlePollSubmit = () => {
    const validStatus = validator.validatePoll(this.state.poll.name, this.state.poll.options);

    if (validStatus.valid) {
      fetch('/api/polls', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(this.state.poll)
      })
      .then(res => {
        if (res.status >= 200 && res.status < 300) {
          return res.json();
        } else {
          return res.json().then(Promise.reject.bind(Promise));
        }
      })
      .then(data => {
        this.props.addPoll(data);
        this.setState({
          status: 'loaded',
          poll: {
            name: '',
            options: []
          },
          message: {
            type: 'success',
            context: '',
            id: data._id
          }
        })
      })
      .catch(err => {
        this.setState({
          status: 'loaded',
          message: {
            type: 'error',
            text: 'There was an error when submitting the data. Please try submitting again.'
          }
        });
      });

      this.setState({
        status: 'submitting'
      });
    } else {
      this.setState({
        message: {
          ...this.state.message,
          type: 'error',
          text: validStatus.error
        }
      });
    }
  };

  render () {
    return (
      <Container>
        <Header as='h2'>Create Poll</Header>
        <Divider />
        <Form
          error={this.state.message.type === 'error'}
          success={this.state.message.type === 'success'}
        >

          <Message floating success>
            <Message.Header>Poll submitted!</Message.Header>
            <Message.Content>
              <Link to={`/polls/${this.state.message.id}`}>Click here</Link> to view or share it.
            </Message.Content>
          </Message>
          <Message floating error>
            {
              (typeof this.state.message.text === 'string')
            ? (
                <Message.Content>{this.state.message.text}</Message.Content>
              )
            : (
                <Message.List items={this.state.message.text} />
              )
            }
          </Message>

          <Form.Field>
            <label>Poll Title</label>
            <Form.Input
              placeholder={`What's this about?`}
              value={this.state.poll.name}
              onChange={this.handleNameChange}
              disabled={this.state.status === 'submitting'}
              error={this.state.message.context === 'name'}
            />
          </Form.Field>
          <Form.TextArea
            label='Poll Options'
            placeholder='Put one option in each line'
            rows={5}
            onChange={this.handleOptionsChange}
            value={this.state.poll.options.join('\n')}
            error={this.state.message.context === 'options'}
            disabled={this.state.status === 'submitting'}
            autoHeight
          />
          <Form.Button
            floated='right'
            disabled={this.state.status === 'submitting'}
            onClick={this.handlePollSubmit}
          >
            {
              this.state.status === 'loaded'
            ? 'Submit'
            : 'Submitting..'
            }
          </Form.Button>
        </Form>
      </Container>
    );
  }
}


function mapDispatchToProps (dispatch) {
  return {
    addPoll: (poll) => dispatch(addPoll(poll))
  }
}

export default connect(() => ({}), mapDispatchToProps)(CreatePoll);
