import { useFocusEffect } from "@react-navigation/native"
import { useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getRepasoFolders } from "../../Redux/actions/repaso-action"
import Orientation from "react-native-orientation-locker"

export default () => {
    const dispatch = useDispatch()

    const { login, } = useSelector(state => state.user)
    const { repaso_folders, loading } = useSelector(state => state.repaso)

    const [refreshing, setRefreshing] = useState(false)

    const getRepasoFoldersData = () => {
        const apiData = {
            studentType: login?.data?.type,
            studentId: login?.data?.id,
        }
        dispatch(getRepasoFolders(apiData))
    }
    
    useFocusEffect(useCallback(() => { Orientation.lockToPortrait() }, []))


    useEffect(() => { getRepasoFoldersData() }, [])

    const onRefresh = async () => {
        setRefreshing(true)
        await getRepasoFoldersData()
        setRefreshing(false)
    }

    return {
        loading,
        repaso_folders,
        refreshing,
        onRefresh
    }

}