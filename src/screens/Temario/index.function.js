import { useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getPdfFolders } from "../../Redux/actions/temario-action"
import { useFocusEffect } from "@react-navigation/native"
import Orientation from "react-native-orientation-locker"

export default () => {
    const dispatch = useDispatch()

    const { login } = useSelector(state => state.user)
    const { loading, pdf_folders } = useSelector(state => state.temario)

    const [refreshing, setRefreshing] = useState(false)

    const getPdfData = () => {
        const apiData = {
            studentType: login.data.type,
            studentId: login?.data?.id,
        }
        dispatch(getPdfFolders(apiData))
    }

    useFocusEffect(useCallback(() => { Orientation.lockToPortrait() }, []))

    useEffect(() => { getPdfData() }, [])

    const onRefresh = async () => {
        setRefreshing(true)
        await getPdfData()
        setRefreshing(false)
    }

    return {
        refreshing,
        onRefresh,
        loading,
        pdf_folders
    }

}