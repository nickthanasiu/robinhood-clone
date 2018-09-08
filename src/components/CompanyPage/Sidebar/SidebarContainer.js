import { connect } from 'react-redux';
import { followCompany, unfollowCompany } from '../../../actions/companies';
import { buyStock } from '../../../actions/stocks';
import Sidebar from './Sidebar';

const mapStateToProps = state => ({
  currentUserId: state.auth.currentUserId,
  followedCompanies: state.companies.followedCompanies,
  buyStockLoading: state.stocks.buyStockLoading,
});

const mapDispatchToProps = dispatch => ({
  followCompany: (currentUserId, companyId) => dispatch(followCompany(currentUserId, companyId)),
  unfollowCompany: (currentUserId, companyId) => dispatch(unfollowCompany(currentUserId, companyId)),
  buyStock: (currentUserId, companyId, shares) => dispatch(buyStock(currentUserId, companyId, shares)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
