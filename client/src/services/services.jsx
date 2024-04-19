import { REACT_APP_API_KEY } from "env";
import { useHttp } from "../hooks/http.hook";

const Services = () => {
    const _key = REACT_APP_API_KEY;
    const { request } = useHttp();

    const getAllPlaces = async (nameCountry, nameCity, typePlace) => {
        const newNameCountry = nameCountry
            .split("(")[0]
            .trim()
            .replace(/ /g, "%20");
        const newNameCity = nameCity.split("(")[0].trim().replace(/ /g, "%20");
        const newTypePlace = typePlace.replace(/ /g, "%20");

        const url = await request(
            `https://maps.googleapis.com/maps/api/place/textsearch/json?key=${_key}&language=en&query=${newTypePlace}%20in%20${newNameCountry}%20in%20${newNameCity}`
        );
        if (!url.results || !Array.isArray(url.results)) return null;

        return await url.results
            .map(_transformInformationPlaces)
            .filter((place) =>
                _checkingCorrectPlace(place, nameCountry, nameCity)
            );
    };

    const _transformInformationPlaces = (place) => {
        return {
            id: place.place_id,
            name: place.name,
            address: place.formatted_address,
            location: {
                latitude: place.geometry.location.lat,
                longitude: place.geometry.location.lng,
            },
            photo: place.photos && place.photos[0] ? place.photos : null,
        };
    };

    const _checkingCorrectPlace = (place, nameCountry, nameCity) => {
        const newNameCountry = nameCountry.split(" ")[0].trim();
        const newNameCity = nameCity.split(" ")[0].trim();
        if (
            place.address
                .toLowerCase()
                .includes(newNameCountry.toLowerCase()) ||
            place.address.toLowerCase().includes(newNameCity.toLowerCase())
        ) {
            return place;
        }
    };

    const getPlace = async (id) => {
        const url = await request(
            `https://maps.googleapis.com/maps/api/place/details/json?place_id=${id}&language=en&fields=name%2Cgeometry%2Cphotos%2Crating%2Cformatted_phone_number%2Cname%2Cformatted_address%2Copening_hours%2Cwebsite%2Creviews&key=${_key}`
        );
        return {
            id: id,
            name: url.result.name,
            address: url.result.formatted_address,
            location: {
                latitude: url.result.geometry.location.lat,
                longitude: url.result.geometry.location.lng,
            },
            phone: url.result.formatted_phone_number
                ? url.result.formatted_phone_number
                : null,
            photo: url.result.photos ? url.result.photos : null,
            opening_hours:
                url.result.opening_hours &&
                url.result.opening_hours.weekday_text
                    ? url.result.opening_hours.weekday_text
                    : null,
            rating: url.result.rating ? url.result.rating : 0.1,
            reviews: url.result.reviews ? url.result.reviews : null,
            website: url.result.website ? url.result.website : null,
        };
    };

    const getCountriesCities = async () => {
        const url = await request(
            "https://countriesnow.space/api/v0.1/countries/population/cities"
        );
        return url.data.map(({ city, country }) => ({ city, country }));
    };

    return {
        getAllPlaces,
        getPlace,
        getCountriesCities,
    };
};

export default Services;
