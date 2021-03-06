/*eslint-disable*/
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

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
    const { queryResults, query } = this.state;
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
            query === '' ? null :
              queryResults.map(result => (
                <li
                  className="query-results-item"
                  key={result._id}
                  value={result.name}
                  onClick={this.handleClick}
                >
                  <div className="result-wrapper">
                    <div className="result-symbol">
                      { result.symbol }
                    </div>
                    <div className="result-name">
                      { result.name }
                    </div>
                  </div>
                </li>
              ))
          }
        </ul>
      </div>
    );
  }
}

export default withRouter(SearchBar);
