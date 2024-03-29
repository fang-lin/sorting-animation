import React, {FunctionComponent} from 'react';
import {Theme} from '../Theme';
import {FooterWrapper} from './styles';
import {version} from '../../../package.json';

const Footer: FunctionComponent<Theme> = (theme) => {
    return <FooterWrapper {...theme}>
        <a href="/">algoRYTHM {version}</a>
        &nbsp;|&nbsp;
        <a href="https://github.com/fang-lin/sorting-animation" target="_blank"
            rel="noopener noreferrer">GitHub</a>
        &nbsp;|&nbsp;
        <a href="https://www.fanglin.me/" target="_blank"
            rel="noopener noreferrer">Lin Fang in {(new Date()).getFullYear()}</a>
        &nbsp;|&nbsp;
        <a href="https://plotter.fanglin.me" target="_blank"
            rel="noopener noreferrer">Function Plotter</a>
        &nbsp;|&nbsp;
        <a href="https://game-of-life.fanglin.me/" target="_blank"
            rel="noopener noreferrer">Game of Life</a>
    </FooterWrapper>;
};

export default Footer;
