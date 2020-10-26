import React, {FunctionComponent} from 'react';
import CodeArea from '../../../components/CodeArea';
import {code} from './functions';

const Merge: FunctionComponent = () => {
    return <CodeArea code={code}/>;
};

export const name = 'Merge';

export default Merge;