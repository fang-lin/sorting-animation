import React, {FunctionComponent} from 'react';
import CodeArea from '../../../components/CodeArea';
import {code} from './functions';

const Heap: FunctionComponent = () => {
    return <CodeArea code={code}/>;
};

export const name = 'Heap';

export default Heap;