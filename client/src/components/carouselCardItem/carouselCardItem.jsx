import React from "react";
import { View, Image } from "react-native";
import { REACT_APP_API_KEY } from "env";
import styles from "./styles";

const CarouselCardItem = ({ item, index }) => {
    const { container, image } = styles;
    const { photo_reference } = item;
    const uri = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photo_reference}&key=${REACT_APP_API_KEY}`

    return (
        <View style={container} key={index}>
            <Image
                source={{uri}}
                style={image}
            />
        </View>
    );
};

export default CarouselCardItem;
