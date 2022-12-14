import {render} from 'react-dom';
import React from 'react';
import {HashRouter, Redirect, Route, Switch} from 'react-router-dom';
import Algorithms from './components/Algorithms';
import injectFonts from './fonts';
import {getRandomThemeKey} from './components/Theme';
import {getRandomAlgorithmKey, paramsToLink} from './functions';

import 'normalize.css/normalize.css';

const dom = document.getElementById('root');

if (dom) {
    render(<HashRouter>
        <Switch>
            <Route path="/:themeKey/:algorithmKey/:speedKey/:audioIsEnabledKey"><Algorithms/></Route>
            <Redirect to={paramsToLink({
                themeKey: getRandomThemeKey(),
                algorithmKey: getRandomAlgorithmKey(),
                speedKey: '100',
                audioIsEnabledKey: '1'
            })}/>
        </Switch>
    </HashRouter>, dom);
}

injectFonts();
