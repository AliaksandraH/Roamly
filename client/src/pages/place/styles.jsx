import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    scroll: {
        minWidth: 320,
        width: 320,
        backgroundColor: "white",
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10,
        paddingBottom: 20,
        borderRadius: 10,
        zIndex: 1,
    },
    icons: {
        backgroundColor: "#2B77E9",
        paddingTop: 5,
        paddingBottom: 5,
        paddingRight: 8,
        paddingLeft: 8,
        borderRadius: 10,
        marginBottom: 10,
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
    },
    icon: {
        width: 25,
        height: 25,
    },
    containerIcon: {
        marginLeft: 5,
        paddingLeft: 5,
    },
    borderLeft: {
        borderLeftColor: "#B4C9DB",
        borderLeftWidth: 1,
        borderStyle: "solid",
    },
    image: {
        height: 180,
        borderRadius: 8,
        marginBottom: 5,
    },
    containerRating: {
        justifyContent: "center",
        marginBottom: 10,
    },
    textName: {
        color: "#313866",
        textAlign: "center",
        fontWeight: "bold",
        marginBottom: 5,
    },
    text: {
        marginBottom: 5,
    },
    link: {
        display: "flex",
        flexDirection: "row",
        marginBottom: 5,
    },
    textLink: {
        color: "#313866",
        textDecorationLine: "underline",
    },
    containerTime: {
        marginTop: 5,
        marginBottom: 10,
    },
    lableTime: {
        color: "#313866",
        textAlign: "center",
        marginBottom: 5,
        marginTop: 5,
    },
    time: {
        backgroundColor: "#2B77E9",
        padding: 10,
        borderRadius: 10,
    },
    textTime: {
        color: "white",
        marginBottom: 3,
    },
    containerCloseModal: {
        width: "100%",
        height: "100%",
    },
});

export default styles;
