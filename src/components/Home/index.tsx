import React, {FunctionComponent} from 'react';
import {NavLink} from 'react-router-dom';
import {getRandomAlgorithmKey} from '../Algorithms';
import {getRandomThemeKey} from '../Theme';

const Home: FunctionComponent = () => {
    return <div>
        <ul>
            <li><NavLink to={`/${getRandomThemeKey()}/${getRandomAlgorithmKey()}`}>Enter</NavLink></li>
        </ul>
    </div>;
};

export default Home;




