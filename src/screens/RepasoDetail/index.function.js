import { useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getRepasoExams } from "../../Redux/actions/repaso-action"
import { navigate } from "../../navigation/navigation_service"
import { useFocusEffect } from "@react-navigation/native"
import Orientation from "react-native-orientation-locker"

export default ({ id, name }) => {
    const dispatch = useDispatch()

    const { login, } = useSelector(state => state.user)
    const { repaso_exams, loading } = useSelector(state => state.repaso)

    const [refreshing, setRefreshing] = useState(false)
    const [selectedExam, setSelectedExam] = useState(null)
    const [showModal, setShowModal] = useState(false)

    const getRepasoExamsData = (isRestart, examId) => {
        const apiData = {
            studentType: login?.data?.type,
            studentId: login?.data?.id,
            folderId: id,
            examId: examId,
            isRestart: isRestart,
        }
        dispatch(getRepasoExams(apiData))
    }

    useFocusEffect(useCallback(() => {
        getRepasoExamsData('no', null)
        Orientation.lockToPortrait()
    }, []))

    const onRefresh = async () => {
        setRefreshing(true)
        await getRepasoExamsData('no', null)
        setRefreshing(false)
    }

    const onPressTab = (item) => {
        if (item?.studentStatus === 'Habilitado') {
            navigate('Test', {
                examsId: item?.id,
                totalTime: item?.examDuration,
                isPsico: false,
                type: 'reviewExam',
                isReshedule: item?.isReshedule,
                isRepasoImage: name.includes('Psicotécnicos')
                    ? true
                    : false,
            });
        } else if (item?.studentExamStatus === 'end') {
            navigate('Review', {
                id: item?.studentExamRecordId,
                isImage: false,
                type: 'reviewExam',
                isRepasoImage: name?.includes('Psicotécnicos')
                    ? true
                    : false,
            });
        }
    }

    return {
        loading,
        repaso_exams,
        refreshing,
        onRefresh,
        onPressTab,
        selectedExam,
        setSelectedExam,
        showModal,
        setShowModal,
        getRepasoExamsData
    }

}