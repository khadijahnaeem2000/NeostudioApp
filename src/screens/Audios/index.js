import { Text, FlatList, RefreshControl } from 'react-native'
import React from 'react'
import { Container, LoaderModal, SingleFolderView, SizedBox } from '../../Component'
import { styles } from './index.styles'
import AudiosFunctional from "./index.function"
import { SIZES } from '../../constant'
import { navigate } from '../../navigation/navigation_service'

const Audios = () => {
    const {
        loading,
        audios,
        onRefresh,
        refreshing
    } = AudiosFunctional()

    return (
        <Container>
            <Text style={styles.heading} >AUDIOLIBRO</Text>

            <FlatList
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
                style={{ paddingTop: SIZES.padding }}
                data={audios}
                keyExtractor={item => item?.id}
                showsVerticalScrollIndicator={false}
                ListFooterComponent={<SizedBox height={SIZES.padding * 2} />}
                renderItem={({ item }) => (
                    <SingleFolderView
                        onPress={() => navigate('AudioDetails', { id: item?.id })}
                        title={item?.name}
                    />
                )}
            />


            <LoaderModal visible={loading} />
        </Container>
    )
}

export default Audios