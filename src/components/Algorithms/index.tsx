import React, {FunctionComponent, useState} from 'react';
import {useHistory, useRouteMatch} from 'react-router-dom';
import random from 'lodash/random';
import algorithms, {Code} from './codes';
import CodeArea from '../CodeArea';
import {ThemeKeys, defaultTheme, Theme, ThemeKey} from '../Theme';
import {GlobalStyle, Head3} from './styles';
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
        return <div>
            <GlobalStyle {...theme}/>
            <Menu {...theme}/>
            <Head3  {...theme}>{name} meeting {themeKey}</Head3>
            <CodeArea {...{themeKey, code, applyTheme}}/>
            <footer>
                <Head3 {...theme}>Themes</Head3>
                <ThemeBar {...theme}/>
            </footer>
        </div>;
    }
    push('/');
    return null;
};

export default Algorithms;


export interface Params {
    themeKey: ThemeKey;
    algorithmKey: string;
}