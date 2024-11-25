import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getRepasoFolders } from "../../Redux/actions/repaso-action"

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