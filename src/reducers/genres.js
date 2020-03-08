import {
  FETCH_GENRES_PENDING,
  FETCH_GENRES_SUCCESS,
  FETCH_GENRES_ERROR,
} from '../actions/genres';

const initialState = {
  pending: false,
  genres: [],
  error: null,
};

export function genresReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_GENRES_PENDING:
      return {
        ...state,
        pending: true,
      };
    case FETCH_GENRES_SUCCESS:
      return {
        ...state,
        pending: false,
        genres: action.payload,
      };
    case FETCH_GENRES_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    default:
      return state;
  }
}

export const getGenres = state => state.genres;
export const getGenresPending = state => state.pending;
export const getGenresError = state => state.error;
