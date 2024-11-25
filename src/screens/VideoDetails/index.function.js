import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getVideoFiles } from "../../Redux/actions/video-action"
import { Alert } from "react-native"
import { navigate } from "../../navigation/navigation_service"

export default ({ id }) => {
    const dispatch = useDispatch()

    const { login } = useSelector(state => state.user)
    const { loading, video_files } = useSelector(state => state.video)

    const [refreshing, setRefreshing] = useState(false)

    const getVideoData = () => {
        const apiData = {
            studentId: login?.data?.id,
            id,
        }
        dispatch(getVideoFiles(apiData))
    }

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
                navigate('VideoPlayer', {
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