import React from "react";
import { View, Text } from "react-native";
import Draglist from "@/components/draglist/draglist";
import main from "@/styles/main";
import styles from "@/pages/routeSettings/styles";

const PersonalRoute = ({ placeForRoute, setPlaceForRoute }) => {
    const { marginTop10, hr, block, list } = styles;
    const { width100, fontSize18, textHelper } = main;

    return (
        <View style={[list, width100, block]}>
            <View style={hr} />
            <Draglist data={placeForRoute} setData={setPlaceForRoute} />
            <View style={hr} />
            <Text style={[textHelper, fontSize18, marginTop10]}>
                Save Changes!
            </Text>
        </View>
    );
};

export default PersonalRoute;
