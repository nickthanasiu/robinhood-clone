import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';

import './style.scss';

class SignupForm extends Component {
  render() {
    return (
      <div className="signup-form">
        <form>
          <div className="form-input">
            <Field
            name="firstName"
            type="text"
            component="input"
            placeholder="First Name"
            />
          </div>
          <div className="form-input">
            <Field
            name="lastName"
            type="text"
            component="input"
            placeholder="Last Name"
            />
          </div>
          <div className="form-input">
            <Field
            name="email"
            type="text"
            component="input"
            placeholder="E-mail"
            />
          </div>
          <div className="form-input">
            <Field
            name="password"
            type="password"
            component="input"
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

export default reduxForm({ form: 'signup' })(SignupForm);
