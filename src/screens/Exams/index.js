import { View, Text, ScrollView, TouchableOpacity, FlatList, RefreshControl } from 'react-native'
import React from 'react'
import { ConfirmationModal, Container, LoaderModal, SizedBox } from '../../Component'
import ExamsFunctional from "./index.function"
import FastImage from 'react-native-fast-image'
import { images } from '../../constant'
import { styles } from './index.styles'
import { SingleExamView, SingleTopView } from './components'

const Exams = () => {

    const {
        getAllExamsData,
        loading, onRefresh,
        refreshing,
        exams,
        selectedExam,
        setSelcetedExam,
        setShowModal,
        showModal,
        onPressBegin,
        setIsPsicotechnics,
        setIsHtml
    } = ExamsFunctional()

    return (
        <Container title={'EXÁMENES'} isExam >
            <View style={styles.sub_view} >

                <FlatList
                    refreshControl={
                        <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
                    }
                    data={exams}
                    showsVerticalScrollIndicator={false}
                    ListFooterComponent={<SizedBox />}
                    renderItem={({ item, index }) => {
                        return (
                            <SingleExamView
                                item={item}
                                key={index?.toString()}
                                onPress={(val, isPsico, isHtml) => (setSelcetedExam(val), setIsPsicotechnics(isPsico), setIsHtml(isHtml))}
                                selectedExam={selectedExam}
                                onLongPress={val => {
                                    setSelcetedExam(val)
                                    if (val?.studentExamStatus === 'end') {
                                        setShowModal(true)
                                    }
                                }}
                            />
                        )
                    }}
                />
            </View>



            <TouchableOpacity activeOpacity={0.6} onPress={onPressBegin} >
                <FastImage
                    style={styles.btn_image}
                    resizeMode={FastImage.resizeMode.contain}
                    source={images.begin_btn_image}
                />
            </TouchableOpacity>



            <LoaderModal visible={loading} />
            <ConfirmationModal
                onPressClose={() => setShowModal(false)}
                visible={showModal}
                onPressYes={() => {
                    setShowModal(false)
                    getAllExamsData('yes', selectedExam?.studentExamRecordId)
                }}
            />
        </Container>
    )
}

export default Exams