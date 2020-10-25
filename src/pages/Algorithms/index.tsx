import React, {FunctionComponent} from 'react';
import {Route, Switch, Link, useRouteMatch, Redirect} from 'react-router-dom';
import * as BinaryInsert from './BinaryInsert';
import * as Bubble from './Bubble';
import * as Heap from './Heap';
import * as Insert from './Insert';
import * as Merge from './Merge';
import * as Quick from './Quick';
import * as Select from './Select';
import * as Shaker from './Shaker';
import * as Shell from './Shell';

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
    return name.replace(/\s/g, '_');
}

const Index: FunctionComponent = () => {

    const {path, url} = useRouteMatch();
    console.log(path, url);

    return <div>
        <ul>
            {
                pages.map(({name}, index) =>
                    <li key={index}><Link to={`${url}/${formatPageName(name)}`}>{name}</Link></li>
                )
            }
        </ul>
        <div>
            <Switch>
                {
                    pages.map(({name, default: component}, index) =>
                        <Route key={index} path={`${path}/${formatPageName(name)}`}>{component}</Route>
                    )
                }
                <Redirect to={`${url}/${formatPageName(pages[0].name)}`}/>
            </Switch>
        </div>
    </div>;
};

export default Index;




