import React, {FunctionComponent} from 'react';
import CodeArea from '../../../components/CodeArea';
import {code} from './functions';

const Select: FunctionComponent = () => {
    return <CodeArea code={code}/>;
};

export const name = 'Select';

export default Select;