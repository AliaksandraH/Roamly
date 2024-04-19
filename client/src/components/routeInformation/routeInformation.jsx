import { Text, View } from "react-native";
import { useSelector } from "react-redux";

import styles from "./styles";

const RouteInformation = () => {
    const { informationRoute } = useSelector((state) => state);
    const { container, text } = styles;

    return (
        <View style={container}>
            <Text style={text}>
                Distance: {Math.floor(informationRoute.distance)} km.
            </Text>
            <Text style={text}>
                Travel time: {Math.floor(informationRoute.time)} min.
            </Text>
        </View>
    );
};

export default RouteInformation;
