import { Marker, Alert } from "react-native-maps";
import { useSelector, useDispatch } from "react-redux";
import { useHttp } from "@/hooks/http.hook";
import {
    updatePlacesToVisitPlacesVisited,
    setPlaceInformation,
    changeModal,
} from "@/actions";
import { databases } from "@/helpers/constants";

const Markers = ({ markers, img }) => {
    const { placesVisited, placesToVisit, user } = useSelector(
        (state) => state
    );
    const { request } = useHttp();
    const dispatch = useDispatch();

    const getOwnPlace = async (data, id) => {
        dispatch(setPlaceInformation(data.find((obj) => obj.id === id)));
        dispatch(changeModal("place"));
    };

    const onChangeLocation = async (place, newCoordinate) => {
        try {
            await request(
                `${databases.changeOwnMarker}/${user._id}`,
                "POST",
                JSON.stringify({
                    id: place.id,
                    location: newCoordinate,
                })
            );
            const newPlace = { ...place, location: newCoordinate };
            dispatch(updatePlacesToVisitPlacesVisited(newPlace));
        } catch (error) {
            Alert.alert("An error has occurred, please try again later");
        }
    };

    const myMarkers = (placeInformation) => {
        let markerProps = {
            coordinate: {
                latitude: placeInformation.location.latitude,
                longitude: placeInformation.location.longitude,
            },
            image: img,
            key: placeInformation.id,
            onPress: () =>
                getOwnPlace(
                    [...placesToVisit, ...placesVisited],
                    placeInformation.id
                ),
        };

        if (placeInformation.own) {
            markerProps = {
                ...markerProps,
                draggable: true,
                onDragEnd: (e) =>
                    onChangeLocation(
                        placeInformation,
                        e.nativeEvent.coordinate
                    ),
            };
        }

        return <Marker {...markerProps} />;
    };

    const renderMarkersList = (arr) => {
        if (arr.length === 0) {
            return null;
        }
        return arr.map((el) => {
            return myMarkers(el);
        });
    };

    return <>{renderMarkersList(markers)}</>;
};

export default Markers;
