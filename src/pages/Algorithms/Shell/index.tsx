import React, {FunctionComponent} from 'react';
import CodeArea from '../../../components/CodeArea';

const code = `
function shellSort(list) {

    var len = list.length,
        gap = len / 2 | 0,
        i, j, tmp;

    while (gap > 0) {
        for (i = gap; i < len; i++) {
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

const Shell: FunctionComponent = () => {
    return <CodeArea code={code}/>;
};

export const name = 'Shell';

export default Shell;