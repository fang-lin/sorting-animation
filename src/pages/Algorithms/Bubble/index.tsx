import React, {FunctionComponent} from 'react';
import CodeArea from '../../../components/CodeArea';
import {code} from './functions';

const Index: FunctionComponent = () => {
    return <CodeArea code={code}/>;
};

export const name = 'Bubble';

export default Index;