import { Text, FlatList, RefreshControl } from 'react-native'
import React from 'react'
import { Container, LoaderModal, SingleFolderView, SizedBox } from '../../Component'
import { styles } from './index.styles'
import RepasoFunctional from "./index.function"
import { SIZES } from '../../constant'
import { navigate } from '../../navigation/navigation_service'

const Repaso = () => {
    const {
        onRefresh,
        refreshing,
        loading,
        repaso_folders
    } = RepasoFunctional()

    return (
        <Container  title={'REPASO'} >
            <FlatList
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
                data={repaso_folders}
                keyExtractor={item => item?.id}
                showsVerticalScrollIndicator={false}
                ListFooterComponent={<SizedBox />}
                renderItem={({ item }) => (
                    <SingleFolderView
                        onPress={() =>
                            navigate('RepasoDetail', {
                                id: item?.id,
                                name: item?.name,
                            })
                        }
                        title={item?.name}
                    />
                )}
            />

            <LoaderModal visible={loading} />
        </Container>
    )
}

export default Repaso