import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import FastImage from 'react-native-fast-image'
import { images } from '../../constant'
import { styles } from './index.styles'

const SingleFolderView = ({ title, onPress, image, onLongPress, textStyle }) => {
    return (
        <FastImage resizeMode={FastImage.resizeMode.contain} style={styles.main_view} source={images.folder_background_image} >
            <TouchableOpacity onLongPress={onLongPress} style={styles.row} activeOpacity={0.6} onPress={onPress} >
                <FastImage resizeMode={FastImage.resizeMode.contain} style={styles.image} source={image || images.folder_image} />
                <Text numberOfLines={2} style={[styles.title, textStyle]} >{title}</Text>
            </TouchableOpacity>
        </FastImage>
    )
}

export default SingleFolderView