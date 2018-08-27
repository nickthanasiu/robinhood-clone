import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { withRouter } from 'react-router-dom';
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
    this.redirect = this.redirect.bind(this);
  }

  onSubmit(formProps) {
    console.log(this.props);
    const { signup, reset } = this.props;
    signup(formProps, this.redirect());
    this.setState({
      open: true
    });
    reset();
  }

  redirect() {
    const { history } = this.props;
    history.push('/dashboard');
  }

  render() {
    const { handleSubmit } = this.props;
    const { open } = this.state;
    return (
      <div className="signup-page">
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
                placeholder="E-mail"
              />
            </div>

            <div className="form-input">
              <label htmlFor="firstName">
                Password
              </label>
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
  reduxForm({ form: 'signup' }),
  withRouter
)(SignupForm);
