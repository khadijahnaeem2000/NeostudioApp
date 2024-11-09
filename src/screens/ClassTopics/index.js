import { Text, FlatList, RefreshControl } from 'react-native'
import React from 'react'
import { Container, LoaderModal, SingleFolderView, SizedBox } from '../../Component'
import { styles } from './index.styles'
import ClassTopicsFunctional from "./index.function"
import { SIZES } from '../../constant'
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
        <Container>
            <Text style={styles.heading} >CLASES</Text>

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