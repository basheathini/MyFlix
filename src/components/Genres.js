import TimedSlideshow from 'react-native-timed-slideshow';
import React, {Component} from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import GenreCard from './GenreCard';

import Spinner from 'react-native-loading-spinner-overlay';
// import {connect} from 'react-redux';
// import {bindActionCreators} from 'redux';
import axios from 'axios';

// import fetchGenresAction from '../src/api';
// import {
//   getGenresError,
//   getGenres,
//   getGenresPending,
// } from '../src/reducers/genres';

const {height, width} = Dimensions.get('window');
const defaultHeight = height * 0.5;
const widthStyle = width * 0.9;
var itemList = [];
export default class Genres extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    genres: {},
    upcoming: {},
    isLoading: true,
  };

  openGenre = (genreid, genre) => {
    this.setState({
      genreid,
    });
    this.props.navigation.navigate('Movies', {
      genre: genreid,
      genreName: genre,
    });
  };

  componentDidMount() {
    axios
      .get(
        'https://api.themoviedb.org/3/genre/movie/list?api_key=0f60ad592a39d4b497a0d8889bba1be2',
      )
      .then(response => {
        this.setState({
          genres: response.data.genres,
        });
      })
      .catch(error => console.log(error));
    axios
      .get(
        'http://api.themoviedb.org/3/movie/upcoming?api_key=0f60ad592a39d4b497a0d8889bba1be2',
      )
      .then(response => {
        this.setState({
          isLoading: false,
          upcoming: response.data.results,
        });
      })
      .catch(error => console.log(error));
  }

  render() {
    if (!this.state.isLoading) {
      if (Object.keys(this.state.upcoming).length > 0) {
        this.state.upcoming.map(object => {
          var item = {
            uri: 'https://image.tmdb.org/t/p/w500/' + object.poster_path,
            title: object.title,
            text: object.release_date,
            duration: 7000,
          };
          itemList.push(item);
        });
      }
    }
    return !this.state.isLoading ? (
      <SafeAreaView style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}>
          <View style={styles.mainContainer}>
            <TimedSlideshow items={itemList} />
          </View>
          {this.state.genres.map(object => (
            <GenreCard
              genre={object.name}
              genreid={object.id}
              openGenre={this.openGenre}
              key={object.id}
            />
          ))}
        </ScrollView>
      </SafeAreaView>
    ) : (
      <Spinner
        visible={this.state.isLoading}
        textContent={'Loading...'}
        textStyle={styles.spinner}
      />
    );
  }
}

// const mapStateToProps = state => ({
//   error: getGenresError(state),
//   products: getGenres(state),
//   pending: getGenresPending(state),
// });

// const mapDispatchToProps = dispatch =>
//   bindActionCreators(
//     {
//       fetchGenres: fetchGenresAction,
//     },
//     dispatch,
//   );

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps,
// )(Genres);

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  scrollContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  mainContainer: {
    height: defaultHeight,
    marginBottom: 5,
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  avatar: {
    marginTop: 25,
    marginLeft: 10,
    backgroundColor: 'green',
  },
  avatarOverlay: {
    backgroundColor: 'green',
  },
  spinner: {
    textAlignVertical: 'center',
    textAlign: 'center',
    width: widthStyle,
  },
});
