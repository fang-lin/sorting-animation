import {render} from 'react-dom';
import React from 'react';
import {Redirect, Route, HashRouter, Switch} from 'react-router-dom';
import Algorithms, {Params} from './components/Algorithms';
import injectFonts from './fonts';
import 'normalize.css/normalize.css';
import {getRandomThemeKey} from './components/Theme';
import algorithms, {AlgorithmKey} from './components/Algorithms/codes';
import random from 'lodash/random';

const dom = document.getElementById('root');

export function getRandomAlgorithmKey(): AlgorithmKey {
    const keys = Object.keys(algorithms);
    return keys[random(0, keys.length - 1)] as AlgorithmKey;
}

export function linker({themeKey, algorithmKey, speedKey, audioIsEnabledKey}: Params): string {
    return `/${themeKey}/${algorithmKey}/${speedKey}/${audioIsEnabledKey}`;
}

if (dom) {
    render(<HashRouter>
        <Switch>
            <Route path="/:themeKey/:algorithmKey/:speedKey/:audioIsEnabledKey"><Algorithms/></Route>
            <Redirect to={linker({
                themeKey: getRandomThemeKey(),
                algorithmKey: getRandomAlgorithmKey(),
                speedKey: '100',
                audioIsEnabledKey: '1'
            })}/>
        </Switch>
    </HashRouter>, dom);
}

injectFonts();
