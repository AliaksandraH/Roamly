import React from "react";
import { View, Text, TouchableOpacity, Linking } from "react-native";
import styles from "@/pages/place/styles";

const PhoneNumber = ({ phoneNumber }) => {
    const handleCallPress = () => {
        const formattedPhoneNumber = phoneNumber.replace(/[^0-9]/g, "");
        Linking.openURL(`tel:${formattedPhoneNumber}`);
    };

    return (
        <View>
            <TouchableOpacity style={[styles.link]} onPress={handleCallPress}>
                <Text style={styles.fontSize16}>Phone number: </Text>
                <Text style={[styles.textLink, styles.fontSize16]}>
                    {phoneNumber}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default PhoneNumber;
