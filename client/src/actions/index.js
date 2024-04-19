export const setCountriesCities = (countriesCities) => {
    return {
        type: "COUNTRIES_CITIES",
        payload: countriesCities,
    };
};

export const setCountries = (countries) => {
    return {
        type: "COUNTRIES",
        payload: countries,
    };
};

export const setPlaceInformation = (place) => {
    return {
        type: "PLACE_INFORMATION",
        payload: place,
    };
};

export const setPlacesToVisit = (places) => {
    return {
        type: "PLACES_TO_VISIT",
        payload: places,
    };
};

export const addPlacesToVisit = (places) => {
    return {
        type: "ADD_PLACES_TO_VISIT",
        payload: places,
    };
};

export const deletePlacesToVisit = (places) => {
    return {
        type: "DELETE_PLACES_TO_VISIT",
        payload: places,
    };
};

export const setPlacesVisited = (places) => {
    return {
        type: "PLACES_VISITED",
        payload: places,
    };
};

export const addPlacesVisited = (places) => {
    return {
        type: "ADD_PLACES_VISITED",
        payload: places,
    };
};

export const deletePlacesVisited = (places) => {
    return {
        type: "DELETE_PLACES_VISITED",
        payload: places,
    };
};

export const updatePlacesToVisitPlacesVisited = (places) => {
    return {
        type: "UPDATE_PLACES_TO_VISIT_AND_PLACES_VISITED",
        payload: places,
    };
};

export const setRoute = (information) => {
    return {
        type: "ROUTE",
        payload: information,
    };
};

export const setInformationRoute = (information) => {
    return {
        type: "INFORMATION_ROUTE",
        payload: information,
    };
};

export const setUser = (user) => {
    return {
        type: "USER",
        payload: user,
    };
};

export const cangeShowMarker = () => {
    return {
        type: "SHOW_MARKER",
    };
};

export const manageShowMarker = (type) => {
    return {
        type: "MANAGE_SHOW_MARKER",
        payload: type,
    };
};

export const numRoutePlus = () => {
    return {
        type: "NUM_ROUTE_PLUS",
    };
};

export const numRouteMinus = () => {
    return {
        type: "NUM_ROUTE_MINUS",
    };
};

export const numRouteZero = () => {
    return {
        type: "NUM_ROUTE_ZERO",
    };
};

export const changeModal = (modal) => {
    return {
        type: "CHANGE_MODAL",
        payload: modal,
    };
};

export const logOut = () => {
    return {
        type: "LOG_OUT",
    };
};
