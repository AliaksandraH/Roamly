import React, { useMemo, useState, useEffect } from "react";
import {
    View,
    Text,
    Pressable,
    SafeAreaView,
    Modal,
    Alert,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import RadioGroup from "react-native-radio-buttons-group";
import {
    changeModal,
    setRoute,
    numRouteZero,
    setPlaceInformation,
} from "@/actions";
import { arrayOfTime, arrayOfDistances } from "@/algorithms/algorithms";
import { routeOptimalAll } from "@/algorithms/routeOptimalAll";
import { routeOptimaRating } from "@/algorithms/routeOptimaRating";
import { calculateOptimaRoute } from "@/algorithms/routeOptimalTimeAndDistances";
import { routeForTraveling } from "@/algorithms/routeForTraveling";
import TravelingRoute from "@/components/travelingRoute/travelingRoute";
import OptimalRoute from "@/components/optimalRoute/optimalRoute";
import PersonalRoute from "@/components/personalRoute/personalRoute";
import Spinner from "@/components/spinner/spinner";
import main from "@/styles/main";
import styles from "./styles";

const RouteSettings = () => {
    const {
        marginTop10,
        borderLeft,
        container,
        lable,
        text,
        radio,
        buttons,
        button,
        textButton,
        hr,
        header,
    } = styles;
    const {
        width100,
        wh100,
        flexRow,
        flexCC,
        fontSize16,
        fontSize18,
        textHelper,
    } = main;

    const { modals, placesToVisit } = useSelector((state) => state);
    const [placeForRoute, setPlaceForRoute] = useState(placesToVisit);
    const dispatch = useDispatch();

    const [typeRoute, setTypeRoute] = useState(null);
    const [typeOptimal, setTypeOptimal] = useState("1");

    const [typeRestPeriod, setTypeRestPeriod] = useState("1");
    const [restPeriod, setRestPeriod] = useState("");
    const [useRating, setUseRating] = useState("1");

    const [start, setStart] = useState(null);
    const [finish, setFinish] = useState(null);

    const [requiredPlaces, setRequiredPlaces] = useState([]);

    const [loading, setLoading] = useState(false);

    const arrRoutes = useMemo(
        () => [
            {
                id: "1",
                label: "For traveling",
                value: "traveling",
                borderSize: 1,
                borderColor: "#313866",
                color: "#2B77E9",
                size: 21,
                labelStyle: { color: "#313866", fontSize: 16 },
            },
            {
                id: "2",
                label: "Optimal route",
                value: "optimal",
                borderSize: 1,
                borderColor: "#313866",
                color: "#2B77E9",
                size: 21,
                labelStyle: { color: "#313866", fontSize: 16 },
            },
            {
                id: "3",
                label: "Personal route",
                value: "personal",
                borderSize: 1,
                borderColor: "#313866",
                color: "#2B77E9",
                size: 21,
                labelStyle: { color: "#313866", fontSize: 16 },
            },
        ],
        []
    );

    useEffect(() => {
        setStart(null), setFinish(null);
        setRequiredPlaces([]);
        dispatch(numRouteZero());
        setRestPeriod("");
        setPlaceForRoute(placesToVisit);
    }, [placesToVisit, typeRoute]);

    const buildRoute = (route) => {
        setLoading(false);
        dispatch(setRoute([route]));
        dispatch(setPlaceInformation(route[0]));
        dispatch(changeModal("default"));
    };

    const onSave = async () => {
        if (placesToVisit.length <= 1) return;
        setLoading(true);
        let reorderedData = [];
        setTimeout(async () => {
            if (typeRoute === "1") {
                reorderedData = routeForTraveling(
                    placesToVisit,
                    start,
                    typeRestPeriod,
                    restPeriod,
                    requiredPlaces,
                    useRating
                );
                if (Array.isArray(reorderedData)) {
                    if (typeRestPeriod === "2") {
                        Alert.alert(
                            `You have ${restPeriod} days to travel, subtracting 13 hours each day for physiological needs. This leaves you with 11 hours a day for the journey to the destination and visiting the place. The time to visit one place is 2 hours. If the places that you have designated as mandatory have not been visited, then this is not possible when calculating the time.`
                        );
                    }
                    setLoading(false);
                    dispatch(setRoute(reorderedData));
                    dispatch(setPlaceInformation(reorderedData[0][0]));
                    dispatch(changeModal("default"));
                } else if (typeof reorderedData === "string") {
                    setLoading(false);
                    Alert.alert(reorderedData);
                } else {
                    setLoading(false);
                    Alert.alert("The route was not built, try later");
                }
            } else if (typeRoute === "2") {
                switch (typeOptimal) {
                    case "1":
                    case "2":
                        reorderedData = await calculateOptimaRoute(
                            placesToVisit,
                            start,
                            finish,
                            typeOptimal === "1"
                                ? arrayOfTime(placesToVisit)
                                : arrayOfDistances(placesToVisit)
                        );
                        if (reorderedData) {
                            buildRoute(reorderedData);
                        } else {
                            setLoading(false);
                            Alert.alert("The route was not built, try later");
                        }
                        break;
                    case "3":
                        reorderedData = await routeOptimaRating(
                            placesToVisit,
                            start,
                            finish,
                            placesToVisit.map((obj) => obj.rating)
                        );
                        if (reorderedData) {
                            Alert.alert(
                                "Places that do not have a rating will be deleted."
                            );
                            buildRoute(reorderedData);
                        } else {
                            setLoading(false);
                            Alert.alert("The route was not built, try later");
                        }
                        break;
                    case "4":
                        reorderedData = await routeOptimalAll(
                            placesToVisit,
                            start,
                            finish,
                            placesToVisit.map((obj) => obj.rating),
                            arrayOfDistances(placesToVisit),
                            arrayOfTime(placesToVisit)
                        );
                        if (reorderedData) {
                            buildRoute(reorderedData);
                        } else {
                            setLoading(false);
                            Alert.alert("The route was not built, try later");
                        }
                        break;
                    default:
                        break;
                }
            } else if (typeRoute === "3") {
                buildRoute(placeForRoute);
            } else {
                setLoading(false);
            }
        }, 100);
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modals === "routeSettings"}
            onRequestClose={() => {
                dispatch(changeModal("default"));
            }}
            statusBarTranslucent={false}
        >
            <Spinner loading={loading} />
            <SafeAreaView style={[{ flex: 1 }, wh100, container]}>
                <View style={[width100, flexCC, header]}>
                    <Text style={[width100, lable]}>Route Settings</Text>
                    <Text style={[textHelper, fontSize18, marginTop10]}>
                        Select the appropriate settings for the correct route
                        construction.
                    </Text>
                    <Text style={[textHelper, fontSize18, marginTop10]}>
                        The route will be built relative to the selected places
                        to visit.
                    </Text>
                    {placeForRoute.length <= 1 ? (
                        <>
                            <View style={hr} />
                            <Text style={[textHelper, fontSize18, marginTop10]}>
                                You don't have saved places
                            </Text>
                        </>
                    ) : (
                        <>
                            <Text style={[width100, text, fontSize18]}>
                                Route type:
                            </Text>
                            <RadioGroup
                                radioButtons={arrRoutes}
                                onPress={setTypeRoute}
                                selectedId={typeRoute}
                                containerStyle={radio}
                            />
                        </>
                    )}
                </View>
                {typeRoute === "1" && (
                    <TravelingRoute
                        setTypeRestPeriod={setTypeRestPeriod}
                        typeRestPeriod={typeRestPeriod}
                        setRestPeriod={setRestPeriod}
                        restPeriod={restPeriod}
                        start={start}
                        setStart={setStart}
                        finish={finish}
                        setFinish={setFinish}
                        requiredPlaces={requiredPlaces}
                        setRequiredPlaces={setRequiredPlaces}
                        useRating={useRating}
                        setUseRating={setUseRating}
                    />
                )}
                {typeRoute === "2" && (
                    <OptimalRoute
                        setTypeOptimal={setTypeOptimal}
                        typeOptimal={typeOptimal}
                        start={start}
                        setStart={setStart}
                        finish={finish}
                        setFinish={setFinish}
                    />
                )}
                {typeRoute === "3" && (
                    <PersonalRoute
                        placeForRoute={placeForRoute}
                        setPlaceForRoute={setPlaceForRoute}
                    />
                )}
            </SafeAreaView>
            <View style={[flexRow, buttons]}>
                <Pressable
                    style={button}
                    onPress={() => dispatch(changeModal("default"))}
                >
                    <Text style={[textButton, fontSize16]}>Cancel</Text>
                </Pressable>
                <Pressable
                    style={[button, borderLeft]}
                    onPress={() => onSave()}
                >
                    <Text style={[textButton, fontSize16]}>Save</Text>
                </Pressable>
            </View>
        </Modal>
    );
};

export default RouteSettings;
