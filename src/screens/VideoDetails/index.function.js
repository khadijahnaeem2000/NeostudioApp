import { useFocusEffect } from "@react-navigation/native"
import { useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getVideoFiles } from "../../Redux/actions/video-action"
import Orientation from "react-native-orientation-locker"
import { Alert } from "react-native"
import { navigate } from "../../navigation/navigation_service"

export default ({ id }) => {
    const dispatch = useDispatch()

    const { login } = useSelector(state => state.user)
    const { loading, video_files } = useSelector(state => state.video)

    console.log("videos", video_files)

    const [refreshing, setRefreshing] = useState(false)

    const getVideoData = () => {
        const apiData = {
            studentId: login?.data?.id,
            id,
        }
        dispatch(getVideoFiles(apiData))
    }

    useFocusEffect(useCallback(() => { Orientation.lockToPortrait() }, []))

    useEffect(() => { getVideoData() }, [])

    const onRefresh = async () => {
        setRefreshing(true)
        await getVideoData()
        setRefreshing(false)
    }

    const onPressTab = (item) => {
        if (item?.vimeolink == null) {
            Alert.alert('Enlace de vídeo no disponible')
        } else {
            (
                Orientation.unlockAllOrientations(),
                navigate('TestVideo', {
                    url: item.url,
                    vimeoLink: item?.vimeolink,
                    id: login?.data?.id,
                })
            )
        }
    }

    return {
        loading,
        video_files,
        refreshing,
        onRefresh,
        onPressTab
    }

}