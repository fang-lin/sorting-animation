import {UAParser} from 'ua-parser-js';
import algorithms, {AlgorithmKey} from './components/Algorithms/codes';
import random from 'lodash/random';
import {Params} from './components/Algorithms';

export function isMobile(): boolean {
    console.log((new UAParser()).getResult());
    return (new UAParser()).getDevice().type !== undefined;
}

export function getRandomAlgorithmKey(): AlgorithmKey {
    const keys = Object.keys(algorithms);
    return keys[random(0, keys.length - 1)] as AlgorithmKey;
}

export function paramsToLink({themeKey, algorithmKey, speedKey, audioIsEnabledKey}: Params): string {
    return `/${themeKey}/${algorithmKey}/${speedKey}/${audioIsEnabledKey}`;
}

export const deviceRatio: number = ((): number => window.devicePixelRatio || 1)();

export function rgba(rgb: string, alpha = .2): string {
    return rgb.replace('rgb', 'rgba').replace(')', `, ${alpha})`);
}
