import { FlatList, RefreshControl } from 'react-native'
import React from 'react'
import { Container, LoaderModal, SingleFolderView, SizedBox } from '../../Component'
import ClassesFunctional from "./index.function"
import { SIZES } from '../../constant'
import { navigate } from '../../navigation/navigation_service'

const Classes = () => {
    const {
        onRefresh,
        refreshing,
        classes,
        loading
    } = ClassesFunctional()

    return (
        <Container title={"CLASES"} >
            <FlatList
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
                style={{ paddingTop: SIZES.padding }}
                data={classes}
                keyExtractor={item => item?.id}
                showsVerticalScrollIndicator={false}
                ListFooterComponent={<SizedBox height={SIZES.padding * 2} />}
                renderItem={({ item }) => (
                    <SingleFolderView
                        onPress={() => navigate("ClassTopics", { topicId: item?.id })}
                        title={item?.name}
                    />
                )}
            />


            <LoaderModal visible={loading} />
        </Container>
    )
}

export default Classes