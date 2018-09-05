import {
  FETCH_STOCKS_BEGIN,
  FETCH_STOCKS_SUCCESS,
  FETCH_STOCKS_ERROR,
} from '../actions/types';

const initialState = {
  myStocks: [],
  loadingStocks: false,
  stocksError: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_STOCKS_BEGIN:
      return {
        ...state,
        loadingStocks: true,
        stocksError: '',
      };
    case FETCH_STOCKS_SUCCESS:
      return {
        ...state,
        loadingStocks: false,
        myStocks: action.payload.stocks,
      };
    case FETCH_STOCKS_ERROR:
      return {
        ...state,
        loadingStocks: false,
        stocksError: action.payload.error,
        myStocks: [],
      };
    default:
      return state;
  }
};
