import {
  COMPANY_SEARCH_BEGIN,
  COMPANY_SEARCH_SUCCESS,
  COMPANY_SEARCH_ERROR,
  FETCH_COMPANIES_BEGIN,
  FETCH_COMPANIES_SUCCESS,
  FETCH_COMPANIES_ERROR,
  FETCH_FOLLOWED_COMPANIES_BEGIN,
  FETCH_FOLLOWED_COMPANIES_SUCCESS,
  FETCH_FOLLOWED_COMPANIES_ERROR,
} from '../actions/types';

// @TODO: May want to add separate error messages for each action set

const initialState = {
  selectedCompany: {},
  allCompanies: [],
  followedCompanies: [],
  loadingCompany: false,
  loadingAllCompanies: false,
  loadingFollowedCompanies: false,
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
    case FETCH_COMPANIES_BEGIN:
      return {
        ...state,
        loadingAllCompanies: true,
        errorMessage: '',
      };
    case FETCH_COMPANIES_SUCCESS:
      return {
        ...state,
        loadingAllCompanies: false,
        allCompanies: action.payload.companies,
      };
    case FETCH_COMPANIES_ERROR:
      return {
        ...state,
        loadingAllCompanies: false,
        errorMessage: action.payload.error,
        allCompanies: [],
      };
    case FETCH_FOLLOWED_COMPANIES_BEGIN:
      return {
        ...state,
        loadingFollowedCompanies: true,
        errorMessage: '',
      };
    case FETCH_FOLLOWED_COMPANIES_SUCCESS:
      return {
        ...state,
        loadingFollowedCompanies: false,
        followedCompanies: action.payload,
      };
    case FETCH_FOLLOWED_COMPANIES_ERROR:
      return {
        ...state,
        loadingFollowedCompanies: false,
        errorMessage: action.payload,
        followedCompanies: [],
      };
    default:
      return state;
  }
};
