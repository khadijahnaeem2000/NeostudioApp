import { Text, FlatList, RefreshControl } from 'react-native'
import React from 'react'
import { ConfirmationModal, Container, LoaderModal, SingleFolderView, SizedBox } from '../../Component'
import { styles } from './index.styles'
import RepasoDetailFunctional from "./index.function"
import { images, SIZES } from '../../constant'
import { isIOS } from 'react-native-elements/dist/helpers'

const RepasoDetail = ({ route }) => {
    const { id, name } = route.params
    const {
        onRefresh,
        refreshing,
        loading,
        repaso_exams,
        onPressTab,
        selectedExam,
        setSelectedExam,
        setShowModal,
        showModal,
        getRepasoExamsData
    } = RepasoDetailFunctional({ id, name })

    return (
        <Container>
            <Text style={styles.heading} >REPASODETAIL</Text>

            <FlatList
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
                data={repaso_exams}
                keyExtractor={item => item?.id}
                showsVerticalScrollIndicator={false}
                ListFooterComponent={<SizedBox />}
                renderItem={({ item, index }) => {
                    const isComplete = item.studentStatus === 'Habilitado'
                    return (
                        <SingleFolderView
                            image={isComplete ? images?.complete_exam : images.incomplete_exam}
                            onPress={() => onPressTab(item)}
                            title={item?.name}
                            onLongPress={() => {
                                setSelectedExam(item?.studentExamRecordId)
                                setShowModal(true)
                            }}
                        />
                    )
                }}
            />

            <LoaderModal visible={loading} />
            <ConfirmationModal
                visible={showModal}
                onPressClose={() => setShowModal(false)}
                onPressYes={() => {
                    setShowModal(false)
                    setTimeout(() => {
                        getRepasoExamsData('yes', selectedExam)
                    }, isIOS ? 300 : 0);

                }}
            />
        </Container>
    )
}

export default RepasoDetail