import { StyleSheet } from "react-native";
import { isIOS } from "../../constant/theme";

export const styles = StyleSheet.create({
    main_view: {
        flex: 1,
        backgroundColor: isIOS ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.2)',
        justifyContent: "center",
        alignItems: 'center'
    },
})