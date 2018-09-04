import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions/companies';

import './style.scss';

class Sidebar extends Component {
  constructor(props) {
    super(props);

    this.currentUserId = localStorage.getItem('currentUserId');
  }

  componentDidMount() {
    console.log('SIDEBAR PROPS: ', this.props);
    const { getFollowedCompanies } = this.props;
    getFollowedCompanies(this.currentUserId);
  }

  render() {
    const { followedCompanies } = this.props;
    return (
      <div className="sidebar-container">

        <div className="sidebar">
          <div className="watchlist-header">
            Watchlist
          </div>
          <ul className="watchlist">
            {
              followedCompanies.map(company => (
                <li className="watchlist-item">
                  <span className="company-symbol">
                    { company.symbol }
                  </span>
                  <span className="company-price">
                    $
                    { company.price }
                  </span>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    followedCompanies: state.companies.followedCompanies,
  };
};

export default connect(mapStateToProps, actions)(Sidebar);
