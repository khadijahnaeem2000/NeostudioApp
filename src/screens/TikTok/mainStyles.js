import { StyleSheet } from 'react-native'
import { heightPercentageToDP, widthPercentageToDP } from '../../Component/MakeMeResponsive'
import { fonts } from '../../utils'
export const mainStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.7)"
    },
    innerMainView: {
        width: widthPercentageToDP(100),
        height: heightPercentageToDP(60),
        borderTopLeftRadius: widthPercentageToDP(4),
        borderTopRightRadius: widthPercentageToDP(4),
        position: "absolute",
        bottom: "0%",
        backgroundColor: "#ffffff",
    },
    topHeader: {
        width: widthPercentageToDP(100),
        height: heightPercentageToDP(7),
        borderBottomWidth: widthPercentageToDP(0.1),
        borderTopLeftRadius: widthPercentageToDP(4),
        borderTopRightRadius: widthPercentageToDP(4),
        borderBottomColor: "#000",
        justifyContent: "center",
        backgroundColor: "#fff"
    },
    bottomView: {
        width: widthPercentageToDP(100),
        height: heightPercentageToDP(7),
        borderTopWidth: widthPercentageToDP(0.1),
        borderTopColor: "#000",
        position: "absolute",
        bottom: "0%"
    },
    containerStyle: {
        width: widthPercentageToDP(100),
        height: heightPercentageToDP(7),
    },
    inputStyle: {
        paddingLeft: widthPercentageToDP(2),
        color: '#000',
        fontFamily: fonts.novaRegular,
        fontSize: widthPercentageToDP(4),
    },
    inputContainerStyle: {
        borderBottomWidth: 0
    },
    flatlistView: {
        width: widthPercentageToDP(100),
        height: heightPercentageToDP(45),
        marginTop: heightPercentageToDP(1),
    },
    directory_view: {
        alignSelf: "center",
        marginTop: 20,
        width: 60,
        height: 70,
        justifyContent: "center",
        alignItems: "center"
    },
    directory_image: {
        height: '100%',
        width: '100%',
        borderRadius: 20
    },
    directory_text: {
        color: "#fff",
        textAlign: "center",
        fontFamily: fonts.novaBold
    },
    modal_title: {
        textAlign: "left",
        color: "black",
        fontFamily: fonts.novaBold,
        fontSize: 20
    },
    list_directory_view: {
        marginTop: 12,
        flexDirection: "row",
        alignItems: "center",
    },
    list_directory_image: {
        height: 50,
        width: 50,
        borderRadius: 30
    },
    list_directory_text: {
        color: "#000",
        fontFamily: fonts.novaBold,
        marginLeft: 12,
        fontSize: widthPercentageToDP(4)

    },
})