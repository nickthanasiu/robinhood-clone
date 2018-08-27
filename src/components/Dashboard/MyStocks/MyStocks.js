import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions/companies';
import LoadingSpinner from '../../LoadingSpinner';

import './style.scss';

class MyStocks extends Component {

  componentDidMount() {
    const { getFollowedCompanies } = this.props;
    const currentUserId = localStorage.getItem('currentUserId');
    getFollowedCompanies(currentUserId);
  }

  render() {
    const { fetchingCompanies, followedCompanies } = this.props;
    return (
      <div className="my-stocks">
        <h3>
          My Stocks
        </h3>
        <ul className="stocks-list">
          {
            fetchingCompanies ? <LoadingSpinner /> :
              followedCompanies.map(company => (
                <li className="stocks-list-item">
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


export default connect(mapStateToProps, actions)(MyStocks);
