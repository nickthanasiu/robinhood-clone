import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { FaIdBadge } from 'react-icons/fa';
import * as actions from '../../actions';

import './style.scss';

// @TODO: Update FontAwesome Icon.

class SigninForm extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.redirect = this.redirect.bind(this);
  }

  onSubmit(formProps) {
    const { signin, reset } = this.props;
    signin(formProps, this.redirect());
    reset();
  }

  redirect() {
    const { history } = this.props;
    history.push('/dashboard');
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="signin-page">
        <div className="signin-header">

          <h5>
            Sign In
          </h5>
        </div>
        <div className="signin-icon">
          <FaIdBadge />
        </div>
        <div className="signin-form">
          <form
            id="signin-form"
            onSubmit={handleSubmit(this.onSubmit)}
          >
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
  reduxForm({ form: 'signin' }),
  withRouter
)(SigninForm);
