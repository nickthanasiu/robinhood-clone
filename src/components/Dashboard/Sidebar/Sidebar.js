import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getFollowedCompanies } from '../../../actions/companies';
import { getMyStocks } from '../../../actions/stocks';

import './style.scss';

class Sidebar extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { getFollowedCompanies, getMyStocks, currentUserId } = this.props;
    getFollowedCompanies(currentUserId);
    getMyStocks(currentUserId);
    
  }

  componentDidUpdate() {
    console.log('DASHBOARD SIDEBAR PROPS: ', this.props);
  }

  render() {
    const { followedCompanies, myStocks } = this.props;
    return (
      <div className="sidebar-container">

        <div className="sidebar">
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
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    followedCompanies: state.companies.followedCompanies,
    myStocks: state.stocks.myStocks,
    currentUserId: state.auth.currentUserId,
  };
};

const mapDispatchToProps = dispatch => ({
  getFollowedCompanies: currentUserId => dispatch(getFollowedCompanies(currentUserId)),
  getMyStocks: currentUserId => dispatch(getMyStocks(currentUserId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
