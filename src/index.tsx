import {render} from 'react-dom';
import React from 'react';
import {Redirect, Route, Router, Switch} from 'react-router';
import {createHashHistory} from 'history';
import Home from './pages/Home';

const dom = document.getElementById('root');

if (dom) {
    const history = createHashHistory();
    render(<Router {...{history}}>
        <Switch>
            <Route path="/" component={Home} exact/>
            <Redirect to="/"/>
        </Switch>
    </Router>, dom);
}
