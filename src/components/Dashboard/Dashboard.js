import React, { Component } from 'react';
import Header from '../Header';
import Chart from './Chart';
import SideBar from './Sidebar';
import NewsFeed from './NewsFeed';
import requireAuth from '../requireAuth';

import './style.scss';

class Dashboard extends Component {

  componentDidMount() {
    const { getFollowedCompanies, currentUserId } = this.props;
    getFollowedCompanies(currentUserId);
  }

  componentWillReceiveProps(newProps) {
    console.log('RECEIVING THESE ARTICLES', newProps.articles);
    console.log('AND THESE FOLLOWEDCOMPANIES: ', newProps.followedCompanies);
    if (newProps.followedCompanies !== this.props.followedCompanies) {
      newProps.fetchFollowedArticles(newProps.followedCompanies);
    }
  }

  render() {
    const { followedCompanies, currentUserId, articles } = this.props;
    return (
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

          <div className="newsfeed-container">
            <NewsFeed
              articles={articles}
            />
          </div>
        </div>

        <div className="column-right">
          <div className="sidebar-container">
            <SideBar
              followedCompanies={followedCompanies}
              currentUserId={currentUserId}
            />
          </div>
        </div>


      </div>
    );
  }
}

const DashWithHeader = Header(Dashboard);

export default DashWithHeader;
