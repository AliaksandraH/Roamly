import React, { useEffect, useMemo, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import RadioGroup from "react-native-radio-buttons-group";
import { useSelector } from "react-redux";
import Select from "@/components/select/select";
import main from "@/styles/main";
import styles from "@/pages/routeSettings/styles";

const OptimalRoute = ({
    setTypeOptimal,
    typeOptimal,
    start,
    setStart,
    finish,
    setFinish,
}) => {
    const { marginTop10, text, radio, hr, block, paddingLR15 } = styles;
    const { width100, fontSize18, textHelper } = main;
    const { placesToVisit } = useSelector((state) => state);
    const [places, setPlaces] = useState(null);

    const arrOptimal = useMemo(
        () => [
            {
                id: "1",
                label: "Time",
                value: "time",
                borderSize: 1,
                borderColor: "#313866",
                color: "#2B77E9",
                size: 21,
                labelStyle: { color: "#313866", fontSize: 16 },
            },
            {
                id: "2",
                label: "Distance",
                value: "distance",
                borderSize: 1,
                borderColor: "#313866",
                color: "#2B77E9",
                size: 21,
                labelStyle: { color: "#313866", fontSize: 16 },
            },
            {
                id: "3",
                label: "Rating of places",
                value: "rating",
                borderSize: 1,
                borderColor: "#313866",
                color: "#2B77E9",
                size: 21,
                labelStyle: { color: "#313866", fontSize: 16 },
            },
            {
                id: "4",
                label: "All",
                value: "all",
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
        let places = placesToVisit.map(({ name, id }) => ({
            label: name,
            value: id,
        }));
        setPlaces(places);
    }, [placesToVisit]);

    return (
        <ScrollView>
            <View style={[width100, block, paddingLR15]}>
                <View style={hr} />
                <View>
                    <Text style={[width100, text, fontSize18]}>
                        Optimization criterion:
                    </Text>
                    <RadioGroup
                        radioButtons={arrOptimal}
                        onPress={setTypeOptimal}
                        selectedId={typeOptimal}
                        containerStyle={radio}
                    />
                </View>
                <View style={hr} />
                <View style={[width100]}>
                    <Select
                        label="Start"
                        placeholder="Start..."
                        data={places}
                        selected={start}
                        changeSelected={setStart}
                    />
                    <Select
                        label="Finish"
                        placeholder="Finish..."
                        data={places}
                        selected={finish}
                        changeSelected={setFinish}
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

export default OptimalRoute;
