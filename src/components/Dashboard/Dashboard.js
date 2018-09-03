import React from 'react';
import Header from '../Header';
import Chart from './Chart';
import SideBar from './Sidebar';
import requireAuth from '../requireAuth';

import './style.scss';

const Dashboard = () => (
  <div className="dashboard">

    <div className="column-left">
      <div className="dashboard-header">
        <h2 className="portfolio-value">
          $4.17
        </h2>
        <span className="value-change">
          +$0.40 (1.18%)
          <span className="timespan">
            Today
          </span>
        </span>
      </div>

      <div className="chart-container">
        <Chart />
      </div>
    </div>

    <div className="column-right">
      <div className="sidebar-container">
        <SideBar />
      </div>
    </div>

  </div>
);

const DashWithHeader = Header(Dashboard);

export default Header(Dashboard);