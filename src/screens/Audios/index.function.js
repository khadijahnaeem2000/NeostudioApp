import {  useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAudios } from "../../Redux/actions/audio-action"

export default () => {
    const dispatch = useDispatch()

    const { login } = useSelector(state => state.user)
    const { loading, audios } = useSelector(state => state.audio)

    const [refreshing, setRefreshing] = useState(false)

    const getAudioData = () => {
        const apiData = {
            studentType: login?.data?.type,
            studentId: login?.data?.id,
            type: 'audio',
        }
        dispatch(getAudios(apiData))
    }

    useEffect(() => { getAudioData() }, [])

    const onRefresh = async () => {
        setRefreshing(true)
        await getAudioData()
        setRefreshing(false)
    }

    return {
        loading,
        audios,
        refreshing,
        onRefresh
    }

}