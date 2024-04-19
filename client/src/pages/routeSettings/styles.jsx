import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    marginTop10: {
        marginTop: 10,
    },
    borderLeft: {
        borderLeftColor: "white",
        borderLeftWidth: 1,
        borderStyle: "solid",
    },
    container: {
        backgroundColor: "white",
    },
    paddingLR15: {
        paddingLeft: 15,
        paddingRight: 15,
    },
    lable: {
        color: "#313866",
        fontSize: 25,
        textAlign: "center",
        fontWeight: "bold",
    },
    text: {
        color: "#313866",
        fontSize: 16,
    },
    header: {
        padding: 10,
    },
    radio: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: 0,
        marginLeft: 30,
        marginTop: 5,
    },
    buttons: {
        position: "absolute",
        bottom: 40,
        right: 10,
        width: 150,
        height: 50,
        backgroundColor: "#313866",
        padding: 10,
        borderRadius: 8,
        shadowColor: "#313866",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 3,
    },
    button: {
        width: "50%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    textButton: {
        color: "white",
    },
    hr: {
        backgroundColor: "#B4C9DB",
        margin: 10,
        width: "70%",
        height: 2,
        borderRadius: 10,
        opacity: 0.6,
    },
    block: {
        display: "flex",
        alignItems: "center",
    },
    input: {
        width: "60%",
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderColor: "#b4c9db",
        borderStyle: "solid",
        borderWidth: 1,
        borderRadius: 8,
        color: "#313866",
    },
    applyButton: {
        width: "20%",
        height: 40,
        backgroundColor: "#2B77E9",
        padding: 10,
        borderRadius: 8,
        shadowColor: "#2B77E9",
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    list: {
        height: 300,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 10,
    },
});

export default styles;
