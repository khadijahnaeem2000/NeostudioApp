import { useCallback, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { isIOS } from "../../constant/theme"
import { clearStates, getCurrentUser, getUserTikTokVideos, logout, saveUserRankPoint, saveUserToken, updateLoginTime, updateRank, updateUserProfile, updateUserRankPoint } from "../../Redux/action"
import { getPurchaseHistory } from "react-native-iap"
import { requestUserPermission } from "../../services/notification_service"
import { useFocusEffect } from "@react-navigation/native"
import InAppBrowser from "react-native-inappbrowser-reborn";
import { Alert, Linking } from "react-native"
import { navigate } from "../../navigation/navigation_service"
import Orientation from "react-native-orientation-locker"
import { directo_url } from "../../config"

export default () => {
    const dispatch = useDispatch()
    const { login, activityId } = useSelector(state => state.user)

    const [selectedId, setSelectedId] = useState(null)
    const [showVersionModal, setShowVersionModal] = useState(false)
    const [showImageModal, setShowImageModal] = useState(false)
    const [showSliderModal, setShowSliderModal] = useState(false)
    const [showAvatarModal, setShowAvatarModal] = useState(false)
    const [showRatingModal, setShowRatingModal] = useState(false)
    const [showPruebaModal, setShowPruebaModal] = useState(false)
    const [showEmailModal, setShowEmailModal] = useState(false)
    const [showExamModal, setShowExamModal] = useState(false)
    const [isLoading, setIsLoading] = useState(false)


    const validate = async (receipt) => {
        await checkPackageExpired(
            receipt,
            "70f6c4d6a650424c9636968b5fbc6b3a",
            true,
            false,
            login?.data?.id
        );
        await setIsLoading(true)
    };

    const fetchReceipt = () => {
        initConnection()
            .catch((error) => { })
            .then(() => {
                getPurchaseHistory()
                    .then((res) => {
                        const receipt = res[res.length - 1].transactionReceipt;
                        if (receipt) {
                            validate(receipt);
                        }
                    })
                    .catch(() => { });
            });
    };

    const refreshAppData = async () => {
        const token = await requestUserPermission()
        if (login?.data?.type === 'Prueba') {
            setShowPruebaModal(true)
        }
        try {
            if (login.data.IsBlocked === "False" || !login?.data?.IsBlocked) {
                if (isIOS) {
                    fetchReceipt();
                }
                dispatch(clearStates())

                await Promise.all([
                    updateRank(login?.data?.id),
                    dispatch(updateLoginTime(login?.data?.id)),
                    dispatch(updateUserProfile(login?.data?.id)),
                    dispatch(saveUserToken(login?.data?.id, token)),
                    dispatch(getCurrentUser(login?.data?.id, login.data.type)),
                    saveUserRankPoint("Yes", "No", "normal_points", login?.data?.id),
                ]);
            } else {
                this.props.logout();
            }
        } catch (error) { }
    };

    useFocusEffect(
        useCallback(() => {
            refreshAppData()
        }, [],))

    const openLink = async () => {
        try {
            const url = "https://neoestudio.net/";
            if (await InAppBrowser.isAvailable()) {
                const result = await InAppBrowser.open(url, {
                    // iOS Propertiesnt/
                    dismissButtonStyle: "cancel",
                    preferredBarTintColor: "#99adbc",
                    preferredControlTintColor: "white",
                    readerMode: false,
                    animated: true,
                    modalPresentationStyle: "overFullScreen",
                    modalTransitionStyle: "partialCurl",
                    modalEnabled: true,
                    enableBarCollapsing: false,
                    // Android Properties
                    showTitle: true,
                    toolbarColor: "#2c3f4f",
                    secondaryToolbarColor: "black",
                    enableUrlBarHiding: true,
                    enableDefaultShare: true,
                    forceCloseOnRedirection: false,
                    animations: {
                        startEnter: "slide_in_right",
                        startExit: "slide_out_left",
                        endEnter: "slide_in_left",
                        endExit: "slide_out_right",
                    },
                    headers: {
                        "my-custom-header": "my custom header value",
                    },
                });
            } else Linking.openURL(url);
        } catch (error) {
            Alert.alert(error.message);
        }
    }
    const onPressTab = async (type) => {
        Orientation.unlockAllOrientations();

        if (type === 'activities') {
            if (activityId) navigate("Activity")
            else navigate('Actividad')
        }

        if (type === 'calendar') {
            navigate("Calender")
        }

        if (type === 'classes') {
            if (!login.package) navigate("Classes")
            else if (login.data.type === "Alumno" && login.package.course === "Gold") setShowEmailModal(true)
        }

        if (type === 'directo') {
            Linking.openURL(directo_url + login?.data?.id)
        }

        if (type === 'entertainment') {
            setIsLoading(true)
            await getUserTikTokVideos("Alumno");
            setIsLoading(false)
        }

        if (type === 'exams') {
            updateUserRankPoint("Yes", "No", "normal_points", login?.data?.id)
            if (isIOS) {
                navigate("Exams")
            } else {
                navigate("ExamFile", {
                    isRefresh: "false",
                })

            }
        }

        if (type === 'repaso') {
            updateUserRankPoint("Yes", "No", "normal_points", login?.data?.id)
            navigate("Repaso")
        }

        if (type === 'battle') {
            navigate("ActiveBattle")
        }

        if (type === 'ai') {
            navigate("AI")
        }

        if (type === 'stripe_support') {
        }

        if (type === 'whatsapp_support') {
        }

        if (type === 'audio') {
            if (!login.package) navigate("Audios")
            else if (login.data.type === "Alumno" && login.package.course === "Silver") setShowEmailModal(true)
            else navigate("Audios")
        }

        if (type === 'video') {
            if (!login.package) navigate("Videos")
            else if (login.data.type === "Alumno" && login.package.course === "Silver") setShowEmailModal(true)
            else navigate("Videos")
        }

        if (type === 'pdf') {
            if (!login.package) navigate("Temario")
            else if (login.data.type === "Alumno" && login.package.course === "Silver") setShowEmailModal(true)
            else navigate("Temario")
        }

        if (type === 'home_modal') {
            setShowSliderModal(true)
        }

        if (type === 'exam_modal') {
            setShowExamModal(true)
        }

        if (type === 'ranking') {
            navigate("GlobalRanking")
        }

        if (type === 'pagina') {
            navigate("GlobalRanking")
        }

        if (type === 'descargas') {
            navigate("Survey")
        }

        if (type === 'entervista') {
            navigate("Personality")
        }

        if (type === 'ajustes') {
            navigate("Settings")
        }

        if (type === 'logout') {
            dispatch(logout())
        }
    };




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
        login,
        onPressTab,
        showEmailModal,
        setShowEmailModal,
        showExamModal,
        setShowExamModal,
        isLoading,
        showPruebaModal,
        setShowPruebaModal
    }

}