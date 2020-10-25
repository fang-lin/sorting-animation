import React, {FunctionComponent} from 'react';
import CodeArea from '../../../components/CodeArea';

const code = `
function quickSort(list, left, right) {

    var pivot, i, j,
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

const Quick: FunctionComponent = () => {
    return <CodeArea code={code}/>;
};

export const name = 'Quick';

export default Quick;