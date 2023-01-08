import React, {Dispatch, FunctionComponent, SetStateAction, useEffect, useRef} from 'react';
import Rabbit from '../../icons/rabbit.svg';
import Turtle from '../../icons/turtle.svg';
import Bear from '../../icons/bear.svg';
import {Raw, Item, OperationBarWrapper} from './styles';
import {getRandomThemeKey, Theme} from '../Theme';
import {NavLink, useRouteMatch} from 'react-router-dom';
import {AudioButtonElement, Params} from '../Algorithms';
import Shuffle from '../../icons/shuffle.svg';
import MusicOff from '../../icons/music-off.svg';
import MusicOn from '../../icons/music-on.svg';
import Palette from '../../icons/palette.svg';
import {paramsToLink} from '../../functions';

interface SpeedBarProps {
    theme: Theme;
    triggerShuffle: Dispatch<SetStateAction<number>>;
    setAudioButton: Dispatch<SetStateAction<AudioButtonElement>>;
}

const SettingBar: FunctionComponent<SpeedBarProps> = ({theme, triggerShuffle, setAudioButton}) => {
    const {params} = useRouteMatch<Params>();
    const audioButton = useRef<HTMLAnchorElement>(null);
    const audioIsEnabledKey = params.audioIsEnabledKey === '1' ? '0' : '1';

    useEffect(() => {
        setAudioButton(audioButton.current);
    }, [setAudioButton]);

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
                    ref={audioButton}
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
                })}><Palette/></NavLink>
            </Item>
        </Raw>
    </OperationBarWrapper>;
};

export default SettingBar;
