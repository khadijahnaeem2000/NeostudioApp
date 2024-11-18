import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constant";
import { fonts } from "../../utils";
import { widthPercentageToDP } from "../../Component/MakeMeResponsive";

export const styles = StyleSheet.create({
    safe_area: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.9)"
    },
    image_view: {
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        height: "100%",
        width: "100%"
    },
    main_view: {
        flex: 1,
        paddingHorizontal:SIZES.padding2
    },
    top_icon_view: {
        height: SIZES.padding * 2.3,
        width: SIZES.padding * 2.3,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "flex-end",
    },
    bottom_view: {
        height: 60,
        borderRadius: SIZES.padding * 2,
        overflow: 'hidden',
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: SIZES.width /1.08,
        marginBottom: SIZES.padding * 2,
        alignSelf:"center"
    },
    input: {
        flex: 1,
        marginHorizontal: SIZES.padding,
        fontFamily: fonts.novaRegular,
        color: COLORS.white,
        fontSize: widthPercentageToDP(5)
    },
    bottom_icon_view: {
        height: SIZES.padding * 2,
        width: SIZES.padding * 2,
        justifyContent: "center",
        alignItems: "center",
        marginRight: SIZES.padding
    }
}) 