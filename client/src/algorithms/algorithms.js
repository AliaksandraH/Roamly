function findIndexById(arr, id) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].id === id) {
            return i;
        }
    }
    return -1;
}

export function findCityIndex(cityId, obj) {
    if (cityId != null && cityId !== "") {
        return findIndexById(obj, cityId);
    }
    return -1;
}

export function replaceNonNumbersWithZero(arr) {
    return arr.map((item) => (isNaN(item) ? 0 : Number(item)));
}

export function isValidNonZeroInteger(value) {
    if (typeof value !== "string" && typeof value !== "number") {
        return false;
    }
    if (typeof value === "string") {
        value = Number(value);
    }
    if (isNaN(value) || !Number.isInteger(value)) {
        return false;
    }
    if (value.toString().startsWith("0")) {
        return false;
    }
    return true;
}

export function arrayOfDistances(arr) {
    let distances = [];

    for (let i = 0; i < arr.length; i++) {
        const row = [];
        for (let j = 0; j < arr.length; j++) {
            row.push(
                haversine(
                    arr[i].location.latitude,
                    arr[i].location.longitude,
                    arr[j].location.latitude,
                    arr[j].location.longitude
                )
            );
        }
        distances.push(row);
    }

    return distances;
}

export function arrayOfTime(arr) {
    let time = [];

    for (let i = 0; i < arr.length; i++) {
        const row = [];
        for (let j = 0; j < arr.length; j++) {
            row.push(
                haversine(
                    arr[i].location.latitude,
                    arr[i].location.longitude,
                    arr[j].location.latitude,
                    arr[j].location.longitude
                ) / 70
            );
        }
        time.push(row);
    }
    return time;
}

function haversine(lat1, lon1, lat2, lon2) {
    const R = 6371.0;
    lat1 = lat1 * (Math.PI / 180);
    lon1 = lon1 * (Math.PI / 180);
    lat2 = lat2 * (Math.PI / 180);
    lon2 = lon2 * (Math.PI / 180);
    const dlat = lat2 - lat1;
    const dlon = lon2 - lon1;
    const a =
        Math.sin(dlat / 2) ** 2 +
        Math.cos(lat1) * Math.cos(lat2) * Math.sin(dlon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return distance;
}

function sortWithIndices(arr) {
    var indices = new Array(arr.length);
    for (var i = 0; i < arr.length; i++) {
        indices[i] = i;
    }

    indices.sort(function (a, b) {
        return arr[b] - arr[a];
    });

    return indices;
}

function removeZeroAndNullIndices(sortedArray, sortedIndices) {
    var filteredIndices = [];
    for (var i = 0; i < sortedArray.length; i++) {
        if (
            sortedArray[i] !== 0 &&
            sortedArray[i] !== null &&
            sortedArray[i] > 1
        ) {
            filteredIndices.push(sortedIndices[i]);
        }
    }
    return filteredIndices;
}

export function findRouteOptimaRating(arr, start, end) {
    var sortedIndices = sortWithIndices(arr);
    var sortedArray = sortedIndices.map(function (index) {
        return arr[index];
    });
    var filteredIndices = removeZeroAndNullIndices(sortedArray, sortedIndices);
    if (start === end && start != 1 && end != -1) {
        filteredIndices = filteredIndices.filter((item) => item !== start);
        filteredIndices.unshift(start);
        filteredIndices.push(end);
    } else {
        if (start != -1) {
            filteredIndices = filteredIndices.filter((item) => item !== start);
            filteredIndices.unshift(start);
        }
        if (end != -1) {
            filteredIndices = filteredIndices.filter((item) => item !== end);
            filteredIndices.push(end);
        }
    }

    return { path: filteredIndices };
}

function createArray2D(size, num) {
    return Array.from({ length: size }, () => Array(size).fill(num));
}

function changeArray(arr, number) {
    const index = arr.indexOf(number);
    if (index !== -1) {
        const newArr = arr.slice(index).concat(arr.slice(0, index));
        newArr.push(newArr[0]);
        return newArr;
    } else {
        return arr;
    }
}

function calculateLength(distances, route) {
    let totalDistance = 0;
    for (let i = 0; i < route.length - 1; i++) {
        const start = route[i];
        const end = route[i + 1];
        totalDistance += distances[start][end];
    }
    return totalDistance;
}

export function antColonyOptimization(distances, startCity = -1, endCity = -1) {
    const distancesLength = distances.length;
    const numAnts = distancesLength;
    const numIterations = 500;
    const pheromonesRemain = 0.6;
    const alpha = 1;
    const beta = 3;
    const initialPheromones = 0.5;
    const Q = 100;

    let bestRoute = [];
    let bestRouteLength = Infinity;
    const pheromones = createArray2D(distancesLength, initialPheromones);

    let cityEnd = endCity == startCity ? -1 : endCity;

    for (let iteration = 0; iteration < numIterations; iteration++) {
        const routes = [];
        const lengths = [];
        for (let c = 0; c < numAnts; c++) {
            let cityStart = c;
            if (startCity != -1 && startCity != endCity) cityStart = startCity;
            if (cityEnd != -1 && cityStart === cityEnd) continue;
            let numberCycles = distancesLength;
            if (cityEnd != -1) numberCycles--;

            let route = [];
            route.push(cityStart);

            const cities = [];
            for (let i = 0; i < distancesLength; i++) {
                i === cityStart || (cityEnd != -1 && i === cityEnd)
                    ? cities.push(0)
                    : cities.push(1);
            }

            let cityNow = cityStart;
            while (route.length < numberCycles) {
                const wishAll = [];
                for (let i = 0; i < distancesLength; i++) {
                    if (cities[i] === 0) {
                        wishAll.push(0);
                    } else {
                        wishAll.push(
                            pheromones[cityNow][i] ** alpha *
                                (1 / distances[cityNow][i]) ** beta
                        );
                    }
                }
                const sumWish = wishAll.reduce(
                    (accumulator, currentValue) => accumulator + currentValue,
                    0
                );

                const probability = [];
                for (let i = 0; i < distancesLength; i++) {
                    cities[i] === 0
                        ? probability.push(0)
                        : probability.push(wishAll[i] / sumWish);
                }

                const randomNumber = Math.random();
                let sum = 0;
                for (let i = 0; i < distancesLength; i++) {
                    sum += probability[i];
                    if (randomNumber < sum) {
                        cityNow = i;
                        cities[i] = 0;
                        route.push(i);
                        break;
                    }
                }
            }

            if (endCity === startCity) {
                if (endCity === -1) {
                    route.push(cityStart);
                } else {
                    const result = changeArray(route, endCity);
                    route = result;
                }
            } else if (endCity != -1) {
                route.push(endCity);
            }
            routes.push(route);
            lengths.push(calculateLength(distances, route));
        }

        for (let i = 0; i < pheromones.length; i++) {
            for (let j = 0; j < pheromones.length; j++) {
                pheromones[i][j] *= pheromonesRemain;
            }
        }

        for (let i = 0; i < lengths.length; i++) {
            const a = Q / lengths[i];
            for (let j = 0; j < routes[i].length; j++) {
                if (
                    typeof routes[i][j + 1] === "undefined" &&
                    isNaN(routes[i][j + 1])
                ) {
                    continue;
                }
                const rows = routes[i][j];
                const cols = routes[i][j + 1];
                pheromones[rows][cols] += a;
                pheromones[cols][rows] += a;
            }
        }

        let minNumber = lengths[0];
        let minIndex = 0;
        for (let i = 1; i < lengths.length; i++) {
            if (lengths[i] < minNumber) {
                minNumber = lengths[i];
                minIndex = i;
            }
        }
        if (minNumber < bestRouteLength) {
            bestRouteLength = minNumber;
            bestRoute = routes[minIndex];
        }
    }

    return { path: bestRoute, distance: bestRouteLength };
}
