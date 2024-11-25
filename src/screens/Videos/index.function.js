import {  useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getVideos } from "../../Redux/actions/video-action"

export default () => {
    const dispatch = useDispatch()

    const { login } = useSelector(state => state.user)
    const { loading, videos } = useSelector(state => state.video)

    const [refreshing, setRefreshing] = useState(false)

    const getVideoData = () => {
        const apiData = {
            studentType: login?.data?.type,
            studentId: login?.data?.id,
            type: 'video',
        }
        dispatch(getVideos(apiData))
    }

    useEffect(() => { getVideoData() }, [])

    const onRefresh = async () => {
        setRefreshing(true)
        await getVideoData()
        setRefreshing(false)
    }

    return {
        loading,
        videos,
        refreshing,
        onRefresh
    }

}