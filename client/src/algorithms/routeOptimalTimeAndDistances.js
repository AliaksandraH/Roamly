import { findCityIndex, antColonyOptimization } from "./algorithms";

export function calculateOptimaRoute(placesToVisit, start, finish, arr) {
    const startCity = findCityIndex(start, placesToVisit);
    const endCity = findCityIndex(finish, placesToVisit);

    const path = antColonyOptimization(arr, startCity, endCity).path;

    if (!path) return false;

    const reorderedData = path.map((index) => placesToVisit[index]);
    return reorderedData;
}
