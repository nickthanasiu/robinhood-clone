import React from 'react';

import './style.scss';

const MyStocks = () => (
  <div className="my-stocks">
    <h6>
      My Stocks
    </h6>
    <ul className="my-stocks-list">
      <li className="my-stocks-list-item">
        <span className="stock-name">
          Twitter
        </span>

        <span className="stock-price">
          $72.43
        </span>
      </li>
    </ul>
  </div>
);

export default MyStocks;
