import axios from 'axios';

const REPO_FETCH_START = 'REPO_FETCH_START';
const REPO_FETCH_SUCCESS = 'REPO_FETCH_SUCCESS';
const RESET_REPO = 'RESET_REPO';
const REPO_FETCH_FAIL = 'REPO_FETCH_FAIL';
const initialState = {
  isFetching: false,
  error: false
};

export default function repos(state = initialState, action) {
  switch (action.type) {
    case REPO_FETCH_START:
      return {
        username: action.payload.username,
        ...state
      };
    case REPO_FETCH_SUCCESS:
      return {
        username: action.payload.username,
        data: action.payload.repoData,
        message: 'Success',
        ...state
      };
    case REPO_FETCH_FAIL:
      return {
        username: action.payload.username,
        message: action.payload.message,
        ...state
      };
    case RESET_REPO:
      return {
        state: initialState
      };
    default:
      return state;
  }
}

const API_URL = 'http://api.github.com/';

export function resetRepo() {
  return {
    type: RESET_REPO
  };
}

export function fetchRepos(username) {
  const url = `${API_URL}search/repositories?q=user:${username}&sort=stars&order=desc`;
  const request = axios.get(url);

  function fetchStart() {
    return {
      type: REPO_FETCH_START,
      payload: {
        username,
        isFetching: true,
        error: false,
        message: ''
      }
    };
  }

  function fetchSuccess(repoData) {
    return {
      type: REPO_FETCH_SUCCESS,
      payload: {
        message: 'Success',
        username,
        repoData,
        isFetching: false,
        error: false,
      }
    };
  }

  function fetchFail(errorMessage) {
    return {
      type: REPO_FETCH_FAIL,
      payload: {
        username,
        isFetching: false,
        error: true,
        message: errorMessage
      }
    };
  }

  return dispatch => {
    dispatch(fetchStart());
    request
      .then((res) => dispatch(fetchSuccess(res)))
      .catch((err) => dispatch(fetchFail(err)));
  };
}
