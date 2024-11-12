import { View, Text, FlatList, RefreshControl } from 'react-native'
import React from 'react'
import { Container, LoaderModal, SingleFolderView, SizedBox } from '../../Component'
import { styles } from './index.styles'
import TemarioFunctional from "./index.function"
import { SIZES } from '../../constant'
import { navigate } from '../../navigation/navigation_service'

const Temario = () => {
    const {
        onRefresh,
        refreshing,
        loading,
        pdf_folders
    } = TemarioFunctional()

    return (
        <Container>
            <Text style={styles.heading} >TEMARIO</Text>

            <FlatList
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
                style={{ paddingTop: SIZES.padding }}
                data={pdf_folders}
                keyExtractor={item => item?.id}
                showsVerticalScrollIndicator={false}
                ListFooterComponent={<SizedBox height={SIZES.padding * 2} />}
                renderItem={({ item, index }) => (
                    <SingleFolderView
                        onPress={() =>
                            navigate('TemarioDetail', {
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

export default Temario