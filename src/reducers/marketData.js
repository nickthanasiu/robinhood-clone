import {
  GET_INTRADAY_BEGIN,
  GET_INTRADAY_SUCCESS,
  GET_INTRADAY_ERROR,
  GET_DAILY_BEGIN,
  GET_DAILY_SUCCESS,
  GET_DAILY_ERROR,
} from '../actions/types';


const initialState = {
  loadingIntraday: false,
  intradayData: [],
  intradayError: '',
  loadingDaily: false,
  dailyData: [],
  dailyError: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_INTRADAY_BEGIN:
      return {
        ...state,
        loadingIntraday: true,
        intradayError: '',
      };
    case GET_INTRADAY_SUCCESS:
      return {
        ...state,
        loadingIntraday: false,
        intradayData: action.payload.data,
      };
    case GET_INTRADAY_ERROR:
      return {
        ...state,
        loadingIntraday: false,
        intradayError: action.payload.error,
        intradayData: [],
      };
    case GET_DAILY_BEGIN:
      return {
        ...state,
        loadingDaily: true,
        dailyError: '',
      };
    case GET_DAILY_SUCCESS:
      return {
        ...state,
        loadingDaily: false,
        dailyData: action.payload.data,
      };
    case GET_DAILY_ERROR:
      return {
        ...state,
        loadingDaily: false,
        dailyError: action.payload.error,
        dailyData: [],
      };
    default:
      return state;
  }
};
