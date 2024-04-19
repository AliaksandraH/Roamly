import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        width: "100%",
        marginBottom: 15,
    },
    lable: {
        width: "100%",
        color: "#313866",
        fontSize: 18,
        textAlign: "center",
        marginBottom: 5,
    },
    review: {
        width: "100%",
        borderColor: "#b4c9db",
        borderStyle: "solid",
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        marginBottom: 5,
    },
    information: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 5,
    },
    authorName: {
        width: "100%",
        color: "#313866",
        fontSize: 16,
    },
});

export default styles;
