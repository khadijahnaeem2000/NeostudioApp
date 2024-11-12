import { View, Text, FlatList, RefreshControl } from 'react-native'
import React from 'react'
import { Container, LoaderModal, SingleFolderView, SizedBox } from '../../Component'
import { styles } from './index.styles'
import VideoDetailsFunctional from "./index.function"
import { images, SIZES } from '../../constant'

const VideoDetails = ({ route }) => {
    const { id } = route.params
    const {
        loading,
        video_files,
        onRefresh,
        refreshing,
        onPressTab
    } = VideoDetailsFunctional({ id })

    console.log("video_files", video_files?.[0])

    return (
        <Container>
            <Text style={styles.heading} >VÍDEOS</Text>

            <FlatList
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
                style={{ paddingTop: SIZES.padding }}
                data={video_files}
                showsVerticalScrollIndicator={false}
                ListFooterComponent={<SizedBox height={SIZES.padding * 2} />}
                renderItem={({ item, index }) => (
                    <SingleFolderView
                        key={index?.toString()}
                        image={images.video_icon_image}
                        onPress={() => onPressTab(item)}
                        title={item?.title}
                    />
                )}
            />


            <LoaderModal visible={loading} />
        </Container>
    )
}

export default VideoDetails