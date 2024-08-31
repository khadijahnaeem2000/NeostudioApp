import React from 'react';
import { View, TouchableOpacity, Text, Image, useWindowDimensions, Dimensions } from 'react-native';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from '../../Component/MakeMeResponsive';
import HTML from 'react-native-render-html';
import DeviceInfo from 'react-native-device-info';
import { fonts } from '../../utils';

export default class Directory extends React.Component {
  render() {
    const { question, answer } = this.props;
    return (
      <View
        style={{
          flex: 1,
          marginLeft: widthPercentageToDP(5),
          marginRight: widthPercentageToDP(5),
        }}>
        <HTML
          contentWidth={Dimensions.get('screen').width}
          source={{ html: question }}
          classesStyles={{
            regular: {
              //fontSize: widthPercentageToDP(2.5),
              fontFamily: fonts.novaRegular,
              color: '#000',
            },
            bold: {
              //fontSize: widthPercentageToDP(2.5),
              fontFamily: fonts.novaBold,
              fontWeight: 'normal',
              color: '#000',
            },
            round: {
              //fontSize: widthPercentageToDP(2.5),
              fontFamily: fonts.elegance,
              color: '#000',
            },
          }}
          tagsStyles={{
            a: {
              textDecorationLine: "none"
            },
            p: {
              padding: 6,
              textAlign: 'justify',
            },
          }}
        />

        <View
          style={{
            marginTop: widthPercentageToDP(1),
            marginBottom: widthPercentageToDP(1),
          }}>
          <HTML
            contentWidth={Dimensions.get('screen').width}
            source={{ html: answer }}
            classesStyles={{
              regular: {
                //fontSize: widthPercentageToDP(2.5),
                fontFamily: fonts.novaRegular,
                color: '#000',
              },
              bold: {
                //fontSize: widthPercentageToDP(2.5),
                fontFamily: fonts.novaBold,
                fontWeight: 'normal',
                color: '#000',
              },
              round: {
                //fontSize: widthPercentageToDP(2.5),
                fontFamily: fonts.elegance,
                color: '#000',
              },
            }}
            tagsStyles={{
              a: {
                textDecorationLine: "none"
              },
              p: {
                padding: 6,
                textAlign: 'justify',
              },
              span: {
                //fontSize: Platform.isPad ? widthPercentageToDP(2.5) : widthPercentageToDP(4),
                flexDirection: 'row',
              },
              tap: {
                fontSize: DeviceInfo.isTablet()
                  ? widthPercentageToDP(2)
                  : widthPercentageToDP(1.5),
              },
            }}
          />
        </View>
      </View>
    );
  }
}
