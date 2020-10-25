import React, {FunctionComponent} from 'react';
import {Route, Switch, NavLink, useRouteMatch, Redirect} from 'react-router-dom';
import * as BinaryInsert from './BinaryInsert';
import * as Bubble from './Bubble';
import * as Heap from './Heap';
import * as Insert from './Insert';
import * as Merge from './Merge';
import * as Quick from './Quick';
import * as Select from './Select';
import * as Shaker from './Shaker';
import * as Shell from './Shell';
import './styles.css';

export const pages = [
    BinaryInsert,
    Bubble,
    Heap,
    Insert,
    Merge,
    Quick,
    Select,
    Shaker,
    Shell,
];

export function formatPageName(name: string): string {
    return name.replace(/\s/g, '_').toLowerCase();
}

const Navigator: FunctionComponent = () => {
    const {path} = useRouteMatch();
    return <div>
        <ul>
            <li><NavLink to="/">Home</NavLink></li>
            {pages.map(({name}, index) =>
                <li key={index}><NavLink to={`${path}/${formatPageName(name)}`}>{name}</NavLink></li>
            )}
        </ul>
    </div>;
};

const Index: FunctionComponent = () => {
    const {path} = useRouteMatch();

    return <div>
        <Navigator/>
        <div>
            <Switch>
                {pages.map(({name, default: component}, index) =>
                    <Route key={index} path={`${path}/${formatPageName(name)}`}>{component}</Route>
                )}
                <Redirect to={`${path}/${formatPageName(pages[0].name)}`}/>
            </Switch>
        </div>
    </div>;
};

export default Index;




