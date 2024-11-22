import React from 'react';
import {
  View,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import { getDownload, dispatchFuncOn, dispatchText } from '../../Redux/action';
import { connect } from 'react-redux';
import Header from '../../Component/Header';
import { styles } from './styles';
import Folder from './Folders';
import Files from './Files';
import RNFetchBlob from 'react-native-blob-util';
import FastImage from 'react-native-fast-image';
import Orientation from 'react-native-orientation-locker';
import { Container, LoaderModal, SingleFolderView, SizedBox } from '../../Component';
import { SIZES } from '../../constant';
import { navigate } from '../../navigation/navigation_service';

class DownUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
    const { login } = this.props.user;
    this.props.getDownload(login?.data?.type, login?.data?.id);
  }

  componentDidMount() {
    this.focusListener = this.props.navigation.addListener('focus', () => {
      const locked = Orientation.isLocked();
      if (!locked) {
        Orientation.lockToPortrait();
      } else {
        Orientation.lockToPortrait();
      }
    });
  }

  async iosDownload(fileUrl) {
    this.setState({ isOpen: true });
    var date = new Date();
    var url = fileUrl;
    var encoded = encodeURI(url);
    var ext = this.extention(url);
    ext = '.' + ext[0];
    let dirs =
      RNFetchBlob.fs.dirs.DCIMDir +
      '/NeoeStudio_' +
      Math.floor(date.getTime() + date.getSeconds() / 2) +
      ext;
    RNFetchBlob.config({
      // response data will be saved to this path if it has access right.
      fileCache: true,
      path: dirs,
    })
      .fetch('GET', encoded, {
        //some headers ..
      })
      .then(res => {
        // the path should be dirs.DocumentDir + 'path-to-file.anything'
        // RNFetchBlob.ios.openDocument(resp.data);
        RNFetchBlob.fs.writeFile(dirs, res.data, 'base64');
        RNFetchBlob.ios.previewDocument(dirs);
        // FileViewer.open(resp.data, {showOpenWithDialog: true});
        this.setState({ isOpen: false });
      })
      .catch(error => {
        this.setState({ isOpen: false });
        this.props.dispatchText();
        this.props.dispatchFuncOn();
      });
  }
  download(fileUrl) {
    var date = new Date();
    var url = fileUrl;
    var ext = this.extention(url);
    ext = '.' + ext[0];
    const { config, fs } = RNFetchBlob;
    let DownloadDir = fs.dirs.DownloadDir;
    this.setState({ isOpen: true });
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        path:
          DownloadDir +
          '/NeoeStudio_' +
          Math.floor(date.getTime() + date.getSeconds() / 2) +
          ext,
        description: 'NeoeStudio',
      },
    };
    config(options)
      .fetch('GET', url)
      .then(res => {
        //Alert.alert("Success Downloaded");
        this.setState({ isOpen: false });
        this.props.dispatchText();
        this.props.dispatchFuncOn();
      });
  }
  extention(filename) {
    return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined;
  }

  requestPermission = async url => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Neoestudio Application',
          message:
            'Neoestudio App needs access to your Storage ' +
            'so you can download and save any files.',
          //buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        this.download(url);
      } else {
      }
    } catch (err) {
      //console.warn(err);
    }
  };

  render() {
    const { download, AuthLoading } = this.props.user;
    return (
      <Container title={"Descargas"}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}>
          {!download ? (
            <View />
          ) : (
            <View>
              <View>
                {download?.folders.map((item, index) => {
                  return (
                    <SingleFolderView
                      key={'unique' + index}
                      isActive={item.isActive}
                      count={item?.count}
                      title={item?.title || item?.name}
                      onPress={() => {
                        navigate('FolderFiles', {
                          id: item?.id,
                        })
                      }}
                    />
                  );
                })}
              </View>
              <View style={styles.fileView}>
                {download.files.map((item, index) => {
                  return (
                    <SingleFolderView
                      key={'unique' + index}
                      isActive={item.isActive}
                      count={"!"}
                      title={item.title ? item.title : item.name}
                      onPress={() => {
                        if (Platform.OS === 'android') {
                          this.download(item.file);
                        } else {
                          this.iosDownload(item.file);
                        }
                      }}
                    />
                  );
                })}
              </View>
            </View>
          )}

          <SizedBox />
        </ScrollView>

        <LoaderModal visible={this.state.isOpen || AuthLoading} />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
});
export default connect(mapStateToProps, {
  getDownload,
  dispatchFuncOn,
  dispatchText,
})(DownUpload);
