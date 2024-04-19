import React, { useCallback } from "react";
import { Text, TouchableOpacity, Alert, Linking } from "react-native";
import styles from "@/pages/place/styles";

const OpenLink = ({ url, text = "Website: ", way = true }) => {
    const handlePress = useCallback(async () => {
        const supported = await Linking.canOpenURL(url);
        if (supported) {
            await Linking.openURL(url);
        } else {
            Alert.alert(`Don't know how to open this URL: ${url}`);
        }
    }, [url]);

    return (
        <TouchableOpacity style={[styles.link]} onPress={handlePress}>
            {way ? (
                <>
                    <Text style={styles.fontSize16}>{text}</Text>
                    <Text style={[styles.textLink, styles.fontSize16]}>
                        {url}
                    </Text>
                </>
            ) : (
                <>
                    <Text style={[styles.textLink, styles.fontSize16]}>
                        {text}
                    </Text>
                </>
            )}
        </TouchableOpacity>
    );
};

export default OpenLink;
