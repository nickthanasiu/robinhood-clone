import { connect } from 'react-redux';
import { getLatestPrice } from '../../actions/marketData';
import CompanyPage from './CompanyPage';

const mapStateToProps = state => ({
  selectedCompany: state.companies.selectedCompany,
});

const mapDispatchToProps = dispatch => ({
  getLatestPrice: symbol => dispatch(getLatestPrice(symbol)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CompanyPage);
