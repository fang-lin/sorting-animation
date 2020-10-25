import React, {FunctionComponent} from 'react';
import CodeArea from '../../../components/CodeArea';

const code = `
function bubbleSort(list) {

    var tmp;

    for (var i = list.length; i > 0; i--) {
        for (var j = 0; j < i; j++) {
            if (list[j] > list[j + 1]) {
                tmp = list[j];
                list[j] = list[j + 1];
                list[j + 1] = tmp;
            }
        }
    }
}
`;

const Index: FunctionComponent = () => {
    return <CodeArea code={code}/>;
};

export const name = 'Bubble';

export default Index;