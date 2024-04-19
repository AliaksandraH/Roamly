import React from "react";
import { ActivityIndicator, View, Modal } from "react-native";
import styles from "./styles";

const Spinner = ({ loading }) => {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={loading}
            statusBarTranslucent={false}
        >
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#0166FE" />
            </View>
        </Modal>
    );
};

export default Spinner;
