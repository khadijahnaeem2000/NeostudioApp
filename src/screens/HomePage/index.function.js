import { useCallback, useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { isIOS } from "../../constant/theme"
import { clearStates, getCurrentUser, getUserTikTokVideos, logout, saveUserRankPoint, saveUserToken, storeAvatarImage, storeGalleryImage, updateLoginTime, updateRank, updateUserProfile, updateUserRankPoint } from "../../Redux/action"
import { getPurchaseHistory, initConnection } from "react-native-iap"
import { requestUserPermission } from "../../services/notification_service"
import { useFocusEffect } from "@react-navigation/native"
import InAppBrowser from "react-native-inappbrowser-reborn";
import { Alert, Dimensions, Linking } from "react-native"
import { navigate } from "../../navigation/navigation_service"
import Orientation from "react-native-orientation-locker"
import { directo_url } from "../../config"
import moment from "moment"
import { checkMeetingStatus } from "../../Redux/actions/classes-action"
import ImagePicker from "react-native-image-crop-picker";
import { version, iosVerion } from "../../../package.json";

export default () => {
    const listRef = useRef(null);
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
    const [isLandScape, setIsLandScape] = useState(false)

    const isPortrait = () => {
        const dim = Dimensions.get('screen');
        return dim.height >= dim.width;
    };

    useEffect(() => {
        Dimensions.addEventListener('change', () => {
            setIsLandScape(isPortrait() ? false : true)
        });

    }, [Dimensions])

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
    const checkAppVersion = () => {
        if (!isIOS && login?.data?.androidVersion !== version) {
            setShowVersionModal(true)
        } else if (isIOS && login?.data?.iosVersion !== iosVerion) {
            setShowVersionModal(true)
        }
    }
    const refreshAppData = async () => {
        const token = await requestUserPermission()
        checkAppVersion()
        if (login?.data?.type === 'Prueba') {
            setShowPruebaModal(true)
        }
        try {
            if (login?.data?.IsBlocked === "False" || !login?.data?.IsBlocked) {
                if (isIOS) {
                    fetchReceipt();
                }
                dispatch(clearStates())
                updateRank(login?.data?.id)
                dispatch(updateLoginTime(login?.data?.id))
                dispatch(updateUserProfile(login?.data?.id))
                dispatch(saveUserToken(login?.data?.id, token))
                dispatch(getCurrentUser(login?.data?.id, login?.data?.type))
                saveUserRankPoint("Yes", "No", "normal_points", login?.data?.id)
            } else {
                this.props.logout();
            }
        } catch (error) {
            console.error("error", error)
        }
    };
    const getTime = () => {

        if (login?.data && login?.data?.expiry_date) {
            const currentDate = moment(); // Current date and time
            const targetDate = moment(login?.data?.expiry_date); // Target date parsed as a moment object

            const differenceInMillis = targetDate.diff(currentDate); // Difference in milliseconds

            if (differenceInMillis <= 0) {
                return "00:00:00"
            }

            const duration = moment.duration(differenceInMillis); // Create a duration object
            const hours = Math.floor(duration.asHours()); // Extract total hours
            const minutes = duration.minutes(); // Extract minutes
            const seconds = duration.seconds(); // Extract seconds
            return `${hours || "00"}:${minutes || "00"}m:${seconds || "00"}s`
        }
    }


    useFocusEffect(
        useCallback(() => {
            Orientation.lockToPortrait();
            refreshAppData()
            dispatch(checkMeetingStatus())
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
            else if (login?.data?.type === "Alumno" && login.package.course === "Gold") setShowEmailModal(true)
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
            navigate("Exams")

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
            Linking.openURL(login?.data?.resolucion)
        }

        if (type === 'whatsapp_support') {
            Linking.openURL(login?.data?.support)
        }

        if (type === 'audio') {
            if (!login.package) navigate("Audios")
            else if (login?.data?.type === "Alumno" && login.package.course === "Silver") setShowEmailModal(true)
            else navigate("Audios")
        }

        if (type === 'video') {
            if (!login.package) navigate("Videos")
            else if (login?.data?.type === "Alumno" && login.package.course === "Silver") setShowEmailModal(true)
            else navigate("Videos")
        }

        if (type === 'pdf') {
            if (!login.package) navigate("Temario")
            else if (login?.data?.type === "Alumno" && login.package.course === "Silver") setShowEmailModal(true)
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
            Linking.openURL(login?.data?.paginaweb)
        }

        if (type === 'descargas') {
            navigate("DownUpload")
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



    const handlePostImage = async (type, image) => {
        console.log("image", image)
        // setTimeout(() => {
        //     setIsLoading(true)
        // }, 1000);
        try {
            if (type === "gallery") {
                await storeGalleryImage(login?.data?.id, image);
                setIsLoading(false)
                dispatch(getCurrentUser(login?.data?.id, login?.data?.type))
            } else {
                await storeAvatarImage(login?.data?.id, image);
                setIsLoading(false)
                dispatch(getCurrentUser(login?.data?.id, login?.data?.type))
            }

        } catch (error) {
            console.log("Catch erororrr", error)
            setIsLoading(false)
        }
    };
    const onPressGallery = (type) => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true,
        })
            .then((image) => {
                setShowAvatarModal(false)
                let data = "";
                data = {
                    uri: image.path,
                    type: image.mime,
                    name: Date.now() + "_Wine.png",
                };

                handlePostImage(type, data);
            })
            .catch((error) => { });
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
        setShowPruebaModal,
        getTime,
        isLandScape,
        listRef,
        onPressGallery,
        handlePostImage
    }

}