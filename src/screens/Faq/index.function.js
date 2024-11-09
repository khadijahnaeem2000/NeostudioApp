import { useFocusEffect } from "@react-navigation/native"
import { useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getPdfFolder } from "../../Redux/action"

export default () => {
    const dispatch = useDispatch()

    const { login, AuthLoading, pdfFolders } = useSelector(state => state.user)

    const [refreshing, setRefreshing] = useState(false)


    useEffect(() => { dispatch(getPdfFolder(login.data.type, login?.data?.id)) }, [])

    const onRefresh = async () => {
        setRefreshing(true)
        await dispatch(getPdfFolder(login.data.type, login?.data?.id))
        setRefreshing(false)
    }

    return {
        AuthLoading,
        pdfFolders,
        refreshing,
        onRefresh
    }

}