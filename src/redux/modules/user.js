import axios from 'axios';

const FETCH_START = 'FETCH_START';
const FETCH_SUCCESS = 'FETCH_SUCCESS';
const FETCH_FAIL = 'FETCH_FAIL';
const initialState = {
  isFetching: false,
  error: false
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case FETCH_START:
      return {
        username: action.payload.username,
        ...state
      };
    case FETCH_SUCCESS:
      return {
        username: action.payload.username,
        profileData: action.payload.profileData,
        message: 'Success',
        ...state
      };
    case FETCH_FAIL:
      return {
        username: action.payload.username,
        message: action.payload.message,
        ...state
      };
    default:
      return state;
  }
}

const API_URL = 'http://api.github.com/users/';

export function fetchProfile(username) {
  const url = `${API_URL}${username}`;
  const request = axios.get(url);

  function fetchStart() {
    return {
      type: FETCH_START,
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
      type: FETCH_SUCCESS,
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
      type: FETCH_FAIL,
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
