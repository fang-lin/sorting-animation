import React, {Dispatch, FunctionComponent, SetStateAction} from 'react';
import Rabbit from '../../icons/rabbit.svg';
import Turtle from '../../icons/turtle.svg';
import Snail from '../../icons/snail.svg';
import {Raw, Item, OperationBarWrapper} from './styles';
import {Theme} from '../Theme';
import {NavLink, useRouteMatch} from 'react-router-dom';
import {Params} from '../Algorithms';
import {linker} from '../..';
import Shuffle from '../../icons/shuffle.svg';
import MusicOff from '../../icons/music-off.svg';
import MusicOn from '../../icons/music-on.svg';

interface SpeedBarProps {
    theme: Theme;
    triggerShuffle: Dispatch<SetStateAction<number>>;
}

const SettingBar: FunctionComponent<SpeedBarProps> = ({theme, triggerShuffle}) => {
    const {params} = useRouteMatch<Params>();
    const audioIsEnabledKey = params.audioIsEnabledKey === '1' ? '0' : '1';
    return <OperationBarWrapper>
        <Raw>
            <Item {...theme}>
                <NavLink to={linker({...params, speedKey: '1000'})}><Snail/></NavLink>
            </Item>
            <Item {...theme}>
                <NavLink to={linker({...params, speedKey: '100'})}><Turtle/></NavLink>
            </Item>
            <Item {...theme}>
                <NavLink to={linker({...params, speedKey: '10'})}><Rabbit/></NavLink>
            </Item>
        </Raw>
        <Raw>
            <Item onClick={({timeStamp}) => triggerShuffle(timeStamp)} {...theme}><a><Shuffle/></a></Item>
            <Item  {...theme}>
                <NavLink
                    to={linker({
                        ...params,
                        audioIsEnabledKey
                    })}>{params.audioIsEnabledKey === '1' ? <MusicOff/> : <MusicOn/>}</NavLink>
            </Item>
        </Raw>
    </OperationBarWrapper>;
};

export default SettingBar;
