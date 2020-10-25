import React, {FunctionComponent} from 'react';
import CodeArea from '../../../components/CodeArea';

const code = `
function insertSort(list) {

    var next,
        len = list.length;

    for (var i = 1; i < len; i++) {
        next = list[i];

        for (var j = i - 1; j >= 0 && next < list[j]; j--)
            list[j + 1] = list[j];

        list[j + 1] = next;
    }
}
`;

const Index: FunctionComponent = () => {
    return <CodeArea code={code}/>;
};

export const name = 'Insert';

export default Index;