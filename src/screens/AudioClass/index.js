import React from 'react';
import {
  View,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import { connect } from 'react-redux';
import { styles } from './styles';
import Header from '../../Component/Header';
import { getTopics, getAudioFiles, getLatestAudioFile } from '../../Redux/action';
import Directory from '../../Component/Directory';
import FastImage from 'react-native-fast-image';
import Orientation from 'react-native-orientation-locker';
import { navigate } from '../../utils/naviagtion_service';

class AudioClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      directoryName: [],
      isLoading: false,
    };
    this.getAllTopics();
  }

  getAllTopics = () => {
    const { login } = this.props.user;
    this.props.getTopics(login.data.type, login?.data?.id, 'audio');
  };

  componentDidMount() {
    this.focusListener = this.props.navigation.addListener('focus', () => {
      const locked = Orientation.isLocked();
      if (!locked) {
        Orientation.lockToPortrait();
      }  else {
        Orientation.lockToPortrait();
      }
    });
  }
  apiCall = async id => {
    this.setState({ isLoading: true });
    const { login } = this.props.user;
    const result = await getLatestAudioFile(id, login?.data?.id);
    this.setState({ isLoading: false }, () => {
      if (result) {
        setTimeout(() => {
          navigate('AudioPlayer', {
            data: result?.data,
          });
        }, 500);
      }
    });
  };

  render() {
    const { topics, AuthLoading, login } = this.props.user;
    const { isLoading } = this.state;
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
          leftClick={() => this.props.navigation.goBack()}
          title="Audiolibro"
        />
        <View style={styles.directoryView}>
          {!topics ? (
            <View />
          ) : (
            <FlatList
              data={topics.data}
              keyExtractor={item => 'unique' + item.id}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ flexGrow: 1 }}
              renderItem={({ item, index }) => {
                return (
                  <Directory
                    key={'unique' + index}
                    img={require('../../Images/directory.png')}
                    title={item.name}
                    status="Habilitado"
                    isActive={item.isActive}
                    count={item.count}
                    clickHandler={() => {
                      //this.apiCall(item.id)
                      Orientation.unlockAllOrientations();
                      navigate('AudioDetail', {
                        position: item.id,
                        name: item.name,
                      });
                      // navigate('AudioPlayer', {
                      //     position: item.id,
                      //     name: item.name
                      // })
                    }}
                  />
                );
              }}
            />
          )}
        </View>
        {AuthLoading && (
          <ActivityIndicator size="large" color="#000" style={styles.loading} />
        )}
        {isLoading && (
          <ActivityIndicator size="large" color="#000" style={styles.loading} />
        )}
      </FastImage>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
});
export default connect(mapStateToProps, { getTopics, getAudioFiles })(AudioClass);
