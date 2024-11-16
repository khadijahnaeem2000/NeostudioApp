import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constant";

export const styles = StyleSheet.create({
    sub_view: {
        backgroundColor: COLORS.white,
        flex: 1,
        borderRadius: SIZES.padding * 2,
        paddingHorizontal: SIZES.padding2,
        marginVertical: SIZES.padding
    },
    btn_image: {
        width: "70%",
        marginBottom: SIZES.padding,
        height: 70,
        alignSelf: "center"
    }
})