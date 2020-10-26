export const name = 'Binary Insert';
export const key = 'binary-insert';

export const code = `
function binaryInsertSort(list: Array<number>): void {

    const length = list.length;
    let i, j, tmp, low, high, mid;

    for (i = 1; i < length; i++) {
        tmp = list[i];
        low = 0;
        high = i;

        while (low <= high) {
            mid = (low + high) / 2 | 0;

            if (tmp < list[mid])
                high = mid - 1;
            else
                low = mid + 1;
        }

        for (j = i - 1; j > high; j--)
            list[j + 1] = list[j];

        list[j + 1] = tmp;
    }
}
`;