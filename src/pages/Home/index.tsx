import React, {FunctionComponent} from 'react';
import {NavLink} from 'react-router-dom';

const Index: FunctionComponent = () => {
    return <div>
        <ul>
            <li><NavLink to="/algorithms">Enter</NavLink></li>
        </ul>
    </div>;
};

export default Index;




