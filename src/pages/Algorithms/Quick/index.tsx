import React, {FunctionComponent} from 'react';
import CodeArea from '../../../components/CodeArea';
import {code} from './functions';

const Quick: FunctionComponent = () => {
    return <CodeArea code={code}/>;
};

export const name = 'Quick';

export default Quick;