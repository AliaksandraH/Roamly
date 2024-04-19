import { findCityIndex, findRouteOptimaRating } from "./algorithms";

export const routeOptimaRating = async (placesToVisit, start, finish, arr) => {
    const startCity = findCityIndex(start, placesToVisit);
    const endCity = findCityIndex(finish, placesToVisit);

    const path = findRouteOptimaRating(arr, startCity, endCity).path;

    if (!path) return false;

    const reorderedData = path.map((index) => placesToVisit[index]);
    return reorderedData;
};
