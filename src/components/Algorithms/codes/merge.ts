export const name = 'Merge';
export const key = 'merge';

export const code = `
function merge(list: Array<number>, low: number, mid: number, high: number): void {

    const ordered = [];
    let i = low, j = mid,
        k = 0, len;

    while (i < mid && j < high) {
        if (list[i] <= list[j])
            ordered[k++] = list[i++];
        else
            ordered[k++] = list[j++];
    }

    while (i < mid)
        ordered[k++] = list[i++];

    while (j < high)
        ordered[k++] = list[j++];

    for (k = 0, len = ordered.length; k < len; k++) {
        list[k + low] = ordered[k];
    }
}

function mergePass(list: Array<number>, len: number, n: number): void {

    let i;

    for (i = 0; i < n - 2 * len; i += 2 * len) {
        merge(list, i, i + len, i + 2 * len);
    }

    if (i + len < n) {
        merge(list, i, i + len, n);
    }
}

function mergeSort(list: Array<number>): void {
    for (let len = 1, n = list.length; len < n; len = 2 * len) {
        mergePass(list, len, n);
    }
}
`;

