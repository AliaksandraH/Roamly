import { SafeAreaView, Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { setCountriesCities, setCountries } from "@/actions";
import Places from "@/pages/places/places";
import PlacesToVisit from "@/pages/placesToVisit/placesToVisit";
import PlacesVisited from "@/pages/placesVisited/placesVisited";
import RouteSettings from "@/pages/routeSettings/routeSettings";
import Place from "@/pages/place/place";
import ModalRoute from "@/pages/modalRoute/modalRoute";
import Map from "@/components/map/map";
import Spinner from "@/components/spinner/spinner";
import TabBar from "@/components/tabBar/tabBar";
import Services from "@/services/services";

const Main = () => {
    const dispatch = useDispatch();
    const { getCountriesCities } = Services();
    const { modals, countriesCities, placeInformation } = useSelector(
        (state) => state
    );
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        getCountriesCities()
            .then((data) => dispatch(setCountriesCities(data)))
            .catch(() => {
                Alert.alert("An error has occurred, please try again later.");
            })
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        const countries = countriesCities.map((el) => {
            return {
                label: el.country,
                value: el.country,
            };
        });
        const uniqueSet = new Set(countries.map(JSON.stringify));
        const uniqueArray = Array.from(uniqueSet).map(JSON.parse);
        uniqueArray.splice(uniqueArray.length - 2, 2);
        dispatch(setCountries(uniqueArray));
    }, [countriesCities]);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Map />
            {placeInformation && <Place />}
            {modals === "default" && <TabBar />}
            <Places />
            <PlacesToVisit />
            <PlacesVisited />
            <RouteSettings />
            <ModalRoute />
            <Spinner loading={loading} />
        </SafeAreaView>
    );
};

export default Main;
