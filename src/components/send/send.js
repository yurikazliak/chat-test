import React, { Component } from 'react'

import sendStyle from './send.module.scss';

class Send extends Component {
  constructor() {
    super()
    this.state = {
      message: '',
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    this.setState({
      message: e.target.value,
    })
  }


  handleSubmit(e) {
    e.preventDefault();
    this.props.sendMessage(this.state.message);
    this.setState({
      message: '',
    })
  }

  render() {
    return (
      <form
        className={sendStyle.sendForm}
        onSubmit={this.handleSubmit}
      >
        <input
          className={sendStyle.message}
          onChange={this.handleChange}
          value={this.state.message}
          placeholder='Enter your message'
          type='text' />
      </form>
    )
  }
}

export default Send;