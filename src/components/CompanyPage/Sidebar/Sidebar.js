import React, { Component } from 'react';

import './style.scss';

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      watching: false,
      numShares: '',
      estimatedCost: (0).toFixed(2),
      orderSummaryDisplay: 'none',
      orderButtonDisplay: 'Buy',
    };

    this.updateNumShares = this.updateNumShares.bind(this);
    this.handleWatchButtonClick = this.handleWatchButtonClick.bind(this);
    this.watchCompany = this.watchCompany.bind(this);
    this.unwatchCompany = this.unwatchCompany.bind(this);
    this.handleBuyButtonClick = this.handleBuyButtonClick.bind(this);
    this.handleSubmitButtonClick = this.handleSubmitButtonClick.bind(this);
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

  updateNumShares() {
    this.setState({
      numShares: this.sharesInput.value
    });
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

  // @TODO: Things to consider when 'buying' stock:
    // Should not create new StockItem if current User already owns the stock. Should instead update pre-existing object
    // This component needs access to the following state: selectedCompany, currentUserId, numShares of selectedCompany owned by currentUserId
    //


  handleBuyButtonClick(e) {
    e.preventDefault();
    const { selectedCompany } = this.props;
    const { numShares } = this.state;
    this.setState({
      estimatedCost: (selectedCompany.price * numShares).toFixed(2),
      orderSummaryDisplay: 'flex',
      orderButtonDisplay: 'Submit',
    });
  }

  handleSubmitButtonClick(e) {
    e.preventDefault();
    const { buyStock, selectedCompany, currentUserId } = this.props;
    const { numShares } = this.state;
    buyStock(currentUserId, selectedCompany._id, numShares);
    this.setState({
      numShares: ''
    });
  }

  renderBuyButton() {
    return (
      <button type="button" onClick={this.handleBuyButtonClick}>
        Buy
      </button>
    );
  }

  renderSubmitButton() {
    const { buyStockLoading } = this.props;
    return (
      <button type="submit" onClick={this.handleSubmitButtonClick}>
        {
          buyStockLoading ? 'Submitting...' : 'Submit'
        }
      </button>
    );
  }

  render() {
    const { selectedCompany } = this.props;
    const {
      watching,
      numShares,
      estimatedCost,
      orderSummaryDisplay,
      orderButtonDisplay,
    } = this.state;

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
              <input
                type="number"
                name="shares"
                placeholder="0"
                ref={(input) => { this.sharesInput = input }}
                onChange={this.updateNumShares}
                value={numShares}
              />
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
                $
                { estimatedCost}
              </span>
            </div>

            <div className="order-summary buy-form-elem" style={{ display: orderSummaryDisplay }}>
              {`
                You are about to submit an order for ${numShares} share(s) to buy ${selectedCompany.symbol}
                for $${estimatedCost}. This order will execute at the best available price.
              `}
            </div>

            <div className="order-button-container">
              {
                orderButtonDisplay === 'Buy' ? this.renderBuyButton() : this.renderSubmitButton()
              }
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
