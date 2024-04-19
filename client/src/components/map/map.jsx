import React, { useState, useEffect, useRef } from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";
import MapView from "react-native-maps";
import Markers from "@/components/markers/markers";
import Routes from "@/components/routes/Routes";
import LocalizationCurrentPlace from "@/components/localizationCurrentPlace/localizationCurrentPlace";
import styles from "./styles";

const Map = () => {
    const { placeInformation, placesToVisit, placesVisited, showMarker } =
        useSelector((state) => state);
    const [initialRegion, setInitialRegion] = useState({
        latitude: 0.1,
        longitude: 0.1,
        latitudeDelta: 100,
        longitudeDelta: 100,
    });
    const mapRef = useRef();
    const { container, mapStyle } = styles;

    useEffect(() => {
        if (placeInformation || placesToVisit[0]) {
            let position = {};
            const location = placeInformation
                ? placeInformation.location
                : placesToVisit[0].location;
            position = {
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: placeInformation ? 0.2 : 10,
                longitudeDelta: placeInformation ? 0.2 : 10,
            };
            setInitialRegion(position);
            mapRef.current.animateToRegion(position);
        }
    }, [placeInformation, placesToVisit]);

    return (
        <View style={container}>
            <MapView
                style={mapStyle}
                ref={mapRef}
                initialRegion={{
                    latitude: initialRegion.latitude,
                    longitude: initialRegion.longitude,
                    latitudeDelta: initialRegion.latitudeDelta,
                    longitudeDelta: initialRegion.longitudeDelta,
                }}
            >
                {placesToVisit && showMarker && (
                    <Markers
                        markers={placesToVisit}
                        img={require("./img/icons8-location-blue-100.png")}
                    />
                )}
                {placesVisited && !showMarker && (
                    <Markers
                        markers={placesVisited}
                        img={require("./img/icons8-location-yellow-100.png")}
                    />
                )}
                <Routes />
                {placeInformation && <LocalizationCurrentPlace />}
            </MapView>
        </View>
    );
};

export default Map;
