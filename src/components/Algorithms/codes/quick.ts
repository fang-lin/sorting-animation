export const name = 'Quick';

export const code = `
function quickSort(list: Array<number>, left: number, right: number): void {

    let pivot, i, j,
        tmp;

    if (left < right) {
        i = left;
        j = right + 1;
        pivot = list[left];

        do {
            do {
                i++;
            } while (list[i] < pivot);

            do {
                j--;
            } while (list[j] > pivot);

            if (i < j) {
                tmp = list[i];
                list[i] = list[j];
                list[j] = tmp;
            }
        } while (i < j);

        tmp = list[left];
        list[left] = list[j];
        list[j] = tmp;

        quickSort(list, left, j - 1);
        quickSort(list, j + 1, right);
    }
}
`;