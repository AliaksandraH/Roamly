import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        zIndex: 999,
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
    },
    textInputContainer: {
        flexDirection: "row",
    },
    textInput: {
        fontSize: 16,
        borderColor: "#b4c9db",
        borderStyle: "solid",
        borderWidth: 1,
        borderRadius: 10,
    },
    listView: {
        borderRadius: 8,
    },
    separator: {
        backgroundColor: "#2B77E9",
    },
});

export default styles;
