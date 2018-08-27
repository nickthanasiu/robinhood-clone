import React from 'react';
import Header from '../Header';
import MyStocks from './MyStocks';
import requireAuth from '../requireAuth';

import './style.scss';

const Dashboard = () => (
  <div className="home-page">
    <MyStocks />
  </div>
);

const DashWithHeader = Header(Dashboard);

export default DashWithHeader;
