import { View, SafeAreaView, Image } from 'react-native'
import React from 'react'
import { styles } from './index.styles'
import { images } from '../../constant'
import FastImage from 'react-native-fast-image'

const Container = ({ children }) => {
    return (
        <SafeAreaView style={styles.main_view} >
            <FastImage style={styles.main_view}
                source={images.home_background_image} >

                <View style={styles.logo_view} >
                    <Image resizeMode='contain' source={images.logo} style={styles.logo} />
                </View>
                {children}
            </FastImage>
        </SafeAreaView>
    )
}

export default Container