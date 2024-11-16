import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constant";
import { fonts } from "../../utils";
import { widthPercentageToDP } from "../MakeMeResponsive";

export const styles = StyleSheet.create({
    main_view: {
        marginTop: SIZES.padding2,
        width: "90%",
        height: SIZES.padding * 4.5,
        alignSelf: "center"
    },
    row: {
        paddingHorizontal: SIZES.padding,
        paddingVertical: SIZES.padding2,
        flexDirection: "row",
        alignItems: "center",
        height: "100%"
    },
    image_view: {
        height: SIZES.padding * 3,
        width: SIZES.padding * 3
    },
    image: {
        height: "100%",
        width: "100%"
    },
    title: {
        flex: 1,
        textAlign: "left",
        marginLeft: SIZES.padding2,
        fontFamily: fonts.novaBold,
        fontSize: widthPercentageToDP(4),
        color: COLORS.white,
    }
})