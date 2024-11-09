import { useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getClasses, getTopics } from "../../Redux/actions/classes-action"
import { useFocusEffect } from "@react-navigation/native"
import Orientation from "react-native-orientation-locker"

export default ({ topicId }) => {
    const dispatch = useDispatch()

    const { login } = useSelector(state => state.user)
    const { topics, loading } = useSelector(state => state.classes)

    const [refreshing, setRefreshing] = useState(false)

    const getTopicsData = () => {
        const apiData = {
            type: 'video',
            topicId,
        }
        dispatch(getTopics(apiData))
    }
    useFocusEffect(useCallback(() => { Orientation.lockToPortrait() }, []))

    useEffect(() => { getTopicsData() }, [])

    const onRefresh = async () => {
        setRefreshing(true)
        await getTopicsData()
        setRefreshing(false)
    }

    return {
        refreshing,
        onRefresh,
        loading,
        topics,
        login
    }

}