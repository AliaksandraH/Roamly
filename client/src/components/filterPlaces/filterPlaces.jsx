import React from "react";
import { View, Text } from "react-native";
import { useSelector } from "react-redux";
import { typePlaces } from "@/helpers/constants";
import Select from "@/components/select/select";
import styles from "./styles";

const FilterPlaces = ({
    country,
    changeCountry,
    city,
    changeCity,
    typePlace,
    changeTypePlace,
    cities,
}) => {
    const { filter, filterLabel } = styles;
    const { countries } = useSelector((state) => state);

    return (
        <View style={filter}>
            <Text style={filterLabel}>Filter places:</Text>
            <Select
                label="Type of place"
                placeholder="Choose the type of place..."
                data={typePlaces}
                selected={typePlace}
                changeSelected={changeTypePlace}
            />
            {countries.length > 0 && (
                <Select
                    label="Country"
                    placeholder="Choose a country..."
                    data={countries}
                    selected={country}
                    changeSelected={changeCountry}
                />
            )}
            {country && (
                <Select
                    label="City"
                    placeholder="Choose a city..."
                    data={cities}
                    selected={city}
                    changeSelected={changeCity}
                />
            )}
        </View>
    );
};

export default FilterPlaces;
