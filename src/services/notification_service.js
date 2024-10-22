
import messaging from '@react-native-firebase/messaging';
import { Platform } from 'react-native';
import { setPopupContent, setShowPopup } from '../Redux/slices/popup-slice';
export const getDeviceToken = async () => {
    try {
        if (Platform.OS === 'ios') {
            const apns = await messaging().getAPNSToken()
            console.log("apneesssssss", apns)
        }
        const fcmToken = await messaging().getToken();
        if (fcmToken) {
            console.log('FCM token:', fcmToken);
        }
        return fcmToken; // Return the token
    } catch (error) {
        console.error('Error getting FCM token:', error);
    }
};


export async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
        let token = await getDeviceToken();
        return token;
    }
}


export const notificationListener = async (dispatch) => {

    messaging().onNotificationOpenedApp(remoteMessage => {
        if (remoteMessage?.notification?.body) {
        }
    });
    messaging().onMessage(async remoteMessage => {
        console.log("remoteMessage?.data", remoteMessage?.data?.type)
        console.log("remoteMessage?.notification", remoteMessage?.notification)
        if (remoteMessage?.data?.type === 'result' && Platform.OS === 'ios') {
            const obj = {
                message: remoteMessage?.notification?.body,
                title: remoteMessage?.notification?.title,
                image: remoteMessage?.data?.image,
                data: remoteMessage?.data,
              }
              dispatch(setShowPopup(true))
              dispatch(setPopupContent(obj))
              setTimeout(() => {
                dispatch(setShowPopup(false))
              }, 3000);
            // dispatch(setShowNotificationModal(true))
            // dispatch(setNotificationData({
            //     title: remoteMessage?.notification?.title,
            //     message: remoteMessage?.notification?.body,
            // }))


            // setTimeout(() => {
            //     dispatch(setShowNotificationModal(false))
            // }, 3000);

        }
    });
    messaging()
        .getInitialNotification()
        .then(remoteMessage => {
            if (remoteMessage?.notification?.body) {
            }
        });
};
