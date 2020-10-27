import React, {FunctionComponent} from 'react';
import {NavLink, useRouteMatch} from 'react-router-dom';
import algorithms from '../Algorithms/codes';
import {Params} from '../Algorithms';
import {Theme} from '../Theme';
import {List, ListItem} from './styles';

const Menu: FunctionComponent<Theme> = (theme) => {
    const {params: {themeKey}} = useRouteMatch<Params>();
    return <List {...theme}>
        {Array.from(algorithms).map(([key, {name}]) =>
            <ListItem {...theme} key={key}><NavLink to={`/${themeKey}/${key}`}>{name}</NavLink></ListItem>
        )}
    </List>;
};

export default Menu;