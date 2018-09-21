import React from 'react';

import './style.scss';


const Sidebar = props => (
  <div className="sidebar-container">

    <div className="sidebar">
      <div className="stocks-list-header">
        Stocks
      </div>
      <ul className="stocks-list">
        {
          props.myStocks.map(stock => (
            <li
              className="stocks-list-item"
              key={stock.symbol}
            >
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
          props.followedCompanies.map(company => (
            <li
              className="watchlist-item"
              key={company.symbol}
            >
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

export default Sidebar;
