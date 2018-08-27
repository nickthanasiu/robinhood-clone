import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/companies';

import './style.scss';

class CompanyPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      following: false,
    };
    this.followStock = this.followStock.bind(this);
  }

  componentDidMount() {
    const { selectedCompany, followedCompanies } = this.props;
    console.log(this.props);
  }


  followStock() {
    const { followCompany, selectedCompany } = this.props;
    const currentUserId = localStorage.getItem('currentUserId');
    followCompany(currentUserId, selectedCompany._id);
  }

  render() {
    const company = this.props.selectedCompany;
    const { following } = this.state;
    return (
      <div className="company-page">
        <div className="company-header">
          <h2 className="company-name">
            { company.name }
          </h2>
          <h5 className="company-price">
            $
            { company.price }
          </h5>

          <span className="price-change">
            +$0.40 (1.18%) Today
          </span>
        </div>

        <div className="company-about">
          <h3>
            About
          </h3>

          <p className="company-description">
            { company.name} is a company you should invest in....
          </p>

          <div className="company-ceo">
            CEO
            <span>
              { company.ceo }
            </span>
          </div>

          <div className="company-employees">
            Employees
            <span>
              { company.employees }
            </span>
          </div>

          <div className="company-hq">
            Headquarters
            <span>
              { company.hq }
            </span>
          </div>

          <div className="company-founded">
            Founded
            <span>
              { company.founded }
            </span>
          </div>

          <div className="company-market-cap">
            Market Cap
            <span>
              { company.marketCap }
            </span>
          </div>

          <div className="company-price-earnings-ratio">
            Price-Earnings Ratio
            <span>
              { company.priceEarningsRatio }
            </span>
          </div>

          <div className="company-dividend-yield">
            Dividend Yield
            <span>
              { company.dividendYield }
            </span>
          </div>

          <div className="company-average-volume">
            Average Volume
            <span>
              { company.averageVolume }
            </span>
          </div>
        </div>
        <div>
          Buy { company.symbol }

          <button
            type="button"
            onClick={this.followStock}
          >
            {
              following ? 'Unfollow' : 'Follow'
            }
            { company.symbol }
          </button>
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

export default connect(
  mapStateToProps,
  actions
)(CompanyPage);
