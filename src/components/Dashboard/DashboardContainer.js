import { connect } from 'react-redux';
import { getFollowedCompanies } from '../../actions/companies';
import { getMyStocks } from '../../actions/stocks';
import { fetchFollowedArticles } from '../../actions/newsfeed';
import { getPortfolioValue, getPortfolioIntraday } from '../../actions/portfolio';
import Dashboard from './Dashboard';

const mapStateToProps = state => ({
  followedCompanies: state.companies.followedCompanies,
  myStocks: state.stocks.myStocks,
  currentUserId: state.auth.currentUserId,
  articles: state.newsfeed.articles,
  loadingArticles: state.newsfeed.loadingArticles,
  portfolioValue: state.portfolio.portfolioValue,
  loadingPortfolio: state.portfolio.timespan,
  portfolioIntradayData: state.portfolio.portfolioIntradayData,
  loadingPortfolioIntra: state.portfolio.loadingPortfolioIntra,
});

const mapDispatchToProps = dispatch => ({
  getFollowedCompanies: currentUserId => dispatch(getFollowedCompanies(currentUserId)),
  getMyStocks: currentUserId => dispatch(getMyStocks(currentUserId)),
  fetchFollowedArticles: queryArray => dispatch(fetchFollowedArticles(queryArray)),
  getPortfolioValue: currentUserId => dispatch(getPortfolioValue(currentUserId)),
  getPortfolioIntraday: symbols => dispatch(getPortfolioIntraday(symbols)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
