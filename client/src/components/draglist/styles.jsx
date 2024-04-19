import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    itemContainer: {
        height: 60,
        marginBottom: 10,
        justifyContent: "space-between",
        backgroundColor: "#2B77E9",
        borderRadius: 8,
        marginRight: 20,
    },
    image: {
        width: "20%",
        height: "100%",
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
    },
    information: {
        width: "80%",
        padding: 8,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        color: "white",
        fontSize: 13,
    },
});

export default styles;
