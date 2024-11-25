import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserPrograms } from "../../Redux/actions/activity-action";
import { saveActivityId } from "../../Redux/action";
import { navigate } from "../../navigation/navigation_service";

export default () => {
    const dispatch = useDispatch();
    const { login } = useSelector(state => state.user);
    const { user_programs, loading } = useSelector(state => state.activity);

    const [pageSelected, setPageSelected] = useState(0);
    const [counter, setCounter] = useState(0);

    const getUserProgramsData = () => {
        const apiData = {
            studentType: login?.data?.type,
        }
        dispatch(getUserPrograms(apiData))
    }

    useEffect(() => {
        getUserProgramsData()
    }, [])


    useEffect(() => {
        if (user_programs) {
            setCounter(user_programs?.length - 1);
        }
    }, [user_programs]);

    const buttonControl = type => {
        const count = user_programs?.length - 1;
        if (type === 'left') {
            if (count == 0) {
                return;
            } else {
                setPageSelected(pageSelected - 1);
            }
        } else {
            if (count <= pageSelected) {
                return;
            } else {
                setPageSelected(pageSelected + 1);
            }
        }
    };

    const onPressButton = () => {
        dispatch(
            saveActivityId(
                user_programs?.[pageSelected]?.id,
                user_programs?.[pageSelected]?.name,
            ),
        );
        navigate('Activity', {
            activityName: user_programs?.[pageSelected].name,
        });
    }



    return {
        user_programs,
        loading,
        pageSelected,
        counter,
        buttonControl,
        onPressButton
    }


}