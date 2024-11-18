import { FlatList, RefreshControl } from 'react-native'
import React from 'react'
import { Container, LoaderModal, SingleFolderView, SizedBox } from '../../Component'
import ClassTopicsFunctional from "./index.function"
import { images, SIZES } from '../../constant'
import { navigate } from '../../navigation/navigation_service'
import Orientation from 'react-native-orientation-locker'

const ClassTopics = ({ route }) => {
    const { topicId } = route.params
    const {
        onRefresh,
        refreshing,
        topics,
        loading,
        login
    } = ClassTopicsFunctional({ topicId })

    return (
        <Container title={"CLASES"} >
            <FlatList
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
                style={{ paddingTop: SIZES.padding }}
                data={topics}
                keyExtractor={item => item?.id}
                showsVerticalScrollIndicator={false}
                ListFooterComponent={<SizedBox height={SIZES.padding * 2} />}
                renderItem={({ item }) => (
                    <SingleFolderView
                    image={images.video_icon_image}
                        onPress={() => {
                            Orientation.unlockAllOrientations()
                            navigate("TestVideo", {
                                url: item?.material,
                                vimeoLink: item?.vimeolink,
                                id: login?.data?.id,
                            })
                        }
                        }
                        title={item?.name}
                    />
                )}
            />


            <LoaderModal visible={loading} />
        </Container>
    )
}

export default ClassTopics