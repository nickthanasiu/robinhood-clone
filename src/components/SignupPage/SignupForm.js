import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { FaUserPlus } from 'react-icons/fa';
import * as actions from '../../actions';

import './style.scss';

class SignupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.dropDown = this.dropDown.bind(this);
  }

  onSubmit(formProps) {
    const { signup, reset } = this.props;
    signup(formProps);
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
      <div className="signup-page">
        {
          open ? this.dropDown() : null
        }
        <div className="signup-header">
          <h5>
            Sign Up
          </h5>
        </div>
        <div className="signup-icon">
          <FaUserPlus />
        </div>
        <div className="signup-form">
          <form
            id="signup-form"
            onSubmit={handleSubmit(this.onSubmit)}
          >
            <div className="form-input">
              <label htmlFor="firstName">
                First Name
              </label>
              <Field
                name="firstName"
                type="text"
                component="input"
                autoComplete="none"
                placeholder="First Name"
              />
            </div>
            <div className="form-input">
              <label htmlFor="lastName">
                Last Name
              </label>
              <Field
              name="lastName"
              type="text"
              component="input"
              autoComplete="none"
              placeholder="Last Name"
              />
            </div>
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
              Sign Up
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
  reduxForm({ form: 'signup' })
)(SignupForm);
