import apiServices from "../../api_services/request-handler";
import { setLoading, setPdfFiles, setPdfFolders } from "../slices/temario-slice";

export const getPdfFolders = data => {
    return async dispatch => {
        try {
            dispatch(setLoading(true))
            const response = await apiServices.getPdfFolders(data)
            dispatch(setLoading(false))
            if (response?.data?.status === 'Successfull') {
                dispatch(setPdfFolders(response?.data?.folders))
            }
        } catch (error) {
            dispatch(setLoading(false))
        }
    };
};
export const getPdfFiles = data => {
    return async dispatch => {
        try {
            dispatch(setLoading(true))
            const response = await apiServices.getPdfFiles(data)
            dispatch(setLoading(false))
            if (response?.data?.message === 'success') {
                dispatch(setPdfFiles(response?.data?.files))
            }
        } catch (error) {
            dispatch(setLoading(false))
        }
    };
};