import apiServices from "../../api_services/request-handler";
import { setLoading, setVideoDetails, setVideoFiles, setVideos } from "../slices/video-slice";

export const getVideos = data => {
    return async dispatch => {
        try {
            dispatch(setLoading(true))
            const response = await apiServices.getVideos(data)
            dispatch(setLoading(false))
            if (response?.data?.status === 'Successfull') {
                dispatch(setVideos(response?.data?.data))
            }
        } catch (error) {
            dispatch(setLoading(false))
        }
    };
};
export const getVideoFiles = data => {
    return async dispatch => {
        try {
            dispatch(setLoading(true))
            const response = await apiServices.getVideoFiles(data)
            dispatch(setLoading(false))
            if (response?.data?.status === 'Successfull') {
                dispatch(setVideoFiles(response?.data?.data))
            }
        } catch (error) {
            dispatch(setLoading(false))
        }
    };
};