import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/companies';
import Header from '../Header';
import Chart from './Chart';
import NewsFeed from './NewsFeed';
import SideBar from './Sidebar';

import './style.scss';

class CompanyPage extends Component {
  constructor(props) {
    super(props);
    // @TODO: MOVE STATE TO REDUX STORE?
    this.state = {
      following: false,
    };

    this.currentUserId = localStorage.getItem('currentUserId');

    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.followStock = this.followStock.bind(this);
    this.unfollowStock = this.unfollowStock.bind(this);
  }

  componentDidMount() {
    const { selectedCompany, followedCompanies } = this.props;
    const index = followedCompanies.map((company) => {
      return company._id;
    }).indexOf(selectedCompany._id);
    if (index !== -1) {
      this.setState({
        following: true,
      });
    }
  }

  handleButtonClick() {
    // if following, unfollow, otherwise follow
    const { following } = this.state;
    if (!following) {
      this.followStock();
    } else {
      this.unfollowStock()
    }
  }

  followStock() {
    const { followCompany, selectedCompany } = this.props;
    followCompany(this.currentUserId, selectedCompany._id);
    this.setState({
      following: true
    });
  }

  unfollowStock() {
    const { unfollowCompany, selectedCompany } = this.props;
    unfollowCompany(this.currentUserId, selectedCompany._id);
    this.setState({
      following: false
    });
  }

  render() {
    const { selectedCompany } = this.props;
    const { following } = this.state;
    return (
      <div className="company-page">
        <div className="column-left">
          <div className="company-header">
            <h2 className="company-name">
              { selectedCompany.name }
            </h2>
            <h2 className="company-price">
              { selectedCompany.price }
            </h2>

            <span className="price-change">
              +$0.40 (1.18%)
              <span className="timespan">
                Today
              </span>
            </span>
          </div>

          <div className="chart-container">
            <Chart />
          </div>

          <div className="company-about">
            <h3>
              About
            </h3>

            <p className="company-description">
              { selectedCompany.description }
            </p>

            <div className="company-about-grid">

              <div className="grid-col">
                <div className="company-ceo">
                  <span className="label">
                    CEO
                  </span>
                  <span>
                    { selectedCompany.ceo }
                  </span>
                </div>
                <div className="company-market-cap">
                  <span className="label">
                    Market Cap
                  </span>
                  <span>
                    { selectedCompany.marketCap }
                  </span>
                </div>
              </div>

              <div className="grid-col">
                <div className="company-employees">
                  <span className="label">
                    Employees
                  </span>
                  <span>
                    { selectedCompany.employees }
                  </span>
                </div>
                <div className="company-price-earnings-ratio">
                  <span className="label">
                    Price-Earnings Ratio
                  </span>
                  <span>
                    { selectedCompany.priceEarningsRatio }
                  </span>
                </div>
              </div>

              <div className="grid-col">
                <div className="company-hq">
                  <span className="label">
                    Headquarters
                  </span>
                  <span>
                    { selectedCompany.hq }
                  </span>
                </div>
                <div className="company-dividend-yield">
                  <span className="label">
                    Dividend Yield
                  </span>
                  <span>
                    { selectedCompany.dividendYield }
                  </span>
                </div>
              </div>

              <div className="grid-col">
                <div className="company-founded">
                  <span className="label">
                    Founded
                  </span>
                  <span>
                    { selectedCompany.founded }
                  </span>
                </div>
                <div className="company-average-volume">
                  <span className="label">
                    Average Volume
                  </span>
                  <span>
                    { selectedCompany.averageVolume }
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="newsfeed-container">
            <NewsFeed
              company={selectedCompany}
            />
          </div>
        </div>

        <div className="column-right">
          <div className="sidebar-container">
            <SideBar
              company={selectedCompany}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    selectedCompany: state.companies.selectedCompany,
    followedCompanies: state.companies.followedCompanies,
  };
}

const CompanyPageWithHeader = Header(CompanyPage);

export default connect(
  mapStateToProps,
  actions
)(CompanyPageWithHeader);
