import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../../actions';

import './style.scss';

class SignupForm extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(formProps) {
    const { signup, reset } = this.props;
    signup(formProps);
    reset();
  }


  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="signup-form">
        <form
          id="signup-form"
          onSubmit={handleSubmit(this.onSubmit)}
        >
          <div className="form-input">
            <Field
            name="firstName"
            type="text"
            component="input"
            autoComplete="none"
            placeholder="First Name"
            />
          </div>
          <div className="form-input">
            <Field
            name="lastName"
            type="text"
            component="input"
            autoComplete="none"
            placeholder="Last Name"
            />
          </div>
          <div className="form-input">
            <Field
            name="email"
            type="text"
            component="input"
            autoComplete="none"
            placeholder="E-mail"
            />
          </div>
          <div className="form-input">
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
    );
  }
}

export default compose(
  connect(null, actions),
  reduxForm({ form: 'signup' })
)(SignupForm);
