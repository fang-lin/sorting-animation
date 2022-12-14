import React, {Dispatch, FunctionComponent, SetStateAction} from 'react';
import {getRandomThemeKey, Theme} from '../Theme';
import {AudioAlterWrapper, AudioAlertBackground, PlayButton, ChangeTheme} from './styles';
import {useRouteMatch, useHistory, NavLink} from 'react-router-dom';
import {Params} from '../Algorithms';
import Music from '../../icons/music.svg';
import {paramsToLink} from '../../functions';

interface AudioAlertProps {
    theme: Theme;
    setFirstShowAudioAlert: Dispatch<SetStateAction<boolean>>;
}

const AudioAlert: FunctionComponent<AudioAlertProps> = ({theme, setFirstShowAudioAlert}) => {
    const {params} = useRouteMatch<Params>();
    const history = useHistory();
    return <AudioAlertBackground {...theme}>
        <AudioAlterWrapper onClick={() => {
            const b = document.querySelector<HTMLButtonElement>('#audio-trigger-button');
            b?.click();
            history.push(paramsToLink({
                ...params,
                audioIsEnabledKey: '1'
            }));
            setFirstShowAudioAlert(false);
        }} {...theme}>
            <Music/>
            <PlayButton {...theme}>PLAY!
            </PlayButton>
        </AudioAlterWrapper>
        <ChangeTheme {...theme}>
            <NavLink to={paramsToLink({
                ...params,
                themeKey: getRandomThemeKey()
            })}>Change theme</NavLink>
        </ChangeTheme>

    </AudioAlertBackground>;
};

export default AudioAlert;
