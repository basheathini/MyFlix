import {
  FETCH_MOVIES_PENDING,
  FETCH_MOVIES_SUCCESS,
  FETCH_MOVIES_ERROR,
} from '../actions/movies';

const initialState = {
  pending: false,
  movies: [],
  error: null,
};

export function moviesReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_MOVIES_PENDING:
      return {
        ...state,
        pending: true,
      };
    case FETCH_MOVIES_SUCCESS:
      return {
        ...state,
        pending: false,
        movies: action.payload,
      };
    case FETCH_MOVIES_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    default:
      return state;
  }
}

export const getMovies = state => state.movies;
export const getMoviesPending = state => state.pending;
export const getMoviesError = state => state.error;
