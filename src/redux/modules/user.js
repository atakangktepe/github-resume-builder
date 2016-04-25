import axios from 'axios';

const USER_FETCH_START = 'USER_FETCH_START';
const USER_FETCH_SUCCESS = 'USER_FETCH_SUCCESS';
const RESET_USER = 'RESET_USER';
const USER_FETCH_FAIL = 'USER_FETCH_FAIL';
const initialState = {
  isFetching: false,
  error: false
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case USER_FETCH_START:
      return {
        username: action.payload.username,
        ...state
      };
    case USER_FETCH_SUCCESS:
      return {
        username: action.payload.username,
        profileData: action.payload.profileData,
        message: 'Success',
        ...state
      };
    case USER_FETCH_FAIL:
      return {
        username: action.payload.username,
        message: action.payload.message,
        ...state
      };
    case RESET_USER:
      return {
        state: initialState
      };
    default:
      return state;
  }
}

const API_URL = 'http://api.github.com/';

export function resetProfile() {
  return {
    type: RESET_USER
  };
}

export function fetchProfile(username) {
  const url = `${API_URL}users/${username}`;
  const request = axios.get(url);

  function fetchStart() {
    return {
      type: USER_FETCH_START,
      payload: {
        username,
        isFetching: true,
        error: false,
        message: ''
      }
    };
  }

  function fetchSuccess(profileData) {
    return {
      type: USER_FETCH_SUCCESS,
      payload: {
        message: 'Success',
        username,
        profileData,
        isFetching: false,
        error: false,
      }
    };
  }

  function fetchFail(errorMessage) {
    return {
      type: USER_FETCH_FAIL,
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
