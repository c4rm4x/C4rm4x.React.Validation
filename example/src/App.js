import React, { Component } from 'react'
import {Form, required} from 'c4rm4x-react-validation';

import InputText from './components/inputText';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      test: ''
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render () {
    return (
      <Form onSubmit={e => console.log(e)}>
        <InputText 
          name='test' 
          type='text' 
          value={this.state.test}
          onChange={this.onChange}
          validators={[required]}/>
      </Form>
    )
  }
}
