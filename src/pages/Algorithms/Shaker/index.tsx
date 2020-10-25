import React, {FunctionComponent} from 'react';
import CodeArea from '../../../components/CodeArea';

const code = `
function shakerSort(list) {

    var i, left = 0,
        right = list.length,
        k = 0, tmp;

    while (left < right) {
        for (i = left; i < right; i++) {
            if (list[i] > list[i + 1]) {
                tmp = list[i];
                list[i] = list[i + 1];
                list[i + 1] = tmp;

                k = i;
            }
        }

        right = k;

        for (i = right; i > left; i--) {
            if (list[i - 1] > list[i]) {
                tmp = list[i];
                list[i] = list[i - 1];
                list[i - 1] = tmp;

                k = i;
            }
        }

        left = k;
    }
}
`;

const Shaker: FunctionComponent = () => {
    return <CodeArea code={code}/>;
};

export const name = 'Shaker';

export default Shaker;