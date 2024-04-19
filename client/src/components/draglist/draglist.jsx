import React from "react";
import { Text, TouchableOpacity, View, Image } from "react-native";
import DragList from "react-native-draglist";
import { REACT_APP_API_KEY } from "env";
import main from "@/styles/main";
import styles from "./styles";

const Draglist = ({ data, setData }) => {
    const { flexRow, fontSize16 } = main;
    const { itemContainer, image, information, text } = styles;

    function keyExtractor(str) {
        return str.id;
    }

    function renderItem(info) {
        const { item, onDragStart, onDragEnd } = info;
        const photo = item.photo
            ? {
                  uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${item.photo[0].photo_reference}&key=${REACT_APP_API_KEY}`,
              }
            : require("./img/image_not_found.png");

        return (
            <TouchableOpacity
                key={item.id}
                onPressIn={onDragStart}
                onPressOut={onDragEnd}
                style={[itemContainer, flexRow]}
            >
                <Image style={image} source={photo} />
                <View style={information}>
                    <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={[text, fontSize16]}
                    >
                        {item.name}
                    </Text>
                    <Text numberOfLines={1} ellipsizeMode="tail" style={text}>
                        {item.address ||
                            `${item.location.latitude} ${item.location.longitude}`}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }

    async function onReordered(fromIndex, toIndex) {
        const copy = [...data];
        const removed = copy.splice(fromIndex, 1);
        copy.splice(toIndex, 0, removed[0]);
        setData(copy);
    }

    return (
        <DragList
            data={data}
            keyExtractor={keyExtractor}
            onReordered={onReordered}
            renderItem={renderItem}
        />
    );
};

export default Draglist;
