import React, { useState } from "react";
import {
    View,
    Text,
    ImageBackground,
    TextInput,
    Pressable,
    Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { setUser, addPlacesToVisit, addPlacesVisited } from "@/actions";
import { useHttp } from "@/hooks/http.hook";
import Services from "@/services/services";
import Spinner from "@/components/spinner/spinner";
import signInUpStyles from "@/styles/signInUp";
import { databases } from "@/helpers/constants";
import main from "@/styles/main";

const LogIn = () => {
    const dispatch = useDispatch();
    const { request } = useHttp();
    const { getPlace } = Services();
    const navigation = useNavigation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const { wh100, width100, fontSize18, fontSize16, flexRow } = main;
    const {
        container,
        transparentBlock,
        registrationContainer,
        label,
        input,
        buttons,
        button,
        textButton,
        borderLeft,
        text,
    } = signInUpStyles;

    const getMarkers = (dataUser, dFunction) => {
        const promises = dataUser.map((i) => {
            return getPlace(i)
                .then((data) => {
                    return dispatch(dFunction(data));
                })
                .catch(() => {
                    Alert.alert(
                        "An error has occurred, please try again later."
                    );
                });
        });

        Promise.all(promises);
    };

    const getOwnMarkers = (data, id) => {
        const promises = data.map((marker) => {
            marker.id = marker._id;
            if (marker.type.length === 2) {
                return Promise.all([
                    dispatch(addPlacesToVisit(marker)),
                    dispatch(addPlacesVisited(marker)),
                ]);
            }
            const dispatchTypesAndActions = {
                markersToVisit: addPlacesToVisit,
                markersVisited: addPlacesVisited,
            };
            const dispatchFunction = dispatchTypesAndActions[marker.type[0]];
            return dispatchFunction
                ? dispatch(dispatchFunction(marker))
                : deleteOwnMarker(id, marker._id);
        });

        Promise.all(promises);
    };

    const deleteOwnMarker = async (userId, markerId) => {
        try {
            await request(
                `${databases.deleteOwnMarker}/${userId}`,
                "POST",
                JSON.stringify({
                    id: markerId,
                })
            );
        } catch (error) {
            console.log(error);
        }
    };

    const onLogIn = async () => {
        if (!areAllFieldsFilled()) {
            Alert.alert("You need to fill in all the fields.");
            return;
        }
        setLoading(true);

        try {
            const data = await request(
                databases.login,
                "POST",
                JSON.stringify({
                    email,
                    password,
                })
            );

            if (data.message === "OK") {
                dispatch(setUser(data.user));
                getMarkers(data.user.markersToVisit, addPlacesToVisit);
                getMarkers(data.user.markersVisited, addPlacesVisited);
                getOwnMarkers(data.user.ownMarker, data.user._id);
                navigation.navigate("Home");
            } else {
                Alert.alert(data.message);
            }
        } catch (error) {
            Alert.alert("An error has occurred, please try again later.");
        } finally {
            setLoading(false);
        }
    };

    const areAllFieldsFilled = () => {
        return (
            removingSpaces(email, setEmail) &&
            removingSpaces(password, setPassword)
        );
    };

    const removingSpaces = (str, setStr) => {
        setStr(str.trim());
        return str.trim();
    };

    return (
        <ImageBackground
            source={require("./img/licensed-image.jpg")}
            resizeMode="cover"
            style={[container, wh100]}
        >
            <Spinner loading={loading} />
            <View style={[transparentBlock, wh100]}></View>
            <View style={[registrationContainer]}>
                <Text style={[label, fontSize18]}>Log In</Text>
                <Text style={[width100, fontSize16, text]}>Email:</Text>
                <TextInput
                    style={input}
                    onChangeText={setEmail}
                    value={email}
                    placeholder="email"
                    keyboardType="email-address"
                    cursorColor="#b4c9db"
                    placeholderTextColor="#B4C9DB"
                />
                <Text style={[width100, fontSize16, text]}>Password:</Text>
                <TextInput
                    style={input}
                    onChangeText={setPassword}
                    value={password}
                    placeholder="password"
                    cursorColor="#b4c9db"
                    placeholderTextColor="#B4C9DB"
                    secureTextEntry
                />
                <View style={[flexRow, buttons, width100]}>
                    <Pressable
                        style={button}
                        onPress={() => navigation.navigate("Registration")}
                    >
                        <Text style={[textButton, fontSize16]}>
                            Registration
                        </Text>
                    </Pressable>
                    <Pressable
                        style={[button, borderLeft]}
                        onPress={() => onLogIn()}
                    >
                        <Text style={[textButton, fontSize16]}>Log in</Text>
                    </Pressable>
                </View>
            </View>
        </ImageBackground>
    );
};

export default LogIn;
