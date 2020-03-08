import React, {Component} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {defaultStyles} from '../Styles';

const {width, height} = Dimensions.get('window');
const cols = 1,
  rows = 1;

export default class MoviePoster extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      movie,
      genre,
      movie: {
        popularity,
        vote_count,
        video,
        poster_path,
        id,
        adult,
        backdrop_path,
        original_language,
        original_title,
        genre_ids,
        title,
        vote_average,
        overview,
        release_date,
      },
      onOpen,
    } = this.props;
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => onOpen(movie, genre)}>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
            }}
            style={styles.image}
          />
        </View>
        <Text style={styles.title} numberOfLines={1}>
          {movie.title} - {genre}
        </Text>
        <Text style={styles.title} numberOfLines={1}>
          {movie.vote_average} rating
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 10,
    marginBottom: 10,
    height: (height - 250 - 250) / rows - 10,
    width: (width - 10) / cols - 10,
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    borderRadius: 3,
    ...StyleSheet.absoluteFillObject,
  },
  title: {
    ...defaultStyles.text,
    fontSize: 16,
    marginTop: 4,
  },
  genre: {
    ...defaultStyles.text,
    fontSize: 12,
    lineHeight: 14,
  },
});
