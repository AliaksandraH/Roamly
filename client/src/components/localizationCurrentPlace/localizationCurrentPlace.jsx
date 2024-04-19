import React, { useState, useEffect } from "react";
import { Marker } from "react-native-maps";
import { useSelector, useDispatch } from "react-redux";
import { changeModal, manageShowMarker } from "@/actions";

const LocalizationCurrentPlace = () => {
    const { placeInformation, placesToVisit, placesVisited, showMarker } =
        useSelector((state) => state);
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);

    useEffect(() => {
        const isPlaceToVisit = placesToVisit.some(
            (obj) => obj.id === placeInformation.id
        );
        const isPlaceVisited = placesVisited.some(
            (obj) => obj.id === placeInformation.id
        );

        if (placeInformation.own && (!isPlaceToVisit || !isPlaceToVisit)) {
            setShow(false);
            dispatch(manageShowMarker(true));
            return;
        }

        if (showMarker) {
            if (isPlaceToVisit) {
                dispatch(manageShowMarker(true));
            } else if (isPlaceVisited) {
                dispatch(manageShowMarker(false));
            }
        } else {
            if (isPlaceVisited) {
                dispatch(manageShowMarker(false));
            } else if (isPlaceToVisit) {
                dispatch(manageShowMarker(true));
            }
        }

        setShow(!(isPlaceToVisit || isPlaceVisited));
    }, [placeInformation]);

    return (
        <>
            {show && (
                <Marker
                    coordinate={{
                        latitude: placeInformation.location.latitude,
                        longitude: placeInformation.location.longitude,
                    }}
                    image={require("./img/icons8-location-100.png")}
                    onPress={() => dispatch(changeModal("place"))}
                />
            )}
        </>
    );
};

export default LocalizationCurrentPlace;
