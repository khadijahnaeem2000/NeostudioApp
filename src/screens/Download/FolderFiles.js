import React from 'react';
import {
  View,
  PermissionsAndroid,
  ScrollView,
  Platform,
} from 'react-native';
import {
  getDownloadFile,
  dispatchFuncOn,
  dispatchText,
} from '../../Redux/action';
import { connect } from 'react-redux';
import { styles } from './styles';
import RNFetchBlob from 'react-native-blob-util';
import Orientation from 'react-native-orientation-locker';
import { Container, LoaderModal, SingleFolderView, SizedBox } from '../../Component';
import { images } from '../../constant';

class FolderFiles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
    this.getData();
  }

  getData = () => {
    const { login } = this.props.user;
    const id = this.props.route.params.id || 1
    this.props.getDownloadFile(id, login?.data?.type, login?.data?.id);
  };
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


  componentDidMount() {
    const locked = Orientation.isLocked();
    if (!locked) {
      Orientation.lockToPortrait();
    }
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
        RNFetchBlob.fs.writeFile(dirs, res.data, 'base64');
        RNFetchBlob.ios.previewDocument(dirs);
        // the path should be dirs.DocumentDir + 'path-to-file.anything'
        // RNFetchBlob.ios.openDocument(resp.data);
        //FileViewer.open(resp.data, {showOpenWithDialog: true});
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
        mediaScannable: true,
        storeInDownloads: true,
        mime: 'application/pdf',
        path: DownloadDir + '/NeoeStudio_' + Math.floor(date.getTime() + date.getSeconds() / 2) + ext,
        description: 'NeoeStudio',
      },
    };
    config(options)
      .fetch('GET', url)
      .then(res => {
        //Alert.alert("Successfully Downloaded");
        this.setState({ isOpen: false });
        this.props.dispatchText();
        this.props.dispatchFuncOn();
      }).catch(err => {
        console.log("esajhdbnasdsad", err)
        this.setState({ isOpen: false });
      })
  }

  extention(filename) {
    return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined;
  }

  requestPermission = async url => {
    try {
      const granted = await PermissionsAndroid.request(
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
    const { downloadFiles, AuthLoading } = this.props.user;
    return (
      <Container title={"Descargas"}
      // textStyle={{ marginTop: SIZES.padding }}
      >

        {/* <View style={styles.upDownView}>
          <FastImage
            source={require('./assets/descargas.png')}
            style={styles.download}
            resizeMode={FastImage.resizeMode.stretch}
          />
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Upload')}>
            <FastImage
              source={require('../../Images/no_upload.png')}
              style={styles.download}
              resizeMode={FastImage.resizeMode.stretch}
            />
          </TouchableOpacity>
        </View> */}
        <View style={styles.mainView}>
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}>
            {!downloadFiles ? (
              <View />
            ) : (
              <View style={styles.fileView}>
                {downloadFiles.files.map((item, index) => {
                  return (
                    <SingleFolderView
                      key={'unique' + index}
                      count={"!"}
                      image={images.pdf_image}
                      isActive={item?.isActive}
                      title={item.title || item?.name}
                      onPress={() => {
                        if (Platform.OS === 'android') {
                          this.download(item.file);
                        } else {
                          this.iosDownload(item.file);
                        }
                      }}
                    />
                    // <Files
                    //   key={'unique' + index}
                    //   text={item.title ? item.title : item.name}
                    //   isActive={item.isActive}
                    //   clickHandler={() => {
                    //     if (Platform.OS === 'android') {
                    //       this.download(item.file);
                    //     } else {
                    //       this.iosDownload(item.file);
                    //     }
                    //   }}
                    // />
                  );
                })}
              </View>
            )}

            <SizedBox />
          </ScrollView>
        </View>

        <LoaderModal visible={this.state.isOpen || AuthLoading} />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
});
export default connect(mapStateToProps, {
  getDownloadFile,
  dispatchFuncOn,
  dispatchText,
})(FolderFiles);
