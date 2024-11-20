import apiServices from "../../api_services/request-handler";
import { setClasses, setLoading, setTopics, setMeetingStatus } from "../slices/classes-slice";

export const getClasses = data => {
    return async dispatch => {
        try {
            dispatch(setLoading(true))
            const response = await apiServices.getClasses(data)
            dispatch(setLoading(false))
            if (response?.data?.length > 0) {
                dispatch(setClasses(response?.data))
            }
        } catch (error) {
            dispatch(setLoading(false))
        }
    };
};
export const getTopics = data => {
    return async dispatch => {
        try {
            dispatch(setLoading(true))
            const response = await apiServices.getTopics(data)
            dispatch(setLoading(false))
            if (response?.data?.length > 0) {
                dispatch(setTopics(response?.data))
            }
        } catch (error) {
            dispatch(setLoading(false))
        }
    };
};
export const checkMeetingStatus = () => {
    return async dispatch => {
        try {
            const response = await apiServices.checkMeetingStatus()
            dispatch(setMeetingStatus(response?.data))
        } catch (error) {
            dispatch(setMeetingStatus(error?.data))
        }
    };
};