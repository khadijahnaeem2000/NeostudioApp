import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getTopics } from "../../Redux/actions/classes-action"

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