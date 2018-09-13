import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getFollowedCompanies } from '../../../actions/companies';
import { getMyStocks } from '../../../actions/stocks';

import './style.scss';

class Sidebar extends Component {

  componentDidMount() {
    const { getMyStocks, currentUserId } = this.props;
    getMyStocks(currentUserId);
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
                  <div className="list-item-left">
                    <span className="company-symbol">
                      { stock.symbol }
                    </span>
                    <span className="company-shares">
                      {
                        stock.shares === 1 ?
                          `${stock.shares} Share` :
                          `${stock.shares} Shares`
                      }
                    </span>
                  </div>
                  <span className="company-price">
                    $
                    { stock.value }
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
    myStocks: state.stocks.myStocks,
  };
};

const mapDispatchToProps = dispatch => ({
  getMyStocks: currentUserId => dispatch(getMyStocks(currentUserId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
