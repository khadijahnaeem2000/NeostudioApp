import React from 'react';
import {
  View,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  Modal,
  Platform,
} from 'react-native';
import { getPdfFolder } from '../../Redux/action';
import { connect } from 'react-redux';
import Header from '../../Component/Header';
import { styles } from './styles';
import Folder from '../Download/Folders';
import Files from '../Download/Files';
import FastImage from 'react-native-fast-image';
import DeviceInfo from 'react-native-device-info';
import Orientation from 'react-native-orientation-locker';
import {
  widthPercentageToDP,
} from '../../Component/MakeMeResponsive';

class PDFFolder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      pdfFile: '',
    };
    const { login } = this.props.user;
    this.props.getPdfFolder(login.data.type, login?.data?.id);
  }

  componentDidMount() {
    this.focusListener = this.props.navigation.addListener('focus', () => {
      const locked = Orientation.isLocked();
      if (!locked) {
        Orientation.lockToPortrait();
      }else{
        Orientation.lockToPortrait();
      }
    });
  }

  render() {
    const { AuthLoading, pdfFolders } = this.props.user;
    return (
      <FastImage
        source={require('../../Images/bg.png')}
        resizeMode={FastImage.resizeMode.stretch}
        style={styles.container}>
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
          title={'Temario'}
        />
        <View style={styles.mainView}>
          <ScrollView
            contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}
            showsVerticalScrollIndicator={false}>
            {!pdfFolders ? (
              <View />
            ) : (
              <View>
                <View>
                  {pdfFolders.folders.map((item, index) => {
                    return (
                      <Folder
                        key={'unique' + index}
                        text={item.name}
                        isActive={item.isActive}
                        count={item.count}
                        clickHandler={() => (
                          Orientation.unlockAllOrientations(),
                          this.props.navigation.navigate('PdfDetail', {
                            position: item.id,
                            name: item.name,
                          })
                        )}
                      />
                    );
                  })}
                </View>
                <View style={styles.fileView}>
                  {pdfFolders.files.map((item, index) => {
                    return (
                      <Files
                        key={'unique' + index}
                        text={item.title}
                        isActive={item.isActive}
                        clickHandler={() =>
                          this.setState({ isOpen: true, pdfFile: item.file })
                        }
                      />
                    );
                  })}
                </View>
              </View>
            )}
          </ScrollView>
        </View>
        {AuthLoading && (
          <ActivityIndicator size="large" color="#000" style={styles.loading} />
        )}
        {this.state.isOpen && (
          <Modal
            transparent={true}
            visible={this.state.isOpen}
            animationType="slide"
            supportedOrientations={['portrait', 'landscape']}
            onRequestClose={() => {
            }}>
            <TouchableOpacity
              style={styles.modalMain}
              activeOpacity={1}
              onPressOut={() => this.setState({ isOpen: false })}>
              <TouchableWithoutFeedback>
                <FastImage
                  source={require('../Home/assets/email_box.png')}
                  resizeMode={FastImage.resizeMode.stretch}
                  style={[
                    styles.quesBox,
                    {
                      height: DeviceInfo.isTablet()
                        ? widthPercentageToDP(45)
                        : widthPercentageToDP(40),
                    },
                  ]}>
                  <Text style={styles.text1}>
                    {'Elige cómo quieres leer el documento.'}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      width: '80%',
                      justifyContent: 'space-around',
                    }}>
                    <TouchableOpacity
                      style={styles.confirmBtn}
                      onPress={() => (
                        this.setState({ isOpen: false }),
                        this.props.navigation.navigate('PdfView', {
                          url: this.state.pdfFile,
                        })
                      )}>
                      <FastImage
                        source={require('../../Images/Horizontal.png')}
                        style={styles.btnImage}
                        resizeMode={FastImage.resizeMode.contain}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.confirmBtn}
                      onPress={() => (
                        this.setState({ isOpen: false }),
                        this.props.navigation.navigate('PdfView2', {
                          url: this.state.pdfFile,
                        })
                      )}>
                      <FastImage
                        source={require('../../Images/Vertical.png')}
                        style={styles.btnImage}
                        resizeMode={FastImage.resizeMode.contain}
                      />
                    </TouchableOpacity>
                  </View>
                </FastImage>
              </TouchableWithoutFeedback>
            </TouchableOpacity>
          </Modal>
        )}
      </FastImage>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
});
export default connect(mapStateToProps, {
  getPdfFolder,
})(PDFFolder);
