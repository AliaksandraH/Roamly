import React, { useState, useEffect } from "react";
import {
    Modal,
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    Pressable,
    SafeAreaView,
    ActivityIndicator,
    TextInput,
    Alert,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import "react-native-get-random-values";
import { changeModal, setPlaceInformation, addPlacesToVisit } from "@/actions";
import PlaceInit from "@/components/placeInit/placeInit";
import Services from "@/services/services";
import FilterPlaces from "@/components/filterPlaces/filterPlaces";
import PlacesAutocomplete from "@/components/placesAutocomplete/placesAutocomplete";
import { useHttp } from "@/hooks/http.hook";
import Spinner from "@/components/spinner/spinner";
import { databases } from "@/helpers/constants";
import main from "@/styles/main";
import modalStyles from "@/styles/modal";
import styles from "./styles";

const Places = () => {
    const { modals, countriesCities, user } = useSelector((state) => state);
    const dispatch = useDispatch();
    const { getAllPlaces, getPlace } = Services();
    const { request } = useHttp();
    const [places, setPlaces] = useState(null);
    const [country, setCountry] = useState(null);
    const [city, setCity] = useState(null);
    const [cities, setCities] = useState([]);
    const [typePlace, setTypePlace] = useState(null);
    const [filter, setFilter] = useState(true);
    const [loading, setLoading] = useState(false);
    const [nameOwnMarker, setNameOwnMarker] = useState("Your own marker");
    const [loadingForSpinner, setLoadingForSpinner] = useState(false);

    const {
        modal,
        containerModal,
        lable,
        textHelper,
        containerCloseModal,
        countryImg,
        filterBlock,
        filterImg,
        filterText,
        block,
        scrollView,
    } = modalStyles;
    const { flexRow, width100 } = main;
    const { containerOwnMarker, textInput } = styles;

    useEffect(() => {
        setPlaces([]);
        if (!country || !city || !typePlace) return;
        getPlaces(country, city, typePlace);
    }, [country, city, typePlace]);

    useEffect(() => {
        setCity(null);
        let filterCities = countriesCities
            .filter((city) => city.country === country)
            .map((el) => {
                return {
                    label: el.city,
                    value: el.city,
                };
            });
        setCities(filterCities);
    }, [country]);

    const getPlaces = async (nameCountry, nameCity, typePlace) => {
        setLoading(true);
        try {
            const places = await getAllPlaces(nameCountry, nameCity, typePlace);
            setPlaces(places);
        } catch (error) {
            Alert.alert("An error has occurred, please try again later.");
        } finally {
            setLoading(false);
        }
    };

    const changeFilter = () => {
        setFilter((state) => !state);
    };

    const getModalPlace = async (id) => {
        try {
            const place = await getPlace(id);
            dispatch(setPlaceInformation(place));
            dispatch(changeModal("place"));
        } catch (error) {
            Alert.alert("An error has occurred, please try again later.");
        }
    };

    const ownMarker = async () => {
        if (!nameOwnMarker.trim()) {
            Alert.alert("Incorrect name of an own marker");
            return;
        }
        setLoadingForSpinner(true);
        try {
            const data = await request(
                `${databases.addOwnMarker}/${user._id}`,
                "POST",
                JSON.stringify({
                    name: nameOwnMarker.trim(),
                })
            );
            dispatch(addPlacesToVisit({ ...data.data, id: data.data._id }));
            dispatch(setPlaceInformation(data.data));
            dispatch(changeModal("default"));
        } catch (error) {
            Alert.alert("An error has occurred, please try again later");
        } finally {
            setLoadingForSpinner(false);
        }
    };

    const textChooseFilters = (
        <Text style={textHelper}>
            To search, select the country, city and type place
        </Text>
    );

    const textLengthPlaces = (
        <Text style={textHelper}>Couldn't find places</Text>
    );

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modals === "places"}
            onRequestClose={() => {
                dispatch(changeModal("default"));
            }}
            statusBarTranslucent={false}
        >
            <Spinner loading={loadingForSpinner} />
            <SafeAreaView style={[{ flex: 1 }, modal]}>
                <View style={containerModal}>
                    <View style={[flexRow, width100, containerOwnMarker]}>
                        <TextInput
                            style={textInput}
                            onChangeText={setNameOwnMarker}
                            value={nameOwnMarker}
                            placeholder="Name of an own marker..."
                            cursorColor="#b4c9db"
                            placeholderTextColor="#B4C9DB"
                        />
                        <Pressable
                            onPress={() => ownMarker()}
                            style={{ width: "10%" }}
                        >
                            <Image
                                style={countryImg}
                                source={require("./img/icons8-marker-50.png")}
                            />
                        </Pressable>
                    </View>
                    <View style={{ height: "95%" }}>
                        <PlacesAutocomplete />
                        <View style={block}>
                            <TouchableOpacity
                                style={filterBlock}
                                onPress={changeFilter}
                            >
                                <Image
                                    style={filterImg}
                                    source={require("./img/icons8-filter-50.png")}
                                />
                                <Text style={filterText}>Filters</Text>
                            </TouchableOpacity>
                            {filter && (
                                <FilterPlaces
                                    country={country}
                                    changeCountry={setCountry}
                                    city={city}
                                    changeCity={setCity}
                                    typePlace={typePlace}
                                    changeTypePlace={setTypePlace}
                                    cities={cities}
                                />
                            )}
                            {country && city && typePlace ? (
                                <ScrollView style={scrollView}>
                                    <Text style={lable}>Found places:</Text>
                                    {loading && (
                                        <ActivityIndicator
                                            size="large"
                                            color="#0166FE"
                                        />
                                    )}
                                    {places &&
                                        places.length < 1 &&
                                        !loading &&
                                        textLengthPlaces}
                                    {places.map((place) => (
                                        <Pressable
                                            key={place.id}
                                            onPress={() => {
                                                getModalPlace(place.id);
                                            }}
                                        >
                                            <PlaceInit place={place} />
                                        </Pressable>
                                    ))}
                                </ScrollView>
                            ) : (
                                textChooseFilters
                            )}
                        </View>
                    </View>
                </View>
                <Pressable
                    style={containerCloseModal}
                    onPress={() => dispatch(changeModal("default"))}
                />
            </SafeAreaView>
        </Modal>
    );
};

export default Places;
