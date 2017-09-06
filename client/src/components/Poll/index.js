import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import {
  Card,
  Image,
  Dropdown,
  Icon,
  Button
} from 'semantic-ui-react';

import './index.css';

class Poll extends Component {
  state = {
    currentValue: '',
    options: [
      {
        key: 'JavaScript',
        text: 'JavaScript',
        value: 'JavaScript'
      },
      {
        key: 'Python',
        text: 'Python',
        value: 'Python'
      }
    ]
  };

  handleAddItem = (e, {value}) => {
    this.setState({
      options: [
        ...this.state.options,
        {
          key: value,
          text: value,
          value
        }
      ]
    });
  };

  handleChange = (e, {value}) => {
    this.setState({
      currentValue: value
    });
  };

  render () {
    return (
      <Card className={ this.props.isFullScreen ? 'Poll-root Poll-fullscreen' : 'Poll-root'} fluid>
        <Card.Content>
          <Card.Header as={Link} to='/polls/1'>Favourite Programming Language</Card.Header>
          <Card.Meta>TheGallery, Thu 26 Sept 2016</Card.Meta>
        </Card.Content>
        <Image src='https://crmchartguy.files.wordpress.com/2014/03/drawingstyle-3d-enabled.png' fluid />
        <Card.Content>
          <Card.Description>
            You can select one of the available options or type your own.
          </Card.Description>
          <Dropdown
            options={this.state.options}
            placeholder='Cast your vote'
            additionLabel='Add option: '
            value={this.state.currentValue}
            search
            selection
            fluid
            allowAdditions
            onAddItem={this.handleAddItem}
            onChange={this.handleChange}
          />
          <div className='Poll-vote-result' style={{display: 'none'}}>
            <Icon name='checkmark' /> You've voted JavaScript!
          </div>
        </Card.Content>
        <Card.Content>
          <Button color='blue' floated='right'>Vote</Button>
          <Button basic color='red' floated='right'>Remove Vote</Button>
        </Card.Content>
      </Card>
    );
  }
};

export default Poll;
