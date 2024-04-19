import { Alert } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useDispatch } from "react-redux";
import { setPlaceInformation, changeModal } from "@/actions";
import { REACT_APP_API_KEY } from "env";
import styles from "./styles";

const PlacesAutocomplete = () => {
    const dispatch = useDispatch();
    const getInformation = (data, details) => {
        try {
            const {
                name,
                formatted_address,
                geometry,
                formatted_phone_number,
                photos,
                opening_hours,
                rating,
                reviews,
                website,
            } = details;
            dispatch(
                setPlaceInformation({
                    id: data.place_id,
                    name,
                    address: formatted_address,
                    location: {
                        latitude: geometry.location.lat,
                        longitude: geometry.location.lng,
                    },
                    phone: formatted_phone_number || null,
                    photo: photos || null,
                    opening_hours:
                        opening_hours && opening_hours.weekday_text
                            ? opening_hours.weekday_text
                            : null,
                    rating: rating || null,
                    reviews: reviews || null,
                    website: website || null,
                })
            );
            dispatch(changeModal("place"));
        } catch (error) {
            Alert.alert("An error has occurred, please try again later");
        }
    };

    return (
        <GooglePlacesAutocomplete
            placeholder="Search..."
            fetchDetails={true}
            onPress={(data, details = null) => {
                getInformation(data, details);
            }}
            query={{
                key: REACT_APP_API_KEY,
                language: "en",
            }}
            styles={styles}
        />
    );
};

export default PlacesAutocomplete;
