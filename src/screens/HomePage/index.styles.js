import { StyleSheet } from "react-native";

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
    top_row: {
        flex: 0.24,
        flexDirection: "row",
        alignItems: "center",
    },
    user_image_view: {
        width: "27%",
        height: "80%",
        marginBottom:12
    },
    user_image: {
        height: "100%",
        width: "100%"
    },
    details_row: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        marginLeft:10,
    }
})