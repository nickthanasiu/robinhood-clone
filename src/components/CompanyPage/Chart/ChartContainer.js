import { connect } from 'react-redux';
import { getIntraday } from '../../../actions/marketData';
import Chart from './Chart';

const mapStateToProps = state => ({
  loadingIntraday: state.marketData.loadingIntraday,
  intradayData: state.marketData.intradayData,
});

const mapDispatchToProps = dispatch => ({
  getIntraday: symbol => dispatch(getIntraday(symbol)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Chart);
