import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constant";
import { widthPercentageToDP } from "../MakeMeResponsive";
import { fonts } from "../../utils";

export const styles = StyleSheet.create({
    main_view: {
        height: SIZES.padding * 2.8,
        width: "100%",
    },
    image_view: {
        height: "100%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center"
    },
    btn_text: {
        fontFamily: fonts.novaBold,
        fontSize: SIZES.h17,
        color: COLORS.white
    }
})