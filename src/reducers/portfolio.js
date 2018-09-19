import {
  GET_PORTFOLIO_BEGIN,
  GET_PORTFOLIO_SUCCESS,
  GET_PORTFOLIO_ERROR,
} from '../actions/types';


const initialState = {
  portfolioValue: 0,
  loadingPortfolio: false,
  portfolioError: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PORTFOLIO_BEGIN:
      return {
        ...state,
        loadingPortfolio: true,
        portfolioError: '',
      };
    case GET_PORTFOLIO_SUCCESS:
      return {
        ...state,
        loadingPortfolio: false,
        portfolioValue: action.payload.value,
      };
    case GET_PORTFOLIO_ERROR:
      return {
        ...state,
        loadingPortfolio: false,
        portfolioError: action.payload.error,
        portfolioValue: 0,
      };
    default:
      return state;
  }
};
