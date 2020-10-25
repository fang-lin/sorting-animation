import React, {FunctionComponent} from 'react';
import CodeArea from '../../../components/CodeArea';

const code = `
function selectSort(list) {

    var len = list.length,
        i, j, k, tmp;

    for (i = 0; i < len; i++) {
        k = i;

        for (j = i + 1; j < len; j++) {
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
const Select: FunctionComponent = () => {
    return <CodeArea code={code}/>;
};

export const name = 'Select';

export default Select;