
export function sum(arr: number[]): number {
    if (!arr) return 0;

    let sumValue = arr.reduce(function (rv, x) {
        (rv += x || 0);
        return rv;
    }, 0)

    return sumValue;
}

export function sumByKey(xs: any[], key: string): number {
    if (!xs) return 0;

    let initObj = {};
    initObj[key] = 0;

    let sumObj = xs.reduce(function (rv, x) {
        (rv[key] += x[key] || 0);
        return rv;
    }, initObj)

    return sumObj[key];
}

export function sortBy<T>(xs: T[], key: string) {
    return xs.sort((a, b) => {
        if (a[key] < b[key]) {
            return -1;
        }
        if (a[key] > b[key]) {
            return 1;
        }

        return 0;
    });
}

export function sortByDesc<T>(xs: T[], key: string) {
    return xs.sort((a, b) => {
        if (a[key] > b[key]) {
            return -1;
        }
        if (a[key] < b[key]) {
            return 1;
        }

        return 0;
    });
}
