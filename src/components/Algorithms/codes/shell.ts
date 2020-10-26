export const name = 'Shell';
export const key = 'shell';

export const code = `
function shellSort(list: Array<number>): void {

    const length = list.length;
    let gap = length / 2 | 0,
        i, j, tmp;

    while (gap > 0) {
        for (i = gap; i < length; i++) {
            tmp = list[i];
            j = i - gap;

            while (j >= 0 && tmp < list[j]) {
                list[j + gap] = list[j];
                j = j - gap;
            }

            list[j + gap] = tmp;
        }

        gap = gap / 2 | 0;
    }
}
`;

