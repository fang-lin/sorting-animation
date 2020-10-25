import React, {FunctionComponent} from 'react';
import CodeArea from '../../../components/CodeArea';

const code = `
function binaryInsertSort(list) {

    var len = list.length,
        i, j, tmp, low, high, mid;

    for (i = 1; i < len; i++) {
        tmp = list[i];
        low = 0, high = i;

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


const BinaryInsert: FunctionComponent = () => {
    return <CodeArea code={code}/>;
};

export default BinaryInsert;

export const name = 'Binary Insert';