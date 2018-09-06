import React, { Component } from 'react';

import './style.scss';

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      watching: false,
      num_shares: '',
    };

    this.handleWatchButtonClick = this.handleWatchButtonClick.bind(this);
    this.watchCompany = this.watchCompany.bind(this);
    this.unwatchCompany = this.unwatchCompany.bind(this);
    this.handleBuyButtonClick = this.handleBuyButtonClick.bind(this);
  }

  componentDidMount() {
    const { selectedCompany, followedCompanies } = this.props;
    const index = followedCompanies.map((company) => {
      return company._id;
    }).indexOf(selectedCompany._id);
    if (index !== -1) {
      this.setState({
        watching: true
      });
    }
  }

  // @TODO: Change all 'follow' actions to 'watch'

  handleWatchButtonClick() {
    // if following, unfollow, otherwise follow
    const { watching } = this.state;
    if (!watching) {
      this.watchCompany();
    } else {
      this.unwatchCompany();
    }
  }

  watchCompany() {
    const { followCompany, selectedCompany, currentUserId } = this.props;
    followCompany(currentUserId, selectedCompany._id);
    this.setState({
      watching: true
    });
  }

  unwatchCompany() {
    const { unfollowCompany, selectedCompany, currentUserId } = this.props;
    unfollowCompany(currentUserId, selectedCompany._id);
    this.setState({
      watching: false
    });
  }

  handleBuyButtonClick(e) {
    const { buyStock, selectedCompany, currentUserId } = this.props;
    e.preventDefault();
    const shares = 1;
    buyStock(currentUserId, selectedCompany._id, selectedCompany.price, shares);
  }

  render() {
    const { selectedCompany } = this.props;
    const { watching } = this.state;
    return (
      <div className="sidebar">

        <div className="buy-form">
          <div className="buy-form-header">
            Buy
            <span className="company-symbol">
              { selectedCompany.symbol }
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
                { selectedCompany.price }
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
              <button type="submit" onClick={this.handleBuyButtonClick}>
                Buy
              </button>
            </div>
          </form>

          <div className="buying-power">
            $0.00 Buying Power Available
          </div>
        </div>

        <div className="watch-button-container">
          <button type="button" onClick={this.handleWatchButtonClick}>
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
