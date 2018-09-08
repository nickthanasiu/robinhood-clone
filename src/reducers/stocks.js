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
  buyStockLoading: false,
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
    case BUY_STOCK_BEGIN:
      return {
        ...state,
        buyStockLoading: true,
        buyStockError: '',
      };
    case BUY_STOCK_SUCCESS:
      return {
        ...state,
        buyStockLoading: false,
      };
    case BUY_STOCK_ERROR:
      return {
        ...state,
        buyStockLoading: false,
        buyStockError: action.payload.error,
      };
    default:
      return state;
  }
};
