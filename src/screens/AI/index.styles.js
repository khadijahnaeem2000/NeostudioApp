import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constant";
import { fonts } from "../../utils";
import { widthPercentageToDP } from "../../Component/MakeMeResponsive";

export const styles = StyleSheet.create({
    safe_area: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.9)"
    },
    main_view: {
        flex: 1
    },
    top_icon_view: {
        height: SIZES.padding * 2.3,
        width: SIZES.padding * 2.3,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "flex-end",
        marginRight: SIZES.padding,
    },
    bottom_view: {
        height: 60,
        marginHorizontal: SIZES.padding,
        borderRadius: SIZES.padding * 2,
        marginBottom: SIZES.padding,
        overflow: 'hidden',
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
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