import { View, Text, FlatList, RefreshControl } from 'react-native'
import React from 'react'
import { Container, LoaderModal, SingleFolderView, SizedBox } from '../../Component'
import { styles } from './index.styles'
import FaqFunctional from "./index.function"
import { SIZES } from '../../constant'
import { navigate } from '../../navigation/navigation_service'

const Faq = () => {
    const {
        AuthLoading,
        pdfFolders,
        onRefresh,
        refreshing
    } = FaqFunctional()

    return (
        <Container>
            <Text style={styles.heading} >{"PREGUNTAS\nFRECUENTES"}</Text>

            <FlatList
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
                data={pdfFolders?.folders}
                keyExtractor={item => item?.id}
                showsVerticalScrollIndicator={false}
                ListFooterComponent={<SizedBox />}
                renderItem={({ item, index }) => (
                    <SingleFolderView
                        onPress={() =>
                            navigate('PdfDetail', {
                                position: item?.id,
                                name: item?.name,
                            })
                        }
                        title={item?.name}
                    />
                )}
            />


            <LoaderModal visible={AuthLoading} />
        </Container>
    )
}

export default Faq