import { useFocusEffect } from "@react-navigation/native"
import { useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllExams } from "../../Redux/actions/exam-action"
import { navigate } from "../../navigation/navigation_service"
import Orientation from "react-native-orientation-locker"

export default () => {
    const dispatch = useDispatch()

    const { login, } = useSelector(state => state.user)
    const { exams, loading } = useSelector(state => state.exam)

    const [refreshing, setRefreshing] = useState(false)
    const [selectedExam, setSelcetedExam] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [isPsicotechnics, setIsPsicotechnics] = useState(false)
    const [isHtml, setIsHtml] = useState(false)

    const getAllExamsData = (isRestart, examId) => {
        const apiData = {
            studentId: login?.data?.id,
            studentType: login?.data?.type,
            examId: examId,
            isRestart: isRestart,
        }
        dispatch(getAllExams(apiData))
    }


    useFocusEffect(useCallback(() => {
        Orientation.lockToPortrait()
        getAllExamsData('no', null)
    }, []))


    const onRefresh = async () => {
        setRefreshing(true)
        await getAllExamsData('no', null)
        setRefreshing(false)
    }

    const onPressBegin = () => {
        if (!selectedExam) {
            dispatch(dispatchExamText())
            dispatch(dispatchFuncOn())
        } else {
            if (selectedExam?.studentExamStatus === 'end') {
                navigate('Review', {
                    id: selectedExam?.studentExamRecordId,
                    isImage: isPsicotechnics,
                    type: 'exam',
                    isHtml
                })
            } else {
                navigate('Test', {
                    examsId: selectedExam?.id,
                    totalTime: selectedExam?.examDuration,
                    isPsico: isPsicotechnics,
                    type: 'exam',
                    isHtml,
                    isReshedule: selectedExam?.isReshedule,
                })
            }
        }

    }

    return {
        loading,
        refreshing,
        onRefresh,
        selectedExam,
        setSelcetedExam,
        showModal,
        setShowModal,
        getAllExamsData,
        exams,
        onPressBegin,
        setIsPsicotechnics,
        setIsHtml
    }

}