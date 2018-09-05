import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions/companies';

import './style.scss';

class Sidebar extends Component {
  constructor(props) {
    super(props);

    this.currentUserId = localStorage.getItem('currentUserId');
  }

  componentDidMount() {
    console.log('SIDEBAR PROPS: ', this.props);
    const { getFollowedCompanies, getMyStocks } = this.props;
    getFollowedCompanies(this.currentUserId);
    getMyStocks(this.currentUserId);
  }

  render() {
    const { followedCompanies, myStocks } = this.props;
    return (
      <div className="sidebar-container">

        <div className="sidebar">
          <div className="watchlist-header">
            Watchlist
          </div>
          <ul className="watchlist">
            {
              followedCompanies.map(company => (
                <li className="watchlist-item">
                  <span className="company-symbol">
                    { company.symbol }
                  </span>
                  <span className="company-price">
                    $
                    { company.price }
                  </span>
                </li>
              ))
            }
          </ul>
          <div className="stocks-list-header">
            Stocks
          </div>
          <ul className="stocks-list">
            {
              myStocks.map(stock => (
                <li className="stocks-list-item">
                  <span className="company-symbol">
                    { stock.symbol }
                  </span>
                  <span className="company-price">
                    $
                    { stock.price }
                  </span>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    followedCompanies: state.companies.followedCompanies,
    myStocks: state.stocks.myStocks,
  };
};

export default connect(mapStateToProps, actions)(Sidebar);
