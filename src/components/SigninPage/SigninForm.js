import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter, } from 'react-router-dom';
import { FaIdBadge, FaChevronLeft } from 'react-icons/fa';
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
    this.redirect = this.redirect.bind(this);
    this.goBack = this.goBack.bind(this);
  }

  onSubmit(formProps) {
    const { signin, reset } = this.props;
    this.setState({
      open: true
    });
    signin(formProps, () => {
      this.redirect();
    });
    reset();
  }

  dropDown() {
    const { errorMessage } = this.props;
    const message = errorMessage.length === 0 ? 'Success' : errorMessage;
    const color = errorMessage.length === 0 ? '#30cd9a' : '#f68f7c';
    return (
      <div className="drop-down" style={{ backgroundColor: color }}>
        { message }
      </div>
    );
  }

  redirect() {
    const { history } = this.props;
    setTimeout(() => {
      history.push('/dashboard')
    }, 1000);
  }

  goBack() {
    const { history } = this.props;
    history.goBack();
  }

  render() {
    const { handleSubmit } = this.props;
    const { open } = this.state;
    return (
      <div className="signin-page">
        {
          open ? this.dropDown() : null
        }
        <div
          className="back-arrow-icon"
          onClick={this.goBack}
          role="button"
        >
          <FaChevronLeft style={{ fontSize: '1.25rem' }} />
        </div>

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
