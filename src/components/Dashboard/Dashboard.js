import React, { Component } from 'react';
import Header from '../Header';
import Chart from './Chart';
import SideBar from './Sidebar';
import NewsFeed from './NewsFeed';
import requireAuth from '../requireAuth';

import './style.scss';

class Dashboard extends Component {

  componentDidMount() {
    const {
      getFollowedCompanies,
      getMyStocks,
      getPortfolioValue,
      currentUserId
    } = this.props;
    getFollowedCompanies(currentUserId);
    getMyStocks(currentUserId);
    getPortfolioValue(currentUserId);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.followedCompanies !== this.props.followedCompanies) {
      newProps.fetchFollowedArticles(newProps.followedCompanies);
    }

    if (newProps.myStocks !== this.props.myStocks) {
      const symbols = newProps.myStocks.map((stock) => {
        return stock.symbol;
      });
      newProps.getPortfolioIntraday(symbols);
    }
  }

  render() {
    const {
      followedCompanies,
      myStocks,
      currentUserId,
      articles,
      loadingArticles,
      portfolioValue
    } = this.props;

    return (
      <div className="dashboard">

        <div className="column-left">
          <div className="dashboard-header">
            <h2 className="portfolio-value">
              {`
                $${portfolioValue}
              `}
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
              loadingArticles={loadingArticles}
            />
          </div>
        </div>

        <div className="column-right">
          <div className="sidebar-container">
            <SideBar
              followedCompanies={followedCompanies}
              myStocks={myStocks}
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
