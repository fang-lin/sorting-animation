export const name = 'Select';
export const key = 'select';

export const code = `
function selectSort(list: Array<number>): void {

    const length = list.length;
    let i, j, k, tmp;

    for (i = 0; i < length; i++) {
        k = i;

        for (j = i + 1; j < length; j++) {
            if (list[j] < list[k]) {
                k = j;
            }
        }

        if (k != i) {
            tmp = list[k];
            list[k] = list[i];
            list[i] = tmp;
        }
    }
}
`;

