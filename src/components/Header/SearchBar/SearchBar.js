/*eslint-disable*/
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
      queryResults: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.queryResults = this.queryResults.bind(this);
  }

  componentDidMount() {
    const { getCompanies } = this.props;
    getCompanies();
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
      queryResults: [],
    });
  }

  handleClick(e) {
    e.preventDefault();
    const query = e.currentTarget.getAttribute('value');
    const { searchCompanies, history } = this.props;
    searchCompanies(query, () => {
      history.push('/company');
    });
  }

  handleInputChange(e) {
    const { query } = this.state;
    this.setState({
      query: e.target.value,
    }, () => {
      this.queryResults();
    });
  }

  queryResults() {
    const { companies } = this.props;
    this.setState({
      queryResults: companies.filter((company) => {
        return company.name.includes(this.state.query);
      })
    });
  }

  render() {
    const { queryResults } = this.state;
    return (
      <div className="search-container">
        <div className="search-wrapper">
          <form onSubmit={this.handleSubmit}>
            <input
              className="search-input"
              type="text"
              placeholder="Search..."
              ref={input => this.search = input}
              onChange={this.handleInputChange}
            />
          </form>
        </div>
        <ul className="query-results">
          {
            queryResults.length === 0 ? null :
              queryResults.map(result => (
                <li
                  className="query-results-item"
                  key={result._id}
                  value={result.name}
                  onClick={this.handleClick}
                >
                  <div className="result-wrapper">
                    <span className="result-symbol">
                      { result.symbol }
                    </span>
                    <span className="result-name">
                      { result.name }
                    </span>
                  </div>
                </li>
              ))
          }
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    companies: state.companies.allCompanies,
  };
};

export default compose(
  connect(mapStateToProps, actions),
  withRouter
)(SearchBar);
