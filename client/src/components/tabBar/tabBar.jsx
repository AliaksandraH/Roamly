import React, { useState, useEffect } from "react";
import { View, Text, Image, Pressable } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import ToggleSwitch from "toggle-switch-react-native";
import {
    changeModal,
    cangeShowMarker,
    numRoutePlus,
    numRouteMinus,
    logOut,
} from "@/actions";
import OpenLink from "@/components/openLink/openLink";
import RouteInformation from "@/components/routeInformation/routeInformation";
import styles from "./styles";

const TabBar = () => {
    const {
        container,
        tabBar,
        img,
        routeImg,
        button,
        navigationButton,
        containerToggleSwitch,
        containerForTraveling,
        containerBuuttonsNextPrevious,
        containerText,
        text,
        link,
    } = styles;

    const { showMarker, route, numRoute } = useSelector((state) => state);
    const dispatch = useDispatch();

    const navigation = useNavigation();

    const [showDaysButton, setShowDaysButton] = useState(false);

    const navigationButtons = [
        {
            modal: "route",
            icon: require("./img/icons8-menu-100.png"),
            text: "Route",
        },
        {
            modal: "places",
            icon: require("./img/icons8-city-buildings-100.png"),
            text: "Places",
        },
        {
            modal: "visited",
            icon: require("./img/icons8-eye-64.png"),
            text: "Visited",
        },
        {
            modal: "toVisit",
            icon: require("./img/icons8-star-100.png"),
            text: "To visit",
        },
        {
            icon: require("./img/icons8-log-out-100.png"),
            text: "Log out",
        },
    ];

    const renderNavigationButton = (buttons) => {
        return buttons.map(({ modal, onPress, icon, text }) => {
            return (
                <Pressable
                    onPress={() =>
                        modal ? dispatch(changeModal(modal)) : onLogOut()
                    }
                    style={navigationButton}
                    key={text}
                >
                    <Image style={img} source={icon} />
                    <Text>{text}</Text>
                </Pressable>
            );
        });
    };

    useEffect(() => {
        setShowDaysButton(route.length > 1);
    }, [route]);

    const onLogOut = () => {
        dispatch(logOut());
        navigation.navigate("LogIn");
    };

    const onChangeNumRoutePlus = () => {
        if (route.length > 1 && route.length != numRoute + 1)
            dispatch(numRoutePlus());
    };

    const onChangeNumRouteMinus = () => {
        if (numRoute - 1 >= 0) dispatch(numRouteMinus());
    };

    return (
        <View style={container}>
            <RouteInformation />
            <View style={link}>
                <OpenLink
                    url="https://icons8.com/license"
                    text="Icons from the Icons8"
                    way={false}
                />
            </View>
            <View style={containerToggleSwitch}>
                <ToggleSwitch
                    isOn={showMarker}
                    onColor="#313866"
                    offColor="#B4C9DB"
                    size="large"
                    onToggle={() => dispatch(cangeShowMarker())}
                />
            </View>
            {showDaysButton && (
                <View style={containerForTraveling}>
                    <View style={containerBuuttonsNextPrevious}>
                        <Pressable onPress={onChangeNumRouteMinus}>
                            <Image
                                style={img}
                                source={require("./img/icons8-arrow-left-100.png")}
                            />
                        </Pressable>
                        <Pressable onPress={onChangeNumRoutePlus}>
                            <Image
                                style={img}
                                source={require("./img/icons8-right-100.png")}
                            />
                        </Pressable>
                    </View>

                    <View style={containerText}>
                        <Text style={text}>{numRoute + 1} day</Text>
                    </View>
                </View>
            )}
            <Pressable
                style={button}
                onPress={() => dispatch(changeModal("routeSettings"))}
            >
                <Image
                    style={routeImg}
                    source={require("./img/icons8-route-64.png")}
                />
            </Pressable>
            <View style={tabBar}>
                {renderNavigationButton(navigationButtons)}
            </View>
        </View>
    );
};

export default TabBar;
