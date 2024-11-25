import React from 'react'
import { View, TouchableOpacity, Text, Image, ImageBackground } from 'react-native'
import {
    widthPercentageToDP,
    heightPercentageToDP
} from '../../Component/MakeMeResponsive'
import FastImage from 'react-native-fast-image'
import { fonts } from '../../utils'
import { images } from '../../constant'

export default class BottomLayout extends React.Component {

    render() {
        const { text, clickHandler, isAttempt, isSelected, totalItem } = this.props
        return (
            <View
                style={{
                    //width:"100%",
                    alignItems: "flex-start",
                    // marginLeft:widthPercentageToDP(1)
                }}
            >
                <TouchableOpacity
                    onPress={clickHandler}
                    style={{
                        marginLeft: totalItem === 25 ?
                            widthPercentageToDP(0.5) :
                            totalItem === 20 ?
                                widthPercentageToDP(1.4) :
                                totalItem === 15 ?
                                    widthPercentageToDP(2.8) :
                                    widthPercentageToDP(2)
                    }}
                >
                    {isSelected ?
                        <FastImage
                            style={{
                                width: widthPercentageToDP(3.2),
                                height: widthPercentageToDP(3.2),
                                alignContent: "center",
                                justifyContent: "center",
                            }}
                            resizeMode={FastImage.resizeMode.stretch}
                            source={images.golden_image}
                        >
                            <Text
                                style={{
                                    fontSize: widthPercentageToDP(1.2),
                                    fontFamily: fonts.elegance,
                                    color: "#ffff",
                                    textAlign: "center",
                                    fontWeight: "bold"
                                }}>
                                {text}
                            </Text>
                        </FastImage>
                        : <FastImage
                            style={{
                                width: widthPercentageToDP(3.2),
                                height: widthPercentageToDP(3.2),
                                alignContent: "center",
                                justifyContent: "center",
                                opacity: isAttempt === null ? 0.5 : 1
                            }}
                            resizeMode={FastImage.resizeMode.stretch}
                            source={images.option_image}
                        >
                            <Text
                                style={{
                                    fontSize: widthPercentageToDP(1.2),
                                    fontFamily: fonts.elegance,
                                    color: "#ffff",
                                    textAlign: "center",
                                    fontWeight: "bold"
                                }}>
                                {text}
                            </Text>
                        </FastImage>
                    }
                </TouchableOpacity>
            </View>
        )
    }
}