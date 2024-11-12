import apiServices from "../../api_services/request-handler";
import { setLoading, setRepasoFolders } from "../slices/repaso-slice";

export const getRepasoFolders = data => {
    return async dispatch => {
        try {
            dispatch(setLoading(true))
            const response = await apiServices.getRepasoFolders(data)
            console.log("srespoaonsdas", response?.data)
            dispatch(setLoading(false))
            if (response?.data?.status === 'Successfull') {
                dispatch(setRepasoFolders(response?.data?.data))
            }
        } catch (error) {
            dispatch(setLoading(false))
        }
    };
};