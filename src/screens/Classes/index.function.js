import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getClasses } from "../../Redux/actions/classes-action"

export default () => {
    const dispatch = useDispatch()

    const { login } = useSelector(state => state.user)
    const { classes, loading } = useSelector(state => state.classes)

    const [refreshing, setRefreshing] = useState(false)

    const getClassesData = () => {
        const apiData = {
            studentType: login.data.type,
            studentId: login?.data?.id,
        }
        dispatch(getClasses(apiData))
    }


    useEffect(() => { getClassesData() }, [])

    const onRefresh = async () => {
        setRefreshing(true)
        await getClassesData()
        setRefreshing(false)
    }

    return {
        refreshing,
        onRefresh,
        loading,
        classes
    }

}