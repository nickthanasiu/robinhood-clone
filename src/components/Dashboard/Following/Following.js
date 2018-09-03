import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions/companies';
import LoadingSpinner from '../../LoadingSpinner';

import './style.scss';

class Following extends Component {
  constructor(props) {
    super(props);

    this.currentUserId = localStorage.getItem('currentUserId');
  }

  componentDidMount() {
    const { getFollowedCompanies } = this.props;
    getFollowedCompanies(this.currentUserId);
  }


  render() {
    const { fetchingCompanies, followedCompanies } = this.props;
    return (
      <div className="following">
        <h6>
          Following
        </h6>
        <ul className="following-list">
          {
            fetchingCompanies ? <LoadingSpinner /> :
              followedCompanies.map(company => (
                <li className="following-list-item">
                  <span className="stock-name">
                    { company.name }
                  </span>

                  <span className="stock-price">
                    ${ company.price }
                  </span>
                </li>
              ))
          }
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    fetchingCompanies: state.companies.fetchingCompanies,
    followedCompanies: state.companies.followedCompanies,
  };
};


export default connect(mapStateToProps, actions)(Following);
