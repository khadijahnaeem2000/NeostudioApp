import { FlatList, RefreshControl } from 'react-native'
import React from 'react'
import { Container, LoaderModal, SingleFolderView, SizedBox } from '../../Component'
import TemarioDetailFunctional from "./index.function"
import { images, SIZES } from '../../constant'
import { navigate } from '../../navigation/navigation_service'
import { SelectionModal } from './components'

const TemarioDetail = ({ route }) => {
    const { id } = route.params
    const {
        onRefresh,
        refreshing,
        loading,
        pdf_files,
        selectedPdfFile,
        setSelectedFile,
        setShowModal,
        showModal
    } = TemarioDetailFunctional({ id })

    return (
        <Container title={"TEMARIO"} >
            <FlatList
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
                data={pdf_files}
                keyExtractor={item => item?.id}
                showsVerticalScrollIndicator={false}
                ListFooterComponent={<SizedBox height={SIZES.padding * 2} />}
                renderItem={({ item, index }) => (
                    <SingleFolderView
                        image={images?.pdf_image}
                        onPress={() => {
                            setSelectedFile(item)
                            setShowModal(true)
                        }
                            // navigate('TemarioDetail', {
                            //     position: item?.id,
                            //     name: item?.name,
                            // })
                        }
                        title={item?.name}
                    />
                )}
            />


            <LoaderModal visible={loading} />
            <SelectionModal
                onPressClose={() => setShowModal(false)}
                visible={showModal}
                onPressHorizontal={() => {
                    setShowModal(false)
                    navigate('PdfView', { url: selectedPdfFile?.file })
                }}
                onPressVertical={() => {
                    setShowModal(false)
                    navigate('PdfView2', { url: selectedPdfFile?.file })
                }}
            />
        </Container>
    )
}

export default TemarioDetail