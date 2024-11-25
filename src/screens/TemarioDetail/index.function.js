import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getPdfFiles, getPdfFolders } from "../../Redux/actions/temario-action"

export default ({ id }) => {
    const dispatch = useDispatch()

    const { login } = useSelector(state => state.user)
    const { loading, pdf_files } = useSelector(state => state.temario)

    const [refreshing, setRefreshing] = useState(false)
    const [selectedPdfFile, setSelectedFile] = useState(null)
    const [showModal, setShowModal] = useState(false)

    const getPdfData = () => {
        const apiData = {
            folderId: id,
            studentId: login?.data?.id,
        }
        dispatch(getPdfFiles(apiData))
    }

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
        pdf_files,
        selectedPdfFile,
        setSelectedFile,
        showModal,
        setShowModal
    }

}