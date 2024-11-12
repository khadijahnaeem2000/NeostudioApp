import { useFocusEffect } from "@react-navigation/native"
import { useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getPdfFolder } from "../../Redux/action"
import { getVideos } from "../../Redux/actions/video-action"
import Orientation from "react-native-orientation-locker"

export default () => {
    const dispatch = useDispatch()

    const { login } = useSelector(state => state.user)
    const { loading, videos } = useSelector(state => state.video)

    console.log("videos" ,videos)

    const [refreshing, setRefreshing] = useState(false)

    const getVideoData = () => {
        const apiData = {
            studentType: login.data.type,
            studentId: login?.data?.id,
            type: 'video',
        }
        dispatch(getVideos(apiData))
    }

    useFocusEffect(useCallback(() => { Orientation.lockToPortrait() }, []))

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