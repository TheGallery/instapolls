import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Header, Divider, Form, Message } from 'semantic-ui-react';
import { validateName, validateOptions, validatePoll } from '../../utils/polls';
import { connect } from 'react-redux';
import { addPoll } from '../../redux/polls';


/* Todo: This container has great potential for improvement. */
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
    const validStatus = validateName(e.target.value);

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
    const validStatus = validateOptions(e.target.value);

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
    const validStatus = validatePoll(this.state.poll.name, this.state.poll.options);

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
        this.props.addPoll(data, this.props.user);
        this.props.history.push(`/polls/${data._id}`)
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
        <Form error={this.state.message.type === 'error'}>
          <Message floating error>
            {
              (typeof this.state.message.text === 'string')
            ? <Message.Content>{this.state.message.text}</Message.Content>
            : <Message.List items={this.state.message.text} />
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

function mapStateToProps (state) {
  return {
    user: state.user
  }
}

function mapDispatchToProps (dispatch) {
  return {
    addPoll: (poll, user) => dispatch(addPoll(poll, user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePoll);
