import React from 'react';
import { FaUserPlus } from 'react-icons/fa';
import SignupForm from './SignupForm';

import './style.scss';

const SignupPage = () => (
  <div className="signup-page">
    <div className="signup-header">
      <h5>
        Sign up
      </h5>
    </div>
    <div className="signup-icon">
      <FaUserPlus />
    </div>
    <div className="signup-form-container">
      <SignupForm />
    </div>
  </div>
);

export default SignupPage;
