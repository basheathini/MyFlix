import React, {Component} from 'react';
import axios from 'axios';
import {Dimensions, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {defaultStyles} from '../Styles';

const {width, height} = Dimensions.get('window');
const cols = 2,
  rows = 3;

export default class GenreCard extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    axios
      .get(
        'https://api.themoviedb.org/3/genre/movie/list?api_key=0f60ad592a39d4b497a0d8889bba1be2',
      )
      .then(response => {
        this.setState({
          isLoading: false,
          genres: response.data.genres,
        });
      })
      .catch(error => console.log(error));
  }
  render() {
    const {genreid, genre, openGenre} = this.props;
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => openGenre(genreid, genre)}>
        <Text style={styles.genre} numberOfLines={1}>
          {genre}
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 3,
    marginRight: 3,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    borderRadius: 5,
    height: (height - 200 - 200) / rows - 10,
    width: (width - 4) / cols - 4,
  },
  genre: {
    ...defaultStyles.text,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 13,
    textAlignVertical: 'center',
    textAlign: 'center',
    lineHeight: 14,
  },
});
