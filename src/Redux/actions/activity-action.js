import apiServices from "../../api_services/request-handler";
import { setUserPrograms } from "../slices/activity-slice";
import { setLoading } from "../slices/exam-slice";

export const getUserPrograms = data => {
    return async dispatch => {
        try {
            dispatch(setLoading
                (true))
            const response = await apiServices.getUserPrograms(data)
            dispatch(setLoading(false))
            if (response?.data?.status === 'Successfull') {
                dispatch(setUserPrograms(response?.data?.data))
            }
        } catch (error) {
            dispatch(setLoading(false))
        }
    };
};