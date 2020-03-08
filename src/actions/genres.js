export const FETCH_GENRES_PENDING = 'FETCH_GENRES_PENDING';
export const FETCH_GENRES_SUCCESS = 'FETCH_GENRES_SUCCESS';
export const FETCH_GENRES_ERROR = 'FETCH_GENRES_ERROR';

function fetchGenresPending() {
  return {
    type: FETCH_GENRES_PENDING,
  };
}

function fetchGenresSuccess(genres) {
  return {
    type: FETCH_GENRES_SUCCESS,
    genres: genres,
  };
}

function fetchGenresError(error) {
  return {
    type: FETCH_GENRES_ERROR,
    error: error,
  };
}
