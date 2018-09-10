import { connect } from 'react-redux';
import CompanyPage from './CompanyPage';

const mapStateToProps = state => ({
  selectedCompany: state.companies.selectedCompany,
});

export default connect(mapStateToProps)(CompanyPage);
