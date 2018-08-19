import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../../actions';

class Signout extends Component {
  componentDidMount() {
    const { signout, history } = this.props;
    signout();
    history.push('/signin');
  }

  render() {
    return (
      <div>
        Sorry to see you go :(
      </div>
    );
  }
}

export default compose(
  connect(null, actions),
  withRouter
)(Signout);
