import { View, Text, Image } from "react-native";
import { REACT_APP_API_KEY } from "env";
import styles from "./styles";

const PlaceInit = ({ place }) => {
    const {
        placeContainer,
        namePlace,
        blockPlace,
        image,
        information,
        addressText,
    } = styles;

    return (
        <View style={placeContainer}>
            <Text style={namePlace}>{place.name}</Text>
            <View style={blockPlace}>
                {place.photo && place.photo[0].photo_reference ? (
                    <Image
                        style={image}
                        source={{
                            uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${place.photo[0].photo_reference}&key=${REACT_APP_API_KEY}`,
                        }}
                    />
                ) : (
                    <Image
                        style={image}
                        source={require("./img/image_not_found.png")}
                    />
                )}
                {place.address || place.location.latitude ? (
                    <View style={information}>
                        <Text
                            numberOfLines={2}
                            ellipsizeMode="tail"
                            style={addressText}
                        >
                            {place.address ? (
                                <Text
                                    numberOfLines={2}
                                    ellipsizeMode="tail"
                                    style={addressText}
                                >
                                    Address: {place.address}
                                </Text>
                            ) : (
                                <Text
                                    numberOfLines={2}
                                    ellipsizeMode="tail"
                                    style={addressText}
                                >
                                    Latitude: {place.location.latitude},
                                    Longitude: {place.location.longitude}
                                </Text>
                            )}
                        </Text>
                    </View>
                ) : null}
            </View>
        </View>
    );
};

export default PlaceInit;
