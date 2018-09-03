/*eslint-disable*/
import axios from 'axios';
import {
  FETCH_ARTICLES_BEGIN,
  FETCH_ARTICLES_SUCCESS,
  FETCH_ARTICLES_ERROR,
} from './types';

const API_URL = 'http://localhost:3090/api';

const fetchArticlesBegin = () => ({
  type: FETCH_ARTICLES_BEGIN
});

const fetchArticlesSuccess = articles => ({
  type: FETCH_ARTICLES_SUCCESS,
  payload: { articles }
});

const fetchArticlesError = error => ({
  type: FETCH_ARTICLES_ERROR,
  payload: { error }
});

export const fetchArticles = query => async dispatch => {
  try {
    console.log('FIRING FETCH ARTICLES ACTION!');
    dispatch(fetchArticlesBegin());

    const response = await axios.post(`${API_URL}/newsfeed`, { query });
    const { articles } = response.data;

    console.log('FETCH ARTICLES RESPONSE: ', articles);
    dispatch(fetchArticlesSuccess(articles));
  } catch (err) {
    dispatch(fetchArticlesError(err));
  }
};
