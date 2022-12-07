import React, {FunctionComponent} from 'react';
import {Wrapper} from './styles';
import {Theme} from '../Theme';
import {NavLink, useRouteMatch} from 'react-router-dom';
import {Params} from '../Algorithms';
import {linker} from '../..';

interface AudioButtonProps {
    theme: Theme;
}

const AudioButton: FunctionComponent<AudioButtonProps> = () => {
    const {params} = useRouteMatch<Params>();
    const audioIsEnabledKey = params.audioIsEnabledKey === '1' ? '0' : '1';
    return <Wrapper>
        <NavLink
            to={linker({
                ...params,
                audioIsEnabledKey
            })}>Audio: {params.audioIsEnabledKey === '1' ? 'NO' : 'OFF'}</NavLink>
    </Wrapper>;
};

export default AudioButton;
