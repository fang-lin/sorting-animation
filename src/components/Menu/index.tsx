import React, {FunctionComponent} from 'react';
import {NavLink, useRouteMatch} from 'react-router-dom';
import algorithms, {AlgorithmKey} from '../Algorithms/codes';
import {Params} from '../Algorithms';
import {Theme} from '../Theme';
import map from 'lodash/map';
import {List, ListItem} from './styles';
import {linker} from '../..';

const Menu: FunctionComponent<Theme> = (theme) => {
    const {params} = useRouteMatch<Params>();
    return <List {...theme}>
        {map(algorithms, ({name}, key) =>
            <ListItem {...theme} key={key}><NavLink
                to={linker({...params, algorithmKey: key as AlgorithmKey})}>{name}</NavLink></ListItem>)}
    </List>;
};

export default Menu;
