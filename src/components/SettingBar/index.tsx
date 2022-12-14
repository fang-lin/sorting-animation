import React, {Dispatch, FunctionComponent, SetStateAction} from 'react';
import Rabbit from '../../icons/rabbit.svg';
import Turtle from '../../icons/turtle.svg';
import Bear from '../../icons/bear.svg';
import {Raw, Item, OperationBarWrapper} from './styles';
import {getRandomThemeKey, Theme} from '../Theme';
import {NavLink, useRouteMatch} from 'react-router-dom';
import {Params} from '../Algorithms';
import Shuffle from '../../icons/shuffle.svg';
import MusicOff from '../../icons/music-off.svg';
import MusicOn from '../../icons/music-on.svg';
import ColorPalette from '../../icons/color-palette.svg';
import {getRandomAlgorithmKey, paramsToLink} from '../../functions';

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
                <NavLink to={paramsToLink({...params, speedKey: '1000'})}><Turtle/></NavLink>
            </Item>
            <Item {...theme}>
                <NavLink to={paramsToLink({...params, speedKey: '100'})}><Bear/></NavLink>
            </Item>
            <Item {...theme}>
                <NavLink to={paramsToLink({...params, speedKey: '10'})}><Rabbit/></NavLink>
            </Item>
        </Raw>
        <Raw>
            <Item  {...theme}>
                <NavLink
                    id="audio-trigger-button"
                    to={paramsToLink({
                        ...params,
                        audioIsEnabledKey
                    })}
                >{params.audioIsEnabledKey === '1' ? <MusicOff/> : <MusicOn/>}</NavLink>
            </Item>
            <Item onClick={({timeStamp}) => triggerShuffle(timeStamp)} {...theme}><a><Shuffle/></a></Item>
            <Item  {...theme}>
                <NavLink to={paramsToLink({
                    ...params,
                    themeKey: getRandomThemeKey()
                })}><ColorPalette/></NavLink>
            </Item>
        </Raw>
    </OperationBarWrapper>;
};

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded 123'); // 1st
});

export default SettingBar;
