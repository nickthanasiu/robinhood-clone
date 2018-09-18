import { connect } from 'react-redux';
import { getFollowedCompanies } from '../../actions/companies';
import { fetchFollowedArticles } from '../../actions/newsfeed';
import Dashboard from './Dashboard';

const mapStateToProps = state => ({
  followedCompanies: state.companies.followedCompanies,
  currentUserId: state.auth.currentUserId,
  articles: state.newsfeed.articles,
  loadingArticles: state.newsfeed.loadingArticles,
});

const mapDispatchToProps = dispatch => ({
  getFollowedCompanies: currentUserId => dispatch(getFollowedCompanies(currentUserId)),
  fetchFollowedArticles: queryArray => dispatch(fetchFollowedArticles(queryArray)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
