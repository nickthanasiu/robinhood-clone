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
  }

  render() {
    return (
      <div className="sidebar">

        <div className="watchlist">
          <div className="watchlist-header">
            Watchlist
          </div>

        </div>
      </div>
    );
  }
}

export default connect(null, actions)(Sidebar);
