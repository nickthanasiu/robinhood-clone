import React, { Component } from 'react';
import { connect } from 'react-redux';

export default (ChildComponent) => {
  class ComposedComponent extends Component {
    componentDidMount() {
      this.shouldNavigateAway();
    }

    shouldNavigateAway() {
      const { auth, history } = this.props;
      if (!auth) {
        history.push('/signin');
      }
    }

    render() {
      return <ChildComponent {...this.props} />;
    }
  }

  const mapStateToProps = (state) => {
    return {
      auth: state.auth.authenticated,
    };
  };

  return connect(mapStateToProps)(ComposedComponent);
};
