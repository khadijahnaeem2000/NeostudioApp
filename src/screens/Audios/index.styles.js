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
   
})