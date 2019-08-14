import React from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';

const Head = (props) => {

  const { windowVisibility } = props;

  return (
    <Helmet titleTemplate="MyChat - %s">
      {windowVisibility ? (<title>Visible</title>) : (<title>Hidden</title>)}
        <link rel="icon" type="image/png" href="favicon.ico" />
      </Helmet>
  )
}

const propsMapState = (state) => {
  return {
    windowVisibility: state.windowVisibility,
  }
}

export default connect(propsMapState)(Head);