import {
    isValidNonZeroInteger,
    findCityIndex,
    antColonyOptimization,
    arrayOfDistances,
} from "./algorithms";

function removeObjectWithFarFromTheStart(array, start, idsToKeep) {
    const distances = arrayOfDistances(array);
    let farthestDistance = -1;
    let indexToDelete = -1;
    const updatedIdsToKeep = [...idsToKeep, array[start].id];

    const canDeleteAll = array.every((obj) =>
        updatedIdsToKeep.includes(obj.id)
    );

    for (let i = 0; i < array.length; i++) {
        if (i === start) continue;
        if (!canDeleteAll && idsToKeep.includes(array[i].id)) continue;
        const distanceFromStart = distances[start][i];

        if (distanceFromStart > farthestDistance) {
            farthestDistance = distanceFromStart;
            indexToDelete = i;
        }
    }
    const id = array[indexToDelete].id;

    if (indexToDelete !== -1) {
        array.splice(indexToDelete, 1);
    }

    return id;
}

function removeObjectWithLowestRating(array, start, idsToKeep) {
    const distances = arrayOfDistances(array);
    let minRating = Infinity;
    let farthestDistance = -1;
    let indexToDelete = -1;
    const updatedIdsToKeep = [...idsToKeep, array[start].id];

    const canDeleteAll = array.every((obj) =>
        updatedIdsToKeep.includes(obj.id)
    );

    for (let i = 0; i < array.length; i++) {
        if (i === start) continue;
        if (!canDeleteAll && idsToKeep.includes(array[i].id)) continue;

        const currentRating = array[i].rating;
        const distanceFromStart = distances[start][i];

        if (
            currentRating < minRating ||
            (currentRating === minRating &&
                distanceFromStart > farthestDistance)
        ) {
            minRating = currentRating;
            farthestDistance = distanceFromStart;
            indexToDelete = i;
        }
    }
    const id = array[indexToDelete].id;

    if (indexToDelete !== -1) {
        array.splice(indexToDelete, 1);
    }

    return id;
}

function calculateRouteForTraveling(arr, start) {
    const { path, distance } = antColonyOptimization(arr, start, start);
    if (!path || !distance) return { path: [], distance: 0, time: 0 };
    return { path, distance, time: distance / 70 };
}

export function routeForTraveling(
    placesToVisit,
    start,
    typeRestPeriod,
    restPeriod,
    requiredPlaces,
    useRating
) {
    if (!restPeriod || !start) {
        return "Fill in all the fields!";
    }
    if (!isValidNonZeroInteger(restPeriod)) {
        return "Check that the entered values are correct. The period must be an integer.";
    }
    if (typeRestPeriod === "1" && restPeriod > 24) {
        return "The entered number of hours cannot exceed 24 hours.";
    }

    const route = [];
    let arrayIdDelete = [];
    let i = 0;

    while (true) {
        if (typeRestPeriod === "2" && i >= restPeriod) break;

        let idDelete = -1;
        let places = [...placesToVisit];
        places = places.filter((obj) => !arrayIdDelete.includes(obj.id));
        if (places.length <= 1) break;

        while (true) {
            let startCity = findCityIndex(start, places);
            let { time, path } = calculateRouteForTraveling(
                arrayOfDistances(places),
                startCity
            );

            if (
                time <=
                (typeRestPeriod === "2"
                    ? 11 - (places.length - 1) * 2
                    : restPeriod || places.length === 0)
            ) {
                break;
            } else {
                if (useRating === "1") {
                    idDelete = removeObjectWithLowestRating(
                        places,
                        startCity,
                        requiredPlaces
                    );
                } else {
                    idDelete = removeObjectWithFarFromTheStart(
                        places,
                        startCity,
                        requiredPlaces
                    );
                }
            }
        }

        let path = calculateRouteForTraveling(
            arrayOfDistances(places),
            findCityIndex(start, places)
        ).path;
        if (!path.length) {
            if (arrayIdDelete.indexOf(idDelete) === -1) {
                arrayIdDelete.push(idDelete);
            }
            continue;
        }

        const reorderedData = path.map((index) => places[index]);
        route.push([...reorderedData]);

        reorderedData.shift();
        reorderedData.pop();
        const idForDelete = reorderedData.map((obj) => obj.id);
        arrayIdDelete = [...arrayIdDelete, ...idForDelete];
        i++;
    }

    if (route.length <= 0) {
        return "The road cannot be built, change the entered data.";
    } else {
        return route;
    }
}
