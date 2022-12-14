import React, {Dispatch, FunctionComponent, SetStateAction, useContext} from 'react';
import {getRandomThemeKey, Theme} from '../Theme';
import {AudioAlterButton, AudioAlertBackground, CoinTossButton, Head3} from './styles';
import {useRouteMatch, useHistory, NavLink} from 'react-router-dom';
import {AudioButtonContext, Params} from '../Algorithms';
import Music from '../../icons/music.svg';
import CoinToss from '../../icons/coin-toss.svg';
import {getRandomAlgorithmKey, paramsToLink} from '../../functions';
import {version} from '../../../package.json';

interface AudioAlertProps {
    theme: Theme;
    setFirstShowAudioAlert: Dispatch<SetStateAction<boolean>>;
}

const AudioAlert: FunctionComponent<AudioAlertProps> = ({theme, setFirstShowAudioAlert}) => {
    const {params} = useRouteMatch<Params>();
    const history = useHistory();
    const audioButton = useContext(AudioButtonContext);
    return audioButton ? <AudioAlertBackground {...theme}>
        <AudioAlterButton onClick={() => {
            audioButton.click();
            history.push(paramsToLink({
                ...params,
                audioIsEnabledKey: '1'
            }));
            setFirstShowAudioAlert(false);
        }} {...theme}>
            <Music/>
            PLAY
        </AudioAlterButton>
        <CoinTossButton {...theme}>
            <NavLink to={paramsToLink({
                ...params,
                algorithmKey: getRandomAlgorithmKey(),
                themeKey: getRandomThemeKey(),
            })}>
                <CoinToss/>
                Toss
            </NavLink>
        </CoinTossButton>
        <Head3 {...theme}>algoRYTHM {version}</Head3>
    </AudioAlertBackground> : null;
};

export default AudioAlert;
