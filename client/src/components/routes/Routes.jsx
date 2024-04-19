import { useState, useEffect } from "react";
import { Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import MapViewDirections from "react-native-maps-directions";
import { setInformationRoute } from "@/actions";
import { REACT_APP_API_KEY } from "env";

const Route = () => {
    const dispatch = useDispatch();
    const { route, numRoute } = useSelector((state) => state);
    const [placeRoute, setPlaceRoute] = useState([]);
    const [info, setInfo] = useState({
        distance: 0,
        time: 0,
        routeCount: 0,
    });

    useEffect(() => {
        dispatch(setInformationRoute(info));
    }, [info]);

    useEffect(() => {
        if (route[numRoute].length === 0) return;
        const newArray = route[numRoute].map((item) => ({
            latitude: item.location.latitude,
            longitude: item.location.longitude,
        }));
        setPlaceRoute(newArray);
    }, [route, numRoute]);

    return (
        <MapViewDirections
            origin={placeRoute[0]}
            destination={placeRoute[placeRoute.length - 1]}
            waypoints={
                placeRoute.length > 2 ? placeRoute.slice(1, -1) : undefined
            }
            apikey={REACT_APP_API_KEY}
            strokeWidth={2}
            strokeColor="#4669e8"
            precision="low" // 'low' | 'high'
            splitWaypoints={true}
            onReady={(result) => {
                setInfo({
                    distance: result.distance,
                    time: result.duration,
                    routeCount: placeRoute.length,
                });
            }}
            onError={() => {
                Alert.alert(
                    "The route was not built. Check that your markers are positioned correctly."
                );
            }}
        />
    );
};

export default Route;
