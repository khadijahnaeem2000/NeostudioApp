import apiServices from "../../api_services/request-handler";
import { setAudioFiles, setAudios, setLoading } from "../slices/audio-slice";

export const getAudios = data => {
    return async dispatch => {
        try {
            dispatch(setLoading(true))
            const response = await apiServices.getAudios(data)
            dispatch(setLoading(false))
            if (response?.data?.status === 'Successfull') {
                dispatch(setAudios(response?.data?.data))
            }
        } catch (error) {
            dispatch(setLoading(false))
        }
    };
};
export const getAudioFiles = data => {
    return async dispatch => {
        try {
            dispatch(setLoading(true))
            const response = await apiServices.getAudioFiles(data)
            dispatch(setLoading(false))
            if (response?.data?.status === 'Successfull') {
                dispatch(setAudioFiles(response?.data?.data))
            }
        } catch (error) {
            dispatch(setLoading(false))
        }
    };
};