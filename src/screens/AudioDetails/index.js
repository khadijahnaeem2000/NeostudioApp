import { View, Text, FlatList, RefreshControl, TouchableOpacity } from 'react-native'
import React from 'react'
import { Container, LoaderModal, ProgressBar, SingleFolderView, SizedBox } from '../../Component'
import { styles } from './index.styles'
import AudioDetailsFunctional from "./index.function"
import { images, SIZES } from '../../constant'
import FastImage from 'react-native-fast-image'

const AudioDetails = ({ route }) => {
    const { id } = route.params
    const {
        loading,
        audio_files,
        onRefresh,
        refreshing,
        onPressTab,
        isPlaying,
        onBackwardButton,
        onForwardButton,
        onPlayButton,
        title,
    } = AudioDetailsFunctional({ id })

    return (
        <Container  title={"AUDIOLIBRO"} >
            <FlatList
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
                data={audio_files}
                keyExtractor={item => item?.id}
                showsVerticalScrollIndicator={false}
                ListFooterComponent={<SizedBox height={SIZES.padding * 2} />}
                renderItem={({ item, index }) => (
                    <SingleFolderView
                        image={images.audio_icon_image}
                        onPress={() => onPressTab(index)}
                        title={item?.title}
                    />
                )}
            />

            {audio_files?.length > 0 &&

                <FastImage
                    style={styles.audio_view}
                    source={images.audio_background_image}
                    resizeMode={FastImage.resizeMode.stretch}>
                    <View style={styles.image_row}>
                        <TouchableOpacity
                            style={styles.image_view}
                            onPress={onBackwardButton}>
                            <FastImage
                                source={images.audio_back_image}
                                resizeMode={FastImage.resizeMode.stretch}
                                style={styles.image}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.play_image_view}
                            onPress={onPlayButton}>
                            <FastImage
                                source={
                                    isPlaying
                                        ? images.audio_pause_image
                                        : images.audio_play_image
                                }
                                resizeMode={FastImage.resizeMode.stretch}
                                style={styles.image}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.image_view}
                            onPress={onForwardButton}>
                            <FastImage
                                source={images.audio_forward_image}
                                resizeMode={FastImage.resizeMode.stretch}
                                style={styles.image}
                            />
                        </TouchableOpacity>
                        <Text  numberOfLines={4} style={styles.trackText}>{title}</Text>
                    </View>
                    <ProgressBar />
                </FastImage>

            }

            <LoaderModal visible={loading} />
        </Container>
    )
}

export default AudioDetails