import React, { Component } from 'react';
import { connect } from 'react-redux';

import { setUserName } from '../actions/setUserName';

class UserName extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.dispatch(setUserName({ userName: e.target.value }));
    localStorage.setItem('chatUserName', e.target.value);
    // console.log('handlechange', e.target.value)
  }

  render() {
    return (
      <input
        type="text"
        onChange={this.handleChange}
        value={this.props.user}
      ></input>
    )
  }
}

const mapStateProps = (state) => {
  return {
    user: state.user,
  }
};

export default connect(mapStateProps)(UserName);