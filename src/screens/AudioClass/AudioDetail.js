import React from 'react';
import {
  BackHandler,
  View,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  AppState,
  FlatList,
  Platform,
} from 'react-native';
import { connect } from 'react-redux';
import { styles } from './styles';
import {
  getAudioFiles,
  postAudioState,
  dispatchAudioText,
  dispatchFuncOn,
} from '../../Redux/action';
import Header from '../../Component/Header';
import Player from '../../Component/Player';
import AudioProgress from '../../Component/audprogress';
import TrackPlayer, {
  AppKilledPlaybackBehavior,
  Capability,
} from 'react-native-track-player';
import FastImage from 'react-native-fast-image';
import Orientation from 'react-native-orientation-locker';

class AudioDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      is_playing: false,
      sideFlag: false,
      activePlayer: false,
      currentIndex: 0,
      title: '',
      trackId: '',
    };
    this.getData();
    this.setup();
  }


  setup = async () => {
    const buffer = 0.5;
    await TrackPlayer.updateOptions({
      android: {
        appKilledPlaybackBehavior:
          AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
      },
      playBuffer: buffer,
      minBuffer: buffer * 2,
      maxBuffer: buffer * 2,
      waitForBuffer: true,

      // This flag is now deprecated. Please use the above to define playback mode.
      // stoppingAppPausesPlayback: true,
      capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
        Capability.SeekTo,
      ],
      compactCapabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
      ],
      progressUpdateEventInterval: 2,
    });
  };

  getData = () => {
    const { login } = this.props.user;
    const id = this.props.route.params.position || '1'
    this.props.getAudioFiles(id, login.data.id);
  };

  endAudio = () => {
    const { login } = this.props.user;
    this.props.postAudioState(login.data.id, 'end');
  };

  handleBackButton = () => {
    this.endAudio();
    return false;
  };
  _handleAppStateChange = nextAppState => {
    const { login } = this.props.user;
    this.setState({ appState: nextAppState }, () => {
      if (nextAppState === 'background') {
        this.props.postAudioState(login.data.id, 'kill');
      }
    });
  };

  componentDidMount() {
    this.onTrackChange = TrackPlayer.addEventListener(
      'playback-active-track-changed',
      async data => {
        const track = await TrackPlayer.getActiveTrack(data?.nextTrack);
        this.setState({ title: track?.title || "" });
      },
    );
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    this.appStateSubscription = AppState.addEventListener(
      'change',
      this._handleAppStateChange,
    );
    this.focusListener = this.props.navigation.addListener('focus', () => {
      const locked = Orientation.isLocked();
      if (!locked) {
        Orientation.lockToPortrait();
      }  else {
        Orientation.lockToPortrait();
      }
    });
  }


  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    this.appStateSubscription.remove();
  }

  setPlayer = async index => {
    const { audio, login } = this.props.user;
    let array = [...audio?.data]
    const updatedArray = array?.map(item => {
      return {
        ...item,
        url: item.url.replace("/audio/", "/audios/")
      };
    });
    await TrackPlayer.reset();
    await TrackPlayer.seekTo(0);
    var temArray = updatedArray?.slice(index);
    await TrackPlayer.add(temArray);
    await TrackPlayer.play();
    await TrackPlayer.addEventListener('playback-active-track-changed', event => {
      this.getTitle(event?.track?.id);
    });
    TrackPlayer.addEventListener('playback-queue-ended', async () => {
      //TrackPlayer.reset()
      await TrackPlayer.seekTo(0);
      await TrackPlayer.pause();
      this.setState({ is_playing: false }, () => {
        this.props.postAudioState(login.data.id, 'end');
      });
    });
    TrackPlayer.addEventListener('remote-play', async () => {
      await TrackPlayer.play();
      this.setState({ is_playing: true }, () => {
        this.props.postAudioState(login.data.id, 'start');
      });
    });
    TrackPlayer.addEventListener('remote-pause', async () => {
      await TrackPlayer.pause();
      this.setState({ is_playing: false }, () => {
        this.props.postAudioState(login.data.id, 'end');
      });
    });
    // TrackPlayer.addEventListener('remote-jump-forward', () => {
    //     jumpPlayback(15, true); // seek forward 15 seconds
    // });
    // TrackPlayer.addEventListener('remote-jump-backward', () => {
    //     jumpPlayback(15); // seek backward 15 seconds
    // });
    TrackPlayer.addEventListener('playback-error', error => {
    });
  };
  onPlayButton = async () => {
    const { login } = this.props.user;
    if (this.state.is_playing) {
      await TrackPlayer.pause();
      this.props.postAudioState(login.data.id, 'pause');
    } else {
      await TrackPlayer.play();
      this.props.postAudioState(login.data.id, 'start');
    }
    this.setState({ is_playing: !this.state.is_playing });
  };
  onBackwardButton = async () => {
    TrackPlayer.getProgress().then(async pos => {
      await TrackPlayer.seekTo(pos?.position > 5 ? pos?.position - 5 : 0);
    });
  };
  onForwardButton = async () => {
    TrackPlayer.getProgress().then(async pos => {
      await TrackPlayer.seekTo(pos?.position + 5);
    });
  };
  getTitle = id => {
    const { audio } = this.props.user;
    for (let i = 0; i < audio.data.length; i++) {
      if (audio?.data?.[i]?.id == id) {
        this.setState({ title: audio?.data?.[i]?.title });
      } else {
      }
    }
  };


  componentWillUnmount() {
    TrackPlayer.reset()
  }
  render() {
    const { audio, AuthLoading, login } = this.props.user;
    const id = this.props.route.params.position || "1"
    const { title } = this.state;
    return (
      <FastImage
        source={require('../../Images/bg.png')}
        style={styles.container}
        resizeMode={FastImage.resizeMode.stretch}>
        <FastImage
          style={styles.logo}
          source={
            Platform.OS === 'android'
              ? require('../../Images/veoestudio.png')
              : require('../../Images/ios_logo.png')
          }
          resizeMode={FastImage.resizeMode.contain}
        />
        <Header
          iconName="left"
          leftClick={() => {
            this.props.navigation.goBack();
            this.props.postAudioState(login.data.id, 'kill');
          }}
          title="Audiolibro"
        />
        {!audio ? (
          <View />
        ) : (
          <View style={{ alignItems: 'center' }}>
            <View style={styles.AudioView}>
              <FlatList
                data={audio.data}
                keyExtractor={item => 'unique' + item.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ flexGrow: 1 }}
                renderItem={({ item, index }) => {
                  return (
                    <Player
                      key={'unique' + index}
                      img={require('../../Images/audio.png')}
                      title={item?.title}
                      isActive={item.isActive}
                      clickHandler={() => {
                        this.setPlayer(index);
                        this.setState(
                          {
                            is_playing: true,
                            currentIndex: index,
                          },
                          () => {
                            TrackPlayer.getPlayWhenReady();
                            this.props.postAudioState(login.data.id, 'start');
                          },
                        );
                      }}
                    />
                  );
                }}
              />
            </View>
            {audio.data.length > 0 && (
              <FastImage
                style={styles.audioBG}
                source={require('./assets/bg_audio.png')}
                resizeMode={FastImage.resizeMode.stretch}>
                <View style={styles.playerView}>
                  <TouchableOpacity
                    style={styles.btStyles}
                    onPress={this.onBackwardButton}>
                    <FastImage
                      source={require('./assets/back.png')}
                      resizeMode={FastImage.resizeMode.stretch}
                      style={styles.buttonStyle}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.btStyles}
                    onPress={this.onPlayButton}>
                    <FastImage
                      source={
                        this.state.is_playing
                          ? require('./assets/pause.png')
                          : require('./assets/play.png')
                      }
                      resizeMode={FastImage.resizeMode.stretch}
                      style={styles.playButton}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.btStyles}
                    onPress={this.onForwardButton}>
                    <FastImage
                      source={require('./assets/forward.png')}
                      resizeMode={FastImage.resizeMode.stretch}
                      style={styles.buttonStyle}
                    />
                  </TouchableOpacity>
                  <Text style={styles.trackText}>{title}</Text>
                </View>
                <AudioProgress />
              </FastImage>
            )}
          </View>
        )}
        {AuthLoading && (
          <ActivityIndicator size="large" color="#000" style={styles.loading} />
        )}
      </FastImage>
    );
  }
}
const mapStateToProps = state => ({
  user: state.user,
});
export default connect(mapStateToProps, {
  getAudioFiles,
  postAudioState,
  dispatchAudioText,
  dispatchFuncOn,
})(AudioDetail);