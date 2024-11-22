import { View, Text } from 'react-native'
import React from 'react'
import FastImage from 'react-native-fast-image'
import { images } from '../../constant'
import { styles } from './index.styles'
import { TouchableOpacity } from 'react-native'

const Button = ({ title, onPress, style, textStyle }) => {
    return (
        <TouchableOpacity
            activeOpacity={0.6}
            onPress={onPress}
            style={[styles.main_view, style]} >
            <FastImage
                resizeMode={FastImage.resizeMode.contain}
                style={styles.image_view}
                source={images.btn_background_image} >
                <Text style={[styles.btn_text, textStyle]} >{title}</Text>
            </FastImage>
        </TouchableOpacity >
    )
}

export default Button