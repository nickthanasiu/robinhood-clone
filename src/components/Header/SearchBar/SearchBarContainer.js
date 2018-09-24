import { connect } from 'react-redux';
import { getCompanies, searchCompanies } from '../../../actions/companies';
import SearchBar from './SearchBar';

const mapStateToProps = state => ({
  companies: state.companies.allCompanies,
});

const mapDispatchToProps = dispatch => ({
  getCompanies: () => dispatch(getCompanies()),
  searchCompanies: (query, callback) => dispatch(searchCompanies(query, callback)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
