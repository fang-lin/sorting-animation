import React, {Dispatch, FunctionComponent, SetStateAction} from 'react';
import {Wrapper, Button} from './styles';
import {Theme} from '../Theme';

interface AudioButtonProps {
    theme: Theme;
    audioIsEnabled: boolean;
    triggerAudioIsEnabled: Dispatch<SetStateAction<boolean>>;
}

const AudioButton: FunctionComponent<AudioButtonProps> = ({theme, audioIsEnabled, triggerAudioIsEnabled}) => {
    return <Wrapper><Button onClick={() => triggerAudioIsEnabled(!audioIsEnabled)} {...theme}>Audio: { audioIsEnabled ? 'NO' : 'OFF'}</Button></Wrapper>;
};

export default AudioButton;
