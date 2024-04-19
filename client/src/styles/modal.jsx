import { StyleSheet } from "react-native";

const modalStyles = StyleSheet.create({
    modal: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignContent: "center",
    },
    containerModal: {
        minWidth: 320,
        width: 320,
        height: "100%",
        backgroundColor: "white",
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10,
        paddingBottom: 20,
        borderRadius: 10,
        shadowColor: "#313866",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 3,
    },
    containerCloseModal: {
        width: "100%",
        height: "100%",
    },
    countryBlock: {
        width: "100%",
        height: "5%",
        marginBottom: 5,
    },
    countryImg: {
        width: 30,
        height: 30,
    },
    filterBlock: {
        width: "100%",
        height: 35,
        backgroundColor: "#2B77E9",
        borderRadius: 8,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 10,
    },
    filterImg: {
        width: 25,
        height: 25,
    },
    filterText: {
        marginLeft: 5,
        fontSize: 18,
        color: "white",
    },
    block: {
        width: "100%",
        height: "100%",
        marginTop: 50,
    },
    lable: {
        fontSize: 20,
        marginBottom: 10,
    },
    textHelper: {
        width: "100%",
        color: "#b4c9db",
        fontSize: 16,
        textAlign: "center",
        marginTop: 20,
    },
    scrollView: {
        marginBottom: 50,
    },
});

export default modalStyles;
