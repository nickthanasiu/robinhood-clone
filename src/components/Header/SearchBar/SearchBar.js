import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../../../actions/companies';

import './style.scss';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateQuery = this.updateQuery.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { query } = this.state;
    const { searchCompanies, history } = this.props;
    searchCompanies(query, () => {
      history.push('/company');
    });
    this.setState({
      query: '',
    });
  }

  updateQuery(e) {
    this.setState({
      query: e.target.value,
    });
  }

  render() {
    const { query } = this.state;
    return (
      <div className="search-wrapper">
        <form onSubmit={this.handleSubmit}>
          <input
            className="search-input"
            type="text"
            placeholder="Search..."
            value={query}
            onChange={this.updateQuery}
          />
        </form>
      </div>
    );
  }
}

export default compose(
  connect(null, actions),
  withRouter
)(SearchBar);
