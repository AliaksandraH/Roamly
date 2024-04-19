const initialState = {
    modals: "default",
    user: {},
    countriesCities: [],
    countries: [],
    placesToVisit: [],
    placesVisited: [],
    placeInformation: null,
    showMarker: true,
    informationRoute: { distance: 0, time: 0, routeCount: 0 },
    route: [[]],
    numRoute: 0,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "COUNTRIES_CITIES":
            return {
                ...state,
                countriesCities: action.payload,
            };
        case "COUNTRIES":
            return {
                ...state,
                countries: action.payload,
            };

        case "PLACE_INFORMATION":
            return {
                ...state,
                placeInformation: action.payload,
            };

        case "PLACES_TO_VISIT":
            return {
                ...state,
                placesToVisit: action.payload,
            };
        case "ADD_PLACES_TO_VISIT":
            return {
                ...state,
                placesToVisit: [...state.placesToVisit, action.payload],
            };
        case "DELETE_PLACES_TO_VISIT":
            const newArrayPlacesToVisit = state.placesToVisit.filter(
                (obj) => obj.id !== action.payload.id
            );
            return {
                ...state,
                placesToVisit: newArrayPlacesToVisit,
            };

        case "PLACES_VISITED":
            return {
                ...state,
                placesVisited: action.payload,
            };
        case "ADD_PLACES_VISITED":
            return {
                ...state,
                placesVisited: [...state.placesVisited, action.payload],
            };
        case "DELETE_PLACES_VISITED":
            const newArrayPlacesVisited = state.placesVisited.filter(
                (obj) => obj.id !== action.payload.id
            );
            return {
                ...state,
                placesVisited: newArrayPlacesVisited,
            };
        case "UPDATE_PLACES_TO_VISIT_AND_PLACES_VISITED":
            const indexPlacesToVisit = state.placesToVisit.findIndex(
                (obj) => obj.id === action.payload.id
            );
            let newPlacesToVisit = [...state.placesToVisit];
            if (indexPlacesToVisit !== -1) {
                newPlacesToVisit[indexPlacesToVisit] = {
                    ...newPlacesToVisit[indexPlacesToVisit],
                    ...action.payload,
                };
            }
            const indexPlacesVisited = state.placesVisited.findIndex(
                (obj) => obj.id === action.payload.id
            );
            let newPlacesVisited = [...state.placesVisited];
            if (indexPlacesVisited !== -1) {
                newPlacesVisited[indexPlacesVisited] = {
                    ...newPlacesVisited[indexPlacesVisited],
                    ...action.payload,
                };
            }
            return {
                ...state,
                placesVisited: newPlacesVisited,
                placesToVisit: newPlacesToVisit,
                placeInformation: action.payload,
            };

        case "ROUTE":
            return {
                ...state,
                route: action.payload,
                numRoute: 0,
            };
        case "INFORMATION_ROUTE":
            return {
                ...state,
                informationRoute: action.payload,
            };

        case "USER":
            return {
                ...state,
                user: action.payload,
            };

        case "SHOW_MARKER":
            return {
                ...state,
                showMarker: !state.showMarker,
            };

        case "MANAGE_SHOW_MARKER":
            return {
                ...state,
                showMarker: action.payload,
            };

        case "NUM_ROUTE_PLUS":
            return {
                ...state,
                numRoute: state.numRoute + 1,
            };
        case "NUM_ROUTE_MINUS":
            return {
                ...state,
                numRoute: state.numRoute - 1,
            };
        case "NUM_ROUTE_ZERO":
            return {
                ...state,
                numRoute: 0,
            };

        case "CHANGE_MODAL":
            return {
                ...state,
                modals: action.payload,
            };

        case "LOG_OUT":
            return {
                ...state,
                modals: "default",
                user: {},
                countriesCities: [],
                countries: [],
                placesToVisit: [],
                placesVisited: [],
                placeInformation: null,
                showMarker: true,
                informationRoute: { distance: 0, time: 0, routeCount: 0 },
                route: [[]],
                numRoute: 0,
            };

        default:
            return state;
    }
};

export default reducer;
