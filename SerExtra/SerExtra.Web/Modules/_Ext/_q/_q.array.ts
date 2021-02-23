
namespace q {
    export function sum(xs: any[], key) {
        if (!xs) return null;

        let initObj = {};
        initObj[key] = 0;

        let sumObj = xs.reduce(function (rv, x) {
            (rv[key] += x[key] || 0);
            return rv;
        }, initObj)

        return sumObj[key];
    }

    export function groupBy(xs: any[], key) {
        return xs.reduce(function (rv, x) {
            (rv[x[key]] = rv[x[key]] || []).push(x);
            return rv;
        }, {});
    }

    export function sortBy<T>(xs: T[], key) {
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

    export function sortByDesc<T>(xs: T[], key) {
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

}
