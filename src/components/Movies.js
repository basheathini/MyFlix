import React, {Component} from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Dimensions,
} from 'react-native';
import axios from 'axios';
import MoviePoster from './MovieCard';
import MoviePopup from './MoviePopup';
import Spinner from 'react-native-loading-spinner-overlay';
const {width} = Dimensions.get('window');
const widthStyle = width * 0.9;
export default class Movies extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    popupIsOpen: false,
    chosenDay: 0,
    chosenTime: null,
    movies: {},
    movie: '',
    isLoading: true,
    search: '',
    genre: '',
    index: 1,
  };
  openMovie = (movie, genre) => {
    this.setState({
      popupIsOpen: true,
      movie,
      genre,
    });
  };

  closeMovie = () => {
    this.setState({
      popupIsOpen: false,
      chosenDay: 0,
      chosenTime: null,
    });
  };
  chosenDay = day => {
    this.setState({
      chosenDay: day,
    });
  };
  chosenTime = time => {
    this.setState({
      chosenTime: time,
    });
  };
  bookTicket = id => {
    this.props.navigation.navigate('Player');
  };
  state = {
    search: '',
  };
  state = {
    index: 1,
  };
  componentDidMount() {
    axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?api_key=0f60ad592a39d4b497a0d8889bba1be2&language=en-US&with_genres=${
          this.props.route.params.genre
        }&include_video=true`,
      )
      .then(response => {
        this.setState({
          movies: response.data.results,
          isLoading: false,
        });
      });
  }

  search(name) {
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?query=${name}&with_genres=${
          this.props.route.params.genre
        }&api_key=0f60ad592a39d4b497a0d8889bba1be2`,
      )
      .then(response => {
        this.setState({
          movies: response.data.results,
          isLoading: false,
        });
      });
  }
  loadContent(index) {
    axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?api_key=0f60ad592a39d4b497a0d8889bba1be2&language=en-US&with_genres=${
          this.props.route.params.genre
        }&include_video=true&page=${index}`,
      )
      .then(response => {
        this.setState({
          movies: response.data.results,
          isLoading: false,
        });
      });
  }

  render() {
    return this.state.movies !== undefined ? (
      <View style={styles.container}>
        <SafeAreaView>
          <TextInput
            style={styles.searchBox}
            placeholder="Search for A movie..."
            onChangeText={text => {
              this.search(text);
              this.setState({
                search: text,
              });
            }}
          />
          {!this.state.isLoading ? (
            <ScrollView
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              scrollEventThrottle={16}
              ref={ref => (this.scrollview = ref)}
              onScroll={event => {
                let padding = 0;
                padding += event.nativeEvent.layoutMeasurement.height;
                if (
                  event.nativeEvent.contentOffset.y >=
                  event.nativeEvent.contentSize.height - padding
                ) {
                  var index = this.state.index + 1;
                  this.setState({
                    index: index,
                    isLoading: true,
                  });
                  if (!this.state.isLoading) {
                    this.loadContent(index);
                  }
                }
              }}>
              {this.state.movies.map(movie => (
                <MoviePoster
                  movie={movie}
                  onOpen={this.openMovie}
                  key={movie.id}
                  genre={this.props.route.params.genreName}
                />
              ))}
            </ScrollView>
          ) : (
            <Spinner
              visible={this.state.isLoading}
              textContent={'Loading...'}
              textStyle={styles.spinner}
            />
          )}
        </SafeAreaView>
        <MoviePopup
          movie={this.state.movie}
          isOpen={this.state.popupIsOpen}
          onClose={this.closeMovie}
          chosenDay={this.state.chosenDay}
          chosenTime={this.state.chosenTime}
          onChooseDay={this.chooseDay}
          onChooseTime={this.chooseTime}
          onBook={this.bookTicket}
          genre={this.state.genre}
        />
      </View>
    ) : (
      <View />
    );
  }
}
const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    backgroundColor: 'white',
  },
  scrollContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  searchBox: {
    height: 50,
    marginLeft: 11,
    marginRight: 11,
    fontSize: 18,
    borderColor: 'silver',
    borderRadius: 5,
    textAlign: 'center',
    borderWidth: 1.0,
    marginBottom: 5,
  },
  spinner: {
    textAlignVertical: 'center',
    textAlign: 'center',
    width: widthStyle,
    fontSize: 12,
  },
});
