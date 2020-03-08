import {
  fetchGenresPending,
  fetchGenresSuccess,
  fetchGenresError,
} from './actions/genres';

export default function fetchGenres() {
  return dispatch => {
    dispatch(fetchGenresPending());
    fetch(
      'https://api.themoviedb.org/3/genre/movie/list?api_key=0f60ad592a39d4b497a0d8889bba1be2',
    )
      .then(response => response.json())
      .then(response => {
        if (response.error) {
          throw response.error;
        }
        dispatch(fetchGenresSuccess(response.data.genres));
        return response.data.genres;
      })
      .catch(error => {
        dispatch(fetchGenresError(error));
      });
  };
}

// export default function fetchMovies(genre) {
//     return dispatch => {
//         dispatch(fetchMoviesPending());
//         fetch(`https://api.themoviedb.org/3/discover/movie?api_key=0f60ad592a39d4b497a0d8889bba1be2&language=en-US&with_genres=${genre}&include_video=true`)
//         .then(res => res.json())
//         .then(res => {
//             if(res.error) {
//                 throw(res.error);
//             }
//             dispatch(fetchMoviesSuccess(res.products))
//             return res.products;
//         })
//         .catch(error => {
//             dispatch(fetchMoviesError(error));
//         })
//     }
// }

// export default function fetchUpcoming(genre) {
//     return dispatch => {
//         dispatch(fetchMoviesPending());
//         fetch(`https://api.themoviedb.org/3/discover/movie?api_key=0f60ad592a39d4b497a0d8889bba1be2&language=en-US&with_genres=${genre}&include_video=true`)
//         .then(res => res.json())
//         .then(res => {
//             if(res.error) {
//                 throw(res.error);
//             }
//             dispatch(fetchMoviesSuccess(res.products))
//             return res.products;
//         })
//         .catch(error => {
//             dispatch(fetchMoviesError(error));
//         })
//     }
// }
