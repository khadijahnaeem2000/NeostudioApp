import { StyleSheet } from "react-native";
import { heightPercentageToDP, widthPercentageToDP } from "../MakeMeResponsive";
import { COLORS, SIZES } from "../../constant";
import { fonts } from "../../utils";

export const styles = StyleSheet.create({
    main_view: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.9)"
    },
    logo_view: {
        height: "6%",
        width: "100%",
        alignSelf: "center",
    },
    logo: {
        height: "100%",
        width: "100%"
    },
    heading: {
        fontSize: widthPercentageToDP(9),
        fontFamily: fonts.novaBold,
        color: COLORS.white,
        textAlign: "center",
        marginTop: heightPercentageToDP(5)
    },
    exam_heading: {
        fontSize: widthPercentageToDP(9),
        fontFamily: fonts.novaBold,
        color: COLORS.white,
        textAlign: "center",
        marginTop: heightPercentageToDP(1)
    },
    top_row: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: SIZES.padding,
        marginTop: SIZES.padding2
    },
    sub_view: {
        flex: 1,
        marginTop: SIZES.padding
    },
    top_view: {
        height: heightPercentageToDP(15)
    }
})