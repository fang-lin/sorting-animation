import React, {FunctionComponent} from 'react';
import {NavLink, Link, useRouteMatch} from 'react-router-dom';
import algorithms from '../Algorithms/codes';
import {Params} from '../Algorithms';
import {Theme} from '../Theme';
import {List, ListItem} from './styles';

const Menu: FunctionComponent<Theme> = (theme) => {
    const {params: {themeKey}} = useRouteMatch<Params>();
    return <div>
        <List {...theme}>
            <ListItem {...theme}><Link to="/">Home</Link></ListItem>
            {Array.from(algorithms).map(([key, {name}]) =>
                <ListItem {...theme} key={key}><NavLink to={`/${themeKey}/${key}`}>{name}</NavLink></ListItem>
            )}
        </List>
    </div>;
};

export default Menu;