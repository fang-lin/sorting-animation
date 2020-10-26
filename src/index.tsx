import {render} from 'react-dom';
import React from 'react';
import {Redirect, Route, HashRouter, Switch} from 'react-router-dom';
import Algorithms from './components/Algorithms';
import Home from './components/Home';
import injectFonts from './fonts';
import 'normalize.css/normalize.css';
import {GlobalStyle} from './styles';

const dom = document.getElementById('root');

if (dom) {
    render(<HashRouter>
        <GlobalStyle/>
        <Switch>
            <Route path="/:themeKey/:algorithmKey"><Algorithms/></Route>
            <Route path="/" exact><Home/></Route>
            <Redirect to="/"/>
        </Switch>
    </HashRouter>, dom);
}

injectFonts();