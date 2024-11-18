import { StyleSheet } from "react-native";
import { SIZES } from "../../constant";
import { fonts } from "../../utils";

export const styles = StyleSheet.create({
    top_row: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
    },
    user_image_view: {
        width: "27%",
        height: "80%",
        marginBottom: 12
    },
    user_image: {
        height: "100%",
        width: "100%"
    },
    details_row: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 10,
    },
    time_text: {
        fontSize: SIZES.h14,
        color: "red",
        fontFamily: fonts.novaBold,
        marginLeft: "30%",
        top:SIZES.padding2 /3,
        position:"absolute"
    }
})