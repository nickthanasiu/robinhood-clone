import React from 'react';

const BuyForm = props => (
  <div className="buy-form">
    <form>
      <div className="shares order-form-elem">
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

      <div className="market-price order-form-elem">
        <span>
          Market Price
        </span>
        <span>
          { selectedCompany.price }
        </span>
      </div>

      <div className="estimated-cost order-form-elem">
        <span>
          Estimated Cost
        </span>
        <span>
          $
          { estimatedCost}
        </span>
      </div>

      <div className="order-summary order-form-elem" style={{ display: orderSummaryDisplay }}>
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
);

export default BuyForm;
