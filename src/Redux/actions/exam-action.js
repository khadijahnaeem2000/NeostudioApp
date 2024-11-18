import apiServices from "../../api_services/request-handler";
import { setExams, setLoading } from "../slices/exam-slice";

export const getAllExams = data => {
    return async dispatch => {
        try {
            dispatch(setLoading(true))
            const response = await apiServices.getAllExams(data)
            dispatch(setLoading(false))
            if (response?.data?.status === 'Successfull') {
                dispatch(setExams(response?.data?.data))
            }
        } catch (error) {
            dispatch(setLoading(false))
        }
    };
};