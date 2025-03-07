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
        const { text, clickHandler, status } = this.props
        return (
            <View
                style={{
                    //flex: 1,
                    // justifyContent: "center",
                    // alignItems: "center",
                    // marginLeft:widthPercentageToDP(1)
                }}
            >
                <TouchableOpacity
                    onPress={clickHandler}
                    style={{
                        marginLeft: widthPercentageToDP(0.5)
                    }}
                >
                    <FastImage
                        style={{
                            width: widthPercentageToDP(3.2),
                            height: widthPercentageToDP(3.2),
                            alignContent: "center",
                            justifyContent: "center",
                        }}
                        resizeMode={FastImage.resizeMode.stretch}
                        source={status === 'wrong' ?
                        images.red_image
                        : status === 'notAttempted' ?
                            images.transparent_image
                            : images.green_image
                    }
                    >
                        <Text
                            style={{
                                fontSize: widthPercentageToDP(1.3),
                                fontFamily: fonts.elegance,
                                color: "#ffff",
                                textAlign: "center",
                                fontWeight: "bold"
                            }}>
                            {text}
                        </Text>
                    </FastImage>
                </TouchableOpacity>
            </View>
        )
    }
}