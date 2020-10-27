import React, {FunctionComponent, useState} from 'react';
import {useHistory, useRouteMatch} from 'react-router-dom';
import random from 'lodash/random';
import {version} from '../../../package.json';
import algorithms, {Code} from './codes';
import CodeArea from '../CodeArea';
import {ThemeKeys, defaultTheme, Theme, ThemeKey} from '../Theme';
import {
    GlobalStyle,
    Wrapper,
    Head1,
    MenuWrapper,
    AlgorithmsWrapper,
    CodeAreaWrapper,
    ThemeBarWrapper,
    Footer
} from './styles';
import Menu from '../Menu';
import ThemeBar from '../Theme';

export function getRandomAlgorithmKey(): string {
    return Array.from(algorithms)[random(0, algorithms.size - 1)][0];
}

const Algorithms: FunctionComponent = () => {
    const {params: {themeKey, algorithmKey}} = useRouteMatch<Params>();
    const {push} = useHistory();
    const [theme, applyTheme] = useState<Theme>(defaultTheme);

    if (algorithms.has(algorithmKey) && ThemeKeys.includes(themeKey)) {
        const {name, code} = algorithms.get(algorithmKey) as Code;
        return <Wrapper>
            <AlgorithmsWrapper>
                <GlobalStyle {...theme}/>
                <CodeAreaWrapper>
                    <Head1 {...theme}>{name}<sup> with <span>{themeKey}</span></sup></Head1>
                    <CodeArea {...{themeKey, code, applyTheme}}/>
                </CodeAreaWrapper>
                <MenuWrapper>
                    <Menu {...theme}/>
                </MenuWrapper>
                <ThemeBarWrapper>
                    <ThemeBar {...theme}/>
                </ThemeBarWrapper>
            </AlgorithmsWrapper>
            <Footer {...theme}>
                <a href="/">Sorting Animation {version}</a>
                &nbsp;|&nbsp;
                <a href="https://github.com/fang-lin/sorting-animation" target="_blank"
                    rel="noopener noreferrer">GitHub</a>
                &nbsp;|&nbsp;
                <a href="#">Lin Fang in {(new Date()).getFullYear()}</a>
                &nbsp;|&nbsp;
                <a href="https://www.plotter.fun" target="_blank"
                    rel="noopener noreferrer">plotter.fun</a>
            </Footer>
        </Wrapper>;
    }
    push('/');
    return null;
};

export default Algorithms;


export interface Params {
    themeKey: ThemeKey;
    algorithmKey: string;
}