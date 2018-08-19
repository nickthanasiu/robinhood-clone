import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import './style.scss';

export default (ChildComponent) => {
  class Header extends Component {
    renderLinks() {
      const { authenticated } = this.props;
      if (authenticated) {
        return (
          <div className="header-right">
            <a href="#">
              Account
            </a>
            <a href="#">
              Sign Out
            </a>
          </div>
        );
      }

      return (
        <div className="header-right">
          <Link to="/signup">
            Sign Up
          </Link>
          <Link to="/signin">
            Sign In
          </Link>
        </div>
      );
    }

    render() {
      return (
        <div className="composed-component">
          <div className="header">
            <div className="header-left">
              <Link to="/">
                Home
              </Link>
            </div>

            { this.renderLinks() }
          </div>
          <div className="child-component-content">
            <ChildComponent {...this.props} />
          </div>
        </div>
      );
    }
  }

  const mapStateToProps = (state) => {
    return {
      authenticated: state.auth.authenticated,
    };
  };

  return connect(mapStateToProps)(Header);
};