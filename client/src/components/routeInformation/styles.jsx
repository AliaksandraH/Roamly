import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        width: "70%",
        height: 70,
        backgroundColor: "blue",
        zIndex: 1,
        position: "absolute",
        bottom: 100,
        left: 0,
        borderBottomRightRadius: 10,
        borderTopRightRadius: 10,
        padding: 10,
        backgroundColor: "#F9FFFF",
        shadowColor: "#313866",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
    },
    text: {
        fontSize: 20,
        color: "#313866",
    },
});

export default styles;
