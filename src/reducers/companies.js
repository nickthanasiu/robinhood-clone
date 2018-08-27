import {
  COMPANY_SEARCH_BEGIN,
  COMPANY_SEARCH_SUCCESS,
  COMPANY_SEARCH_ERROR,
  FETCH_FOLLOWED_COMPANIES_BEGIN,
  FETCH_FOLLOWED_COMPANIES_SUCCESS,
  FETCH_FOLLOWED_COMPANIES_ERROR,
} from '../actions/types';

const initialState = {
  selectedCompany: {},
  followedCompanies: [],
  loadingCompany: false,
  fetchingCompanies: false,
  errorMessage: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case COMPANY_SEARCH_BEGIN:
      return {
        ...state,
        loadingCompany: true,
        errorMessage: '',
      };
    case COMPANY_SEARCH_SUCCESS:
      return {
        ...state,
        loadingCompany: false,
        selectedCompany: action.payload,
      };
    case COMPANY_SEARCH_ERROR:
      return {
        ...state,
        loadingCompany: false,
        errorMessage: action.payload,
        selectedCompany: {},
      };
    case FETCH_FOLLOWED_COMPANIES_BEGIN:
      return {
        ...state,
        fetchingCompanies: true,
        errorMessage: '',
      };
    case FETCH_FOLLOWED_COMPANIES_SUCCESS:
      return {
        ...state,
        fetchingCompanies: false,
        followedCompanies: action.payload,
      };
    case FETCH_FOLLOWED_COMPANIES_ERROR:
      return {
        ...state,
        fetchingCompanies: false,
        errorMessage: action.payload,
        followedCompanies: [],
      };
    default:
      return state;
  }
};
