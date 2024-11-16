import { FlatList, ImageBackground, SafeAreaView, TextInput, } from 'react-native'
import React from 'react'
import { styles } from './index.styles'
import { COLORS, images, SIZES } from '../../constant'
import { TouchableOpacity } from 'react-native'
import { SvgXml } from 'react-native-svg'
import { close_icon, mic_icon } from '../../assets/icons'
import { goBack } from '../../navigation/navigation_service'
import AIFunctional from "./index.function"
import { View } from 'react-native'
import { SingleMessageView } from './components'
import FastImage from 'react-native-fast-image'

const AI = () => {
    const { messages } = AIFunctional()
    return (
        <SafeAreaView style={styles.safe_area} >
            <ImageBackground
                source={images.ai_background_image}
                style={styles.main_view} >

                <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={goBack}
                    style={styles.top_icon_view} >
                    <SvgXml height={40} xml={close_icon} />
                </TouchableOpacity>

                <View style={{ flex: 1 }} >
                    <FlatList data={messages}

                        renderItem={({ item, index }) => (
                            <SingleMessageView
                                isuser={item?.isuser}
                                message={item?.message}
                            />
                        )} />
                </View>


                <ImageBackground
                    source={images.input_background_image}
                    style={styles.bottom_view} >
                    <TextInput
                        placeholder='Escribe un mensaje'
                        style={styles.input}
                        placeholderTextColor={COLORS.white + '80'}
                    />

                    <TouchableOpacity
                        activeOpacity={0.6}
                        style={styles.bottom_icon_view}
                    >
                        {/* <SvgXml height={40} xml={mic_icon} /> */}
                        <FastImage
                            source={images.send_btn}
                            resizeMode={FastImage.resizeMode.contain}
                        />
                    </TouchableOpacity>
                </ImageBackground>


            </ImageBackground>
        </SafeAreaView>
    )
}

export default AI
