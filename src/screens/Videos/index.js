import { FlatList, RefreshControl } from 'react-native'
import React from 'react'
import { Container, LoaderModal, SingleFolderView, SizedBox } from '../../Component'
import VideosFunctional from "./index.function"
import { SIZES } from '../../constant'
import { navigate } from '../../navigation/navigation_service'

const Videos = () => {
    const {
        loading,
        videos,
        onRefresh,
        refreshing
    } = VideosFunctional()

    return (
        <Container title={'VÍDEOS'}>
            <FlatList
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
                data={videos}
                keyExtractor={item => item?.id}
                showsVerticalScrollIndicator={false}
                ListFooterComponent={<SizedBox height={SIZES.padding * 2} />}
                renderItem={({ item }) => (
                    <SingleFolderView
                        onPress={() => navigate('VideoDetails', { id: item?.id })}
                        title={item?.name}
                    />
                )}
            />


            <LoaderModal visible={loading} />
        </Container>
    )
}

export default Videos