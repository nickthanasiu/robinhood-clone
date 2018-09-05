import {
  FETCH_STOCKS_BEGIN,
  FETCH_STOCKS_SUCCESS,
  FETCH_STOCKS_ERROR,
  BUY_STOCK_BEGIN,
  BUY_STOCK_SUCCESS,
  BUY_STOCK_ERROR,
} from '../actions/types';

const initialState = {
  myStocks: [],
  loadingMyStocks: false,
  myStocksError: '',
  buyStockError: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_STOCKS_BEGIN:
      return {
        ...state,
        loadingMyStocks: true,
        myStocksError: '',
      };
    case FETCH_STOCKS_SUCCESS:
      return {
        ...state,
        loadingMyStocks: false,
        myStocks: action.payload.stocks,
      };
    case FETCH_STOCKS_ERROR:
      return {
        ...state,
        loadingMyStocks: false,
        myStocksError: action.payload.error,
        myStocks: [],
      };
    case BUY_STOCK_ERROR:
      return {
        ...state,
        buyStockError: action.payload.error,
      };
    default:
      return state;
  }
};
