import {
    replaceNonNumbersWithZero,
    findCityIndex,
    antColonyOptimization,
} from "./algorithms";

export const routeOptimalAll = async (
    placesToVisit,
    start,
    finish,
    rating,
    distances,
    time
) => {
    rating = rating.map(function (element) {
        return element === null ? 0 : element;
    });
    rating = replaceNonNumbersWithZero(rating);

    const wR = 5;
    const wD = 1;
    const wT = 2;
    const W = wR + wD + wT;

    for (let i = 0; i < rating.length; i++) {
        rating[i] *= wR;
    }

    for (let i = 0; i < distances.length; i++) {
        for (let j = 0; j < distances[i].length; j++) {
            distances[i][j] *= wD;
            time[i][j] *= wT;
        }
    }

    let resultArray = [];
    for (let i = 0; i < distances.length; i++) {
        let row = [];
        for (let j = 0; j < distances[i].length; j++) {
            row.push((distances[i][j] + time[i][j] + rating[j]) / W);
        }
        resultArray.push(row);
    }

    const startCity = findCityIndex(start, placesToVisit);
    const endCity = findCityIndex(finish, placesToVisit);

    const path = antColonyOptimization(resultArray, startCity, endCity).path;

    if (!path) return false;
    const reorderedData = path.map((index) => placesToVisit[index]);
    return reorderedData;
};
