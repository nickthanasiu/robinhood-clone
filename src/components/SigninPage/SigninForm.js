import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { FaUserPlus } from 'react-icons/fa';
import * as actions from '../../actions';

import './style.scss';

// @TODO: Update FontAwesome Icon.

class SigninForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.dropDown = this.dropDown.bind(this);
  }

  onSubmit(formProps) {
    const { signin, reset } = this.props;
    signin(formProps);
    this.setState({
      open: true
    });
    reset();
  }

  dropDown() {
    const { errorMessage } = this.props;
    const message = errorMessage.length === 0 ?
      'Success!' : errorMessage;
    const backgroundColor = errorMessage.length === 0 ?
      '#30cd9a' : '#f68f7c';
    return (
      <div
        className="drop-down"
        style={{ backgroundColor }}
      >
        { message }
      </div>
    );
  }

  render() {
    const { handleSubmit } = this.props;
    const { open } = this.state;
    return (
      <div className="signin-page">
        {
          open ? this.dropDown() : null
        }
        <div className="signin-header">
          <h5>
            Sign In
          </h5>
        </div>
        <div className="signin-icon">
          <FaUserPlus />
        </div>
        <div className="signin-form">
          <form
            id="signin-form"
            onSubmit={handleSubmit(this.onSubmit)}
          >
            <div className="form-input">
              <label htmlFor="email">
                E-mail
              </label>
              <Field
                name="email"
                type="text"
                component="input"
                autoComplete="none"
                placeholder="E-mail"
              />
            </div>
            <div className="form-input">
              <label htmlFor="password">
                Password
              </label>
              <Field
              name="password"
              type="password"
              component="input"
              autoComplete="none"
              placeholder="Password"
              />
            </div>

            <button type="submit">
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    errorMessage: state.auth.errorMessage,
  };
};

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: 'signin' })
)(SigninForm);
