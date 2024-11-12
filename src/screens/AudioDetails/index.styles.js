import { StyleSheet } from "react-native";
import { heightPercentageToDP, widthPercentageToDP } from "../../Component/MakeMeResponsive";
import { fonts } from "../../utils";
import { COLORS, SIZES } from "../../constant";

export const styles = StyleSheet.create({
    heading: {
        fontSize: widthPercentageToDP(11),
        fontFamily: fonts.novaBold,
        color: COLORS.white,
        textAlign: "center",
        marginTop: heightPercentageToDP(10)
    },
    audio_view: {
        marginTop: SIZES.padding2,
        width: "100%",
        height: SIZES.padding * 7,
        padding: SIZES.padding2
    },
    image_row: {
        flexDirection: "row",
        alignItems: "center",
    },
    image_view: {
        width: SIZES.padding * 2.3,
        height: SIZES.padding * 2.5,
        justifyContent: "center",
        alignItems: "center",
    },
    play_image_view: {
        width: SIZES.padding * 2.4,
        height: SIZES.padding * 2.7,
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        width: "100%",
        height: "100%"
    },
    trackText: {
        flex: 1,
        textAlign: "left",
        color: "#707070",
        fontFamily: fonts.novaBold,
        fontSize: widthPercentageToDP(3),
        marginLeft: widthPercentageToDP(2),
        //textAlign:"right"
    },
})