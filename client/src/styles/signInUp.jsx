import { StyleSheet } from "react-native";

const signInUpStyles = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    transparentBlock: {
        position: "absolute",
        top: 0,
        left: 0,
        backgroundColor: "rgba(0, 0, 0, 0.7)",
    },
    registrationContainer: {
        backgroundColor: "white",
        width: "80%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 20,
        borderRadius: 10,
    },
    label: {
        color: "#2B77E9",
        fontWeight: "bold",
        margin: 5,
    },
    input: {
        width: "100%",
        height: 40,
        marginTop: 3,
        marginBottom: 13,
        borderWidth: 1,
        padding: 10,
        borderColor: "#b4c9db",
        borderStyle: "solid",
        borderWidth: 1,
        borderRadius: 8,
        color: "#313866",
    },
    buttons: {
        width: 150,
        height: 50,
        backgroundColor: "#2B77E9",
        padding: 10,
        borderRadius: 8,
        shadowColor: "#313866",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        margin: 5,
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
    borderLeft: {
        borderLeftColor: "white",
        borderLeftWidth: 1,
        borderStyle: "solid",
    },
    text: {
        color: "#313866",
    },
});

export default signInUpStyles;
