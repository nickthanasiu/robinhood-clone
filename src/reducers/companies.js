import {
  COMPANY_SEARCH_BEGIN,
  COMPANY_SEARCH_SUCCESS,
  COMPANY_SEARCH_ERROR,
} from '../actions/types';

const initialState = {
  selectedCompany: {},
  loadingCompanies: false,
  errorMessage: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case COMPANY_SEARCH_BEGIN:
      return {
        ...state,
        loadingCompanies: true,
      };
    case COMPANY_SEARCH_SUCCESS:
      return {
        ...state,
        loadingCompanies: false,
        selectedCompany: action.payload,
      };
    case COMPANY_SEARCH_ERROR:
      return {
        ...state,
        loadingCompanies: false,
        errorMessage: action.payload,
        selectedCompany: {},
      };
    default:
      return state;
  }
};
