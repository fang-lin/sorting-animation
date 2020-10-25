import React, {FunctionComponent} from 'react';
import CodeArea from '../../../components/CodeArea';

const code = `
function adjustHeap(list, root, len) {

    var p = root,
        chd = 2 * root,
        tmp = list[root];

    while (chd < len) {
        if (chd < len && list[chd] < list[chd + 1])
            chd++;

        if (tmp < list[chd]) {
            list[p] = list[chd];
            p = chd;
            chd = 2 * p;
        } else
            break;
    }

    list[p] = tmp;
}

function heapSort(list) {

    var i, tmp,
        len = list.length - 1;

    for (i = len / 2 | 0; i >= 0; i--) {
        adjustHeap(list, i, len);
    }

    for (i = len; i > 0; i--) {
        tmp = list[0];
        list[0] = list[i];
        list[i] = tmp;

        adjustHeap(list, 0, i - 1);
    }
}
`;

const Heap: FunctionComponent = () => {
    return <CodeArea code={code}/>;
};

export const name = 'Heap';

export default Heap;