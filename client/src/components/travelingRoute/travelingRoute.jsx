import React, { useEffect, useMemo, useState } from "react";
import {
    View,
    Text,
    Pressable,
    TextInput,
    Keyboard,
    ScrollView,
} from "react-native";
import RadioGroup from "react-native-radio-buttons-group";
import { useSelector } from "react-redux";
import Select from "@/components/select/select";
import main from "@/styles/main";
import styles from "@/pages/routeSettings/styles";

const TravelingRoute = ({
    setTypeRestPeriod,
    typeRestPeriod,
    setRestPeriod,
    restPeriod,
    start,
    setStart,
    requiredPlaces,
    setRequiredPlaces,
    useRating,
    setUseRating,
}) => {
    const { marginTop10, radio, textButton, hr, block, applyButton, input } =
        styles;
    const { width100, flexRow, flexCC, fontSize16, fontSize18, textHelper } =
        main;
    const { placesToVisit } = useSelector((state) => state);
    const [places, setPlaces] = useState(null);

    const arrRestPeriod = useMemo(
        () => [
            {
                id: "1",
                label: "Specify the number of hours to travel per day",
                value: "hours",
                borderSize: 1,
                borderColor: "#313866",
                color: "#2B77E9",
                size: 21,
                labelStyle: { color: "#313866", fontSize: 16 },
            },
            {
                id: "2",
                label: "Specify the number of days to rest",
                value: "days",
                borderSize: 1,
                borderColor: "#313866",
                color: "#2B77E9",
                size: 21,
                labelStyle: { color: "#313866", fontSize: 16 },
            },
        ],
        []
    );

    const arrUseRating = useMemo(
        () => [
            {
                id: "1",
                label: "Build a route using the rating",
                value: "1",
                borderSize: 1,
                borderColor: "#313866",
                color: "#2B77E9",
                size: 21,
                labelStyle: { color: "#313866", fontSize: 16 },
            },
            {
                id: "2",
                label: "Build a route without using a rating",
                value: "2",
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
        const places = placesToVisit.map(({ name, id }) => ({
            label: name,
            value: id,
        }));
        setPlaces(places);
    }, [placesToVisit]);

    return (
        <ScrollView>
            <View style={[width100, block]}>
                <View style={hr} />
                <RadioGroup
                    radioButtons={arrUseRating}
                    onPress={setUseRating}
                    selectedId={useRating}
                    containerStyle={radio}
                />
                <View style={hr} />
                <RadioGroup
                    radioButtons={arrRestPeriod}
                    onPress={setTypeRestPeriod}
                    selectedId={typeRestPeriod}
                    containerStyle={radio}
                />
                <View style={hr} />
                <View style={[flexRow]}>
                    <TextInput
                        style={input}
                        onChangeText={setRestPeriod}
                        value={restPeriod}
                        placeholder={`Enter the number of ${
                            typeRestPeriod == 1 ? "hours" : "days"
                        }`}
                        keyboardType="numeric"
                        cursorColor="#b4c9db"
                        placeholderTextColor="#B4C9DB"
                    />
                    <Pressable
                        onPress={() => {
                            Keyboard.dismiss();
                        }}
                        style={[applyButton, flexCC]}
                    >
                        <Text style={[textButton, fontSize16]}>Apply</Text>
                    </Pressable>
                </View>
                <View style={hr} />
                <View style={[width100, { paddingLeft: 15, paddingRight: 15 }]}>
                    <Select
                        label="Specify a place to stay overnight"
                        placeholder="Hotel..."
                        data={places}
                        selected={start}
                        changeSelected={setStart}
                    />
                </View>
                <View style={hr} />
                <View style={[width100, { paddingLeft: 15, paddingRight: 15 }]}>
                    <Select
                        label="Choose the required places to visit"
                        placeholder="Places..."
                        data={places}
                        selected={requiredPlaces}
                        changeSelected={setRequiredPlaces}
                        multiple={true}
                    />
                </View>
                <View style={hr} />
                <Text style={[textHelper, fontSize18, marginTop10]}>
                    Save Changes!
                </Text>
            </View>
        </ScrollView>
    );
};

export default TravelingRoute;
