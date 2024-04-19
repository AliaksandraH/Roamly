import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    containerLabelButtons: {
        backgroundColor: "#313866",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        marginBottom: 10,
        borderRadius: 8,
        width: "100%",
        padding: 10,
    },
    label: {
        color: "white",
        fontSize: 20,
    },
    img: { width: 40, height: 40 },
    containerItemRoute: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        marginBottom: 5,
        width: "100%",
    },
    textBold: { fontSize: 18, color: "#313866", fontWeight: "bold" },
});

export default styles;
