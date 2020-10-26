import React, {FunctionComponent} from 'react';
import CodeArea from '../../../components/CodeArea';
import {code} from './functions';


const BinaryInsert: FunctionComponent = () => {
    return <CodeArea code={code}/>;
};

export default BinaryInsert;

export const name = 'Binary Insert';