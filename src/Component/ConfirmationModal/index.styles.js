import { StyleSheet } from "react-native";
import { fonts } from "../../utils";
import { heightPercentageToDP, widthPercentageToDP } from "../MakeMeResponsive";
import { SIZES } from "../../constant";

export const styles = StyleSheet.create({
    modalMain: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.4)'
    },
    text1: {
        marginTop: widthPercentageToDP(7),
        color: '#252525',
        fontFamily: fonts.novaBold,
        //marginLeft: widthPercentageToDP(-4),
        fontSize: widthPercentageToDP(4),
        width: widthPercentageToDP(70),
        padding: widthPercentageToDP(2),
        textAlign: 'center',
    },
    quesBox: {
        width: widthPercentageToDP(95),
        alignItems: 'center',
        //justifyContent: "center"
    },
    confirmBtn: {
        width: widthPercentageToDP(25),
        height: heightPercentageToDP(5),
        marginTop: heightPercentageToDP(0),
        marginBottom: widthPercentageToDP(1.5),
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnImage: {
        width: widthPercentageToDP(43),
        height: heightPercentageToDP(20),
        //marginTop:heightPercentageToDP(2),
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomView: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '80%',
        justifyContent: 'space-around',
        marginTop: SIZES.padding * 2
    },
})