import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import './style.scss';


// @TODO: Make Watchlist and Stock items clickable links to the relevant company
// @TODO: Make Add mini chart to each Watchlist and Stock item

class Sidebar extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.redirect = this.redirect.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    const returnNode = e.currentTarget.childNodes;
    const companySymbol = returnNode[0].firstChild.textContent;

    this.redirect(companySymbol);
  }

  redirect(symbol) {
    this.props.searchCompanies(symbol, () => {
      this.props.history.push('/company');
    });
  }

  render() {
    return (
      <div className="sidebar-container">

        <div className="sidebar">
          <div className="stocks-list-header">
            Stocks
          </div>
          <ul className="stocks-list">
            {
              this.props.myStocks.map(stock => (
                <li
                  className="stocks-list-item"
                  key={stock.symbol}
                  onClick={this.handleClick}
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
              this.props.followedCompanies.map(company => (
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
  }
}

export default withRouter(Sidebar);
