import { FlatList, Image, ImageBackground, Keyboard, SafeAreaView, ScrollView, TextInput, } from 'react-native'
import React from 'react'
import { styles } from './index.styles'
import { COLORS, images } from '../../constant'
import { TouchableOpacity } from 'react-native'
import { SvgXml } from 'react-native-svg'
import { close_icon, mic_icon, send_icon } from '../../assets/icons'
import { goBack } from '../../navigation/navigation_service'
import AIFunctional from "./index.function"
import { View } from 'react-native'
import { SingleMessageView } from './components'
import { SizedBox } from '../../Component'

const AI = () => {
    const {
        messages,
        message,
        setMessage,
        setMessages,
        listRef
    } = AIFunctional()
    return (
        <SafeAreaView style={styles.safe_area} >
            <Image
                source={images.ai_background_image}
                style={styles.image_view} />
            <View style={styles.main_view} >
                <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={goBack}
                    style={styles.top_icon_view} >
                    <SvgXml height={40} xml={close_icon} />
                </TouchableOpacity>
                <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={"handled"}  >


                    <FlatList
                        ref={listRef}
                        data={messages}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={item => item?.id}
                        ListFooterComponent={<SizedBox />}
                        renderItem={({ item, index }) => (
                            <SingleMessageView
                                isuser={item?.isuser}
                                message={item?.message}
                            />

                        )}
                    />

                </ScrollView>
                <ImageBackground
                    source={images.input_background_image}
                    style={styles.bottom_view} >

                    <TextInput
                        placeholder='Escribe un mensaje'
                        style={styles.input}
                        placeholderTextColor={COLORS.white + '80'}
                        value={message}
                        onChangeText={setMessage}
                        onScrollToIndexFailed={() => { 
                            listRef.current.scrollToIndex({ animated: true , index:messages?.length })
                        }}
                        onSubmitEditing={() => {
                            if (message?.trim()?.length > 0) {
                                setMessages([...messages, {
                                    id: messages?.length + 1,
                                    isuser: true,
                                    message: message,
                                }])
                                setMessage(null)
                                Keyboard.dismiss()

                                setTimeout(() => {
                                    listRef.current.scrollToIndex({ animated: true , index:messages?.length })
                                }, 1000);
                            }
                        }}
                    />

                    <TouchableOpacity
                        activeOpacity={0.6}
                        style={styles.bottom_icon_view}
                        onPress={() => {
                            if (message?.trim()?.length > 0) {
                                setMessages([...messages, {
                                    id: messages?.length + 1,
                                    isuser: true,
                                    message: message,
                                }])
                                setMessage(null)
                                Keyboard.dismiss()
                                listRef.current.scrollToEnd({ animated: true })
                            } else {

                            }
                        }}
                    >
                        {
                            message?.trim()?.length > 0 ?
                                <SvgXml xml={send_icon} />
                                :
                                <SvgXml height={40} xml={mic_icon} />
                        }
                        {/* <FastImage
                                source={images.send_btn}
                                resizeMode={FastImage.resizeMode.contain}
                            /> */}
                    </TouchableOpacity>
                </ImageBackground>
            </View>
        </SafeAreaView>
    )
}

export default AI
