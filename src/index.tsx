import {render} from 'react-dom';
import React from 'react';
import {Redirect, Route, HashRouter, Switch} from 'react-router-dom';
import Algorithms, {getRandomAlgorithmKey} from './components/Algorithms';
import injectFonts from './fonts';
import 'normalize.css/normalize.css';
import {getRandomThemeKey} from './components/Theme';

const dom = document.getElementById('root');

if (dom) {
    render(<HashRouter>
        <Switch>
            <Route path="/:themeKey/:algorithmKey/:speedKey"><Algorithms/></Route>
            <Redirect to={`/${getRandomThemeKey()}/${getRandomAlgorithmKey()}/100`}/>
        </Switch>
    </HashRouter>, dom);
}

injectFonts();