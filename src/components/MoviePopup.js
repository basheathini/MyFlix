import React, {Component} from 'react';
import {
  Animated,
  Dimensions,
  Image,
  LayoutAnimation,
  PanResponder,
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableHighlight,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {Rating} from 'react-native-elements';
import {defaultStyles} from '../Styles';
const {width, height} = Dimensions.get('window');
const defaultHeight = height * 0.67;

export default class MoviePopup extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    position: new Animated.Value(this.props.isOpen ? 0 : height),
    opacity: new Animated.Value(0),
    height: defaultHeight,
    expanded: false,
    visible: this.props.isOpen,
  };
  previousHeight = 0;
  componentWillMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        const {dx, dy} = gestureState;
        if (dx !== 0 && dy === 0) {
          return true;
        }
        return false;
      },
      onPanResponderGrant: (evt, gestureState) => {
        this.previousHeight = this.state.height;
      },
      onPanResponderMove: (evt, gestureState) => {
        const {dy, vy} = gestureState;
        let newHeight = this.previousHeight - dy;
        LayoutAnimation.easeInEaseOut();
        if (newHeight > height - height / 5) {
          this.setState({expanded: true});
        } else {
          this.setState({expanded: false});
        }
        if (vy < -0.75) {
          this.setState({
            expanded: true,
            height: height,
          });
        }
        if (vy > 0.75) {
          this.props.onClose();
        } else if (newHeight < defaultHeight * 0.75) {
          this.props.onClose();
        } else if (newHeight > height) {
          this.setState({height: height});
        } else {
          this.setState({height: newHeight});
        }
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        const {dy} = gestureState;
        const newHeight = this.previousHeight - dy;
        if (newHeight < defaultHeight) {
          this.props.onClose();
        }
        this.previousHeight = this.state.height;
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        return true;
      },
    });
  }
  componentWillReceiveProps(nextProps) {
    if (!this.props.isOpen && nextProps.isOpen) {
      this.animateOpen();
    } else if (this.props.isOpen && !nextProps.isOpen) {
      this.animateClose();
    }
  }
  animateOpen() {
    this.setState({visible: true}, () => {
      Animated.parallel([
        Animated.timing(this.state.opacity, {toValue: 0.5}),
        Animated.timing(this.state.position, {toValue: 0}),
      ]).start();
    });
  }
  animateClose() {
    Animated.parallel([
      Animated.timing(this.state.opacity, {toValue: 0}),
      Animated.timing(this.state.position, {toValue: height}),
    ]).start(() =>
      this.setState({
        height: defaultHeight,
        expanded: false,
        visible: false,
      }),
    );
  }
  getStyles = () => {
    return {
      imageContainer: this.state.expanded
        ? {
            width: width / 2,
          }
        : {
            maxWidth: 110,
            marginRight: 10,
          },
      movieContainer: this.state.expanded
        ? {
            flexDirection: 'column',
            alignItems: 'center',
          }
        : {
            flexDirection: 'row',
          },
      movieInfo: this.state.expanded
        ? {
            flex: 0,
            alignItems: 'center',
            paddingTop: 20,
          }
        : {
            flex: 1,
            justifyContent: 'center',
          },
      title: this.state.expanded
        ? {
            textAlign: 'center',
          }
        : {},
    };
  };

  render() {
    const {movie, genre} = this.props;

    const {
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
    } = movie || {};
    if (!this.state.visible) {
      return null;
    }
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={this.props.onClose}>
          <Animated.View
            style={[styles.backdrop, {opacity: this.state.opacity}]}
          />
        </TouchableWithoutFeedback>
        <Animated.View
          style={[
            styles.modal,
            {
              height: this.state.height,
              transform: [{translateY: this.state.position}, {translateX: 0}],
            },
          ]}>
          <View style={styles.content}>
            <View
              style={[styles.movieContainer, this.getStyles().movieContainer]}
              {...this._panResponder.panHandlers}>
              <View
                style={[
                  styles.imageContainer,
                  this.getStyles().imageContainer,
                ]}>
                <Image
                  source={{
                    uri: `https://image.tmdb.org/t/p/w500//${poster_path}`,
                  }}
                  style={styles.image}
                />
              </View>
              <View style={[styles.movieInfo, this.getStyles().movieInfo]}>
                <Text style={[styles.title, this.getStyles().title]}>
                  {title}
                </Text>
                <Text style={styles.genre}>{genre}</Text>
                <Text
                  style={styles.genre}>{`Release date : ${release_date}`}</Text>
                <Text style={styles.genre}>{overview}</Text>
              </View>
            </View>
            <SafeAreaView>
              <View style={styles.footer}>
                <Rating
                  type="star"
                  readonly
                  startingValue={vote_average / 2}
                  count={5}
                  ratingBackgroundColor="#9575CD"
                  showRating
                />
              </View>
            </SafeAreaView>
          </View>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    backgroundColor: 'transparent',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'black',
  },
  modal: {
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
    margin: 20,
    marginBottom: 0,
  },
  movieContainer: {
    flex: 1,
    marginBottom: 20,
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    borderRadius: 10,
    ...StyleSheet.absoluteFillObject,
  },
  movieInfo: {
    backgroundColor: 'transparent',
  },
  title: {
    ...defaultStyles.text,
    fontSize: 20,
  },
  genre: {
    ...defaultStyles.text,
    color: '#BBBBBB',
    marginTop: 5,
    marginBottom: 5,
    fontSize: 14,
  },
  sectionHeader: {
    ...defaultStyles.text,
    color: '#AAAAAA',
  },
  footer: {
    paddingBottom: 60,
  },
  buttonContainer: {
    backgroundColor: 'black',
    borderRadius: 25,
    paddingVertical: 20,
    paddingHorizontal: 15,
    marginBottom: 35,
    alignItems: 'center',
  },
  button: {
    ...defaultStyles.text,
    color: '#FFFFFF',
    fontSize: 12,
  },
});
