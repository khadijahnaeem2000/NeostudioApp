import { useState } from "react"
import { useSelector } from "react-redux"

export default () => {
    const { login } = useSelector(state => state.user)

    const [selectedId, setSelectedId] = useState(null)
    const [showVersionModal, setShowVersionModal] = useState(false)
    const [showImageModal, setShowImageModal] = useState(false)
    const [showSliderModal, setShowSliderModal] = useState(false)
    const [showAvatarModal, setShowAvatarModal] = useState(false)
    const [showRatingModal, setShowRatingModal] = useState(false)


    return {
        showVersionModal,
        setShowVersionModal,
        showImageModal,
        setShowImageModal,
        showSliderModal,
        setShowSliderModal,
        showAvatarModal,
        setShowAvatarModal,
        showRatingModal,
        setShowRatingModal,
        selectedId,
        setSelectedId,
        login
    }

}