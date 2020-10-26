import {render} from 'react-dom';
import React from 'react';
import {Redirect, Route, HashRouter, Switch} from 'react-router-dom';
import Algorithms from './pages/Algorithms';
import Home from './pages/Home';
import injectFonts from './fonts';

const dom = document.getElementById('root');

if (dom) {
    render(<HashRouter>
        <Switch>
            <Route path="/algorithms"><Algorithms/></Route>
            <Route path="/" exact><Home/></Route>
            <Redirect to="/"/>
        </Switch>
    </HashRouter>, dom);
}

injectFonts();