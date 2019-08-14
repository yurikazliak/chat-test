import React, { Component } from 'react';
import { connect } from 'react-redux';

import { setUserName } from '../actions/setUserName';

class UserName extends Component {
  
  handleChange(e) {
    this.props.dispatch(setUserName({ userName: e.target.value }));
    localStorage.setItem('chatUserName', e.target.value);
    // console.log('handlechange', e.target.value)
  }

  render() {
    return (
      <input
        type="text"
        onChange={this.handleChange.bind(this)}
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