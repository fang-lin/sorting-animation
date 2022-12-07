import React, {FunctionComponent, useEffect, useState} from 'react';
import {useHistory, useRouteMatch} from 'react-router-dom';
import algorithms, {AlgorithmKey} from './codes';
import CodeArea from '../CodeArea';
import CanvasTarget from '../Canvas';
import {defaultTheme, Theme, ThemeKey, ThemeKeys} from '../Theme';
import {
    GlobalStyle,
    Wrapper,
    Head1,
    MenuWrapper,
    AlgorithmsWrapper,
    CodeAreaWrapper,
    ThemeBarWrapper,
} from './styles';
import Menu from '../Menu';
import Footer from '../Footer';
import ThemeBar from '../Theme';
import SpeedBar from '../SpeedBar';
import ShuffleButton from '../ShuffleButton';
import AudioButton from '../AudioButton';

function validParams({themeKey, algorithmKey, speedKey, audioIsEnabledKey}: Params): boolean {
    return algorithms[algorithmKey] && ThemeKeys.includes(themeKey) && SpeedKey.includes(speedKey) && AudioIsEnabledKey.includes(audioIsEnabledKey);
}

const Algorithms: FunctionComponent = () => {
    const {params} = useRouteMatch<Params>();
    const {themeKey, algorithmKey, speedKey} = params;
    const {push} = useHistory();
    const [theme, applyTheme] = useState<Theme>(defaultTheme);
    const [shuffle, triggerShuffle] = useState<number>(0);

    useEffect(() => {
        if (!validParams(params))
            push('/');
    }, [params, push]);

    if (validParams(params)) {
        const {name, code, executor} = algorithms[algorithmKey];
        return <>
            <CanvasTarget {...{theme, speed: parseInt(speedKey), executor, shuffle}}/>
            <Wrapper>
                <AlgorithmsWrapper>
                    <GlobalStyle {...theme}/>
                    <CodeAreaWrapper>
                        <Head1 {...theme}>{name}<sup> with <span>{themeKey}</span></sup></Head1>
                        <CodeArea {...{themeKey, code, applyTheme}}/>
                    </CodeAreaWrapper>
                    <MenuWrapper>
                        <Menu {...theme}/>
                        <SpeedBar {...{theme}}/>
                        <ShuffleButton {...{theme, triggerShuffle}}/>
                        <AudioButton {...{theme}}/>
                    </MenuWrapper>
                    <ThemeBarWrapper>
                        <ThemeBar {...theme}/>
                    </ThemeBarWrapper>
                </AlgorithmsWrapper>
                <Footer {...theme}/>
            </Wrapper>
        </>;
    }
    return null;
};

export default Algorithms;

const SpeedKey = ['1000', '100', '10'] as const;
const AudioIsEnabledKey = ['1', '0'] as const;

export interface Params {
    themeKey: ThemeKey;
    algorithmKey: AlgorithmKey;
    speedKey: typeof SpeedKey[number];
    audioIsEnabledKey: typeof AudioIsEnabledKey[number]
}
