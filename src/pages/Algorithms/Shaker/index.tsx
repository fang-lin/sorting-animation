import React, {FunctionComponent} from 'react';
import CodeArea from '../../../components/CodeArea';
import {code} from './functions';

const Shaker: FunctionComponent = () => {
    return <CodeArea code={code}/>;
};

export const name = 'Shaker';

export default Shaker;