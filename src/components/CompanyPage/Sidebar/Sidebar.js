import React, { Component } from 'react';

import './style.scss';

class Sidebar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      watching: false,
    };

    this.handleClick = this.handleClick.bind(this);
    this.addToWatchlist = this.addToWatchlist.bind(this);
    this.removeFromWatchlist = this.removeFromWatchlist.bind(this);
  }

  handleClick() {
    const { watching } = this.state;
    if (!watching) {
      this.addToWatchlist();
    } else {
      this.removeFromWatchlist();
    }
  }

  addToWatchlist() {
    this.setState({
      watching: true,
    });
  }

  removeFromWatchlist() {
    this.setState({
      watching: false,
    });
  }

  render() {
    const { watching } = this.state;
    const { company } = this.props;
    return (
      <div className="sidebar">

        <div className="buy-form">
          <div className="buy-form-header">
            Buy
            <span className="company-symbol">
              { company.symbol }
            </span>
          </div>
          <form>
            <div className="shares buy-form-elem">
              <span>
                Shares
              </span>
              <input type="number" name="shares" placeholder="0" />
            </div>

            <div className="market-price buy-form-elem">
              <span>
                Market Price
              </span>
              <span>
                $219.79
              </span>
            </div>

            <div className="estimated-cost buy-form-elem">
              <span>
                Estimated Cost
              </span>
              <span>
                $0.00
              </span>
            </div>

            <div className="buy-button-container">
              <button type="submit">
                Buy
              </button>
            </div>
          </form>

          <div className="buying-power">
            $0.00 Buying Power Available
          </div>
        </div>

        <div className="watch-button-container">
          <button type="button" onClick={this.handleClick}>
            {
              watching ? 'Remove from Watchlist' : 'Add to Watchlist'
            }
          </button>
        </div>
      </div>
    );
  }
}

export default Sidebar;
