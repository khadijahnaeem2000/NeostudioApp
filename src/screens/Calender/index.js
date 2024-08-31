
import { LocaleConfig, CalendarList } from 'react-native-calendars';


LocaleConfig.locales['fr'] = {
  monthNames: [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ],
  monthNamesShort: [
    'Ene.',
    'Feb.',
    'Mar',
    'Abr',
    'May',
    'Jun',
    'Jul',
    'Ago',
    'Sept',
    'Oct',
    'Nov.',
    'Dici',
  ],
  dayNames: [
    'lunes ',
    'martes ',
    'miércoles ',
    'Mercredi',
    'Jeudi',
    'Vendredi',
    'Samedi',
  ],
  dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
  //dayNamesShort: ['Sun','Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat',],
  today: "Aujourd'hui",
};
LocaleConfig.defaultLocale = 'fr';


import React from 'react';
import {
  View,
  BackHandler,
  ActivityIndicator,
  Platform,
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert,
  Image,
  Modal,
} from 'react-native';
import { connect } from 'react-redux';
import { styles } from './styles';
import FastImage from 'react-native-fast-image';
import Orientation from 'react-native-orientation-locker';
import {
  Agenda,
  DateData,
  AgendaEntry,
  AgendaSchedule,
} from 'react-native-calendars';
import testIDs from './testIDs';
import { nextDay } from './data';
import Webview from 'react-native-webview';
import Header from '../../Component/Header';
import { baseUrl, getSpecialDates } from '../../Redux/action';
import { heightPercentageToDP, widthPercentageToDP } from '../../Component/MakeMeResponsive';
import moment from 'moment/moment';
import Entypo from 'react-native-vector-icons/Entypo'


const URL = 'https://webversion.neoestudio.net/calendario?id=';

interface State {
  items?: AgendaSchedule;
}

class Calender extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {};
  // }
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      newItems: {},
      isLoading: false,
      showmodal: false,
      selcetedData: {},
    };
  }
  state: State = {
    items: [],
    newItems: {},
  };
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    this.focusListener = this.props.navigation.addListener('focus', () => {
      const locked = Orientation.isLocked();
      if (!locked) {
        Orientation.lockToPortrait();
      }
      this.getAllDates();
    });
    // getAllDates()
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton() {
    return Orientation.unlockAllOrientations(), false;
  }

  ActivityIndicatorLoadingView() {
    //making a view to show to while loading the webpage
    return (
      <ActivityIndicator color="#009688" size="large" style={styles.loading} />
    );
  }

  getAllDates = async () => {
    this.setState({ isLoading: true });
    const { login } = this.props.user;
    const result = await getSpecialDates(login?.data?.id);
    await this.setState({ items: result?.data });
    await this.setState({ isLoading: false });
  };

  render() {
    const scalesPageToFit = Platform.OS === 'android';
    const { login } = this.props.user;
    const { items } = this.state;
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <FastImage
          style={styles.logo}
          source={
            Platform.OS === 'android'
              ? require('../../Images/veoestudio.png')
              : require('../../Images/ios_logo.png')
          }
          resizeMode={FastImage.resizeMode.stretch}
        />
        <Header
          iconName="left"
          leftClick={() => this.props.navigation.goBack()}
          title={'Calendario'}
        />
        <Agenda
          testID={testIDs.agenda.CONTAINER}
          items={this.state.newItems}
          ListEmptyComponent={this.renderEmptyComponent}
          loadItemsForMonth={this.loadItems}
          displayLoadingIndicator={false}
          renderItem={this.renderItem}
          dayLoading={false}
          renderEmptyData={this.renderEmptyDate}
          rowHasChanged={this.rowHasChanged}
          showClosingKnob={true}
          firstDay={1}
          theme={{
            selectedDayBackgroundColor: '#394EE3',
            agendaTodayColor: '#394EE3',
          }}
          progressViewOffset={0}
        />
        <Modal
          onRequestClose={() => this.setState({ showmodal: false })}
          transparent
          visible={this.state.showmodal}>
          <View
            style={{
              flex: 1,
              backgroundColor: 'rgba(0,0,0,0.5)',
              justifyContent: 'center',
            }}>
            <View
              style={{
                backgroundColor: 'white',
                borderRadius: 12,
                paddingVertical: 12,
                paddingHorizontal: 20,
                marginHorizontal: 20,
              }}>
              <TouchableOpacity
                style={{
                  height: 40,
                  width: 40,
                  alignSelf: 'flex-end',
                  justifyContent: 'center',
                  alignItems: 'flex-end',
                }}
                onPress={() => this.setState({ showmodal: false })}>
                <Entypo name='cross' color={"black"}
                  size={25}
                />
              </TouchableOpacity>
              <Text
                style={{
                  fontSize: heightPercentageToDP(2),
                  color: 'black',
                  fontWeight: '800',
                  textAlign: 'center',
                }}>
                {this?.state?.selcetedData?.name}
              </Text>
              {this?.state?.selcetedData?.image && (
                <Image
                  resizeMode="contain"
                  style={{
                    height: 200,
                    width: '100%',
                    marginTop: 30,
                  }}
                  source={{
                    uri:
                      'https://neoestudio.net/public/' +
                      this?.state?.selcetedData?.image,
                  }}
                />
              )}

              <View style={{ height: 12 }} />


            </View>
          </View>
        </Modal>
      </View>
    );
  }

  loadItems = (day: DateData) => {
    // const items = {}

    setTimeout(() => {
      if (!this.state || !this.state.items) {
        console.error('State or items are undefined. sure  ');
        return;
      }

      const data = Array.isArray(this.state.items) ? this.state.items : [];
      const items = {};

      data.forEach(item => {
        const { Date, Task, image } = item;
        const strTime = this.timeToString(Date);

        if (!items[strTime]) {
          items[strTime] = [];
        }

        items[strTime].push({
          name: Task,
          image: image,
          // Other properties as needed
        });
      });

      const newItems = {};
      Object.keys(items).forEach(key => {
        newItems[key] = items[key];
      });

      // Update state with newItems
      this.setState({
        newItems: newItems,
      });
    }, 2000);
  };

  renderEmptyComponent = day => {
    return <Text style={stylesNew.customDay}>{'No Items'}</Text>;
  };

  renderDay = day => {
    if (day) {
      return <Text style={stylesNew.customDay}>{day.getDay()}</Text>;
    }
    return <View style={stylesNew.dayItem} />;
  };

  renderItem = (reservation: AgendaEntry, isFirst: boolean) => {
    console.log('🚀 ~ Calender ~ reservation:', reservation);
    const fontSize = isFirst ? 16 : 14;
    const color = isFirst ? 'black' : '#43515c';

    return (
      <TouchableOpacity
        testID={testIDs.agenda.ITEM}
        style={[stylesNew.item, { height: reservation.height }]}
        onPress={() => {
          this.setState({ showmodal: true });
          this.setState({
            selcetedData: {
              image: reservation?.image || null,
              name: reservation.name,
            },
          });
        }}>
        {reservation?.image && (
          <View style={{ height: 80, width: 80 }}>
            <Image
              source={{
                uri: 'https://neoestudio.net/public/' + reservation?.image,
              }}
              resizeMode="contain"
              style={{
                width: '100%',
                height: '100%',
              }}
            />
          </View>
        )}
        <Text
          style={{
            fontSize,
            color: '#394EE3',
            marginLeft: 15,
            width: widthPercentageToDP(55),
          }}>
          {reservation.name}
        </Text>
      </TouchableOpacity>
    );
  };

  renderEmptyDate = () => {
    return (
      <View style={stylesNew.emptyDate}>
        <Text style={{
          color: "black",
          textAlign: "center"
        }} >Hoy no tenemos clases ni eventos programados.</Text>
      </View>
    );
  };

  rowHasChanged = (r1: AgendaEntry, r2: AgendaEntry) => {
    return r1.name !== r2.name;
  };

  timeToString(time: number) {
    const date = new Date(moment(time));
    return date.toISOString().split('T')[0];
  }
}

const stylesNew = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
    flexDirection: 'row',
    // backgroundColor:'red',
    // justifyContent:'center',
    alignItems: 'center',
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
  },
  customDay: {
    margin: 10,
    fontSize: 24,
    color: 'green',
  },
  dayItem: {
    marginLeft: 34,
  },
});

const mapStateToProps = state => ({
  user: state.user,
});
export default connect(mapStateToProps)(Calender);
