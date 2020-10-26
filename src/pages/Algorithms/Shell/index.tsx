import React, {FunctionComponent} from 'react';
import CodeArea from '../../../components/CodeArea';
import {code} from './functions';

const Shell: FunctionComponent = () => {
    return <CodeArea code={code}/>;
};

export const name = 'Shell';

export default Shell;