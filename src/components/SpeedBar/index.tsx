import React, {FunctionComponent} from 'react';
import Rabbit from '../../icons/rabbit.svg';
import Turtle from '../../icons/turtle.svg';
import Snail from '../../icons/snail.svg';
import {SpeedBarList, SpeedBarItem, OperationBarWrapper} from './styles';
import {Theme} from '../Theme';
import {NavLink, useRouteMatch} from 'react-router-dom';
import {Params} from '../Algorithms';

interface SpeedBarProps {
    theme: Theme;
}

const SpeedBar: FunctionComponent<SpeedBarProps> = ({theme}) => {
    const {params: {themeKey, algorithmKey}} = useRouteMatch<Params>();
    return <OperationBarWrapper>
        <SpeedBarList>
            <SpeedBarItem {...theme}>
                <NavLink to={`/${themeKey}/${algorithmKey}/${10}`}><Rabbit/></NavLink>
            </SpeedBarItem>
            <SpeedBarItem {...theme}>
                <NavLink to={`/${themeKey}/${algorithmKey}/${100}`}><Turtle/></NavLink>
            </SpeedBarItem>
            <SpeedBarItem {...theme}>
                <NavLink to={`/${themeKey}/${algorithmKey}/${1000}`}><Snail/></NavLink>
            </SpeedBarItem>
        </SpeedBarList>
    </OperationBarWrapper>;
};

export default SpeedBar;