import * as binaryInsert from './binaryInsert';
import * as bubble from './bubble';
import * as heap from './heap';
import * as insert from './insert';
import * as merge from './merge';
import * as quick from './quick';
import * as select from './select';
import * as shaker from './shaker';
import * as shell from './shell';

export interface Frame {
    list: Array<number>,
    comparing?: Array<number>,
    swap?: Array<number>
}

export interface Executor {
    (list: Array<number>, collector: (frame: Frame) => void): void;
}

export interface Code {
    code: string;
    name: string;
    executor: Executor;
}

const algorithms = new Map<string, Code>([
    ['binary-insert', binaryInsert],
    ['bubble', bubble],
    ['heap', heap],
    ['insert', insert],
    ['merge', merge],
    ['quick', quick],
    ['select', select],
    ['shaker', shaker],
    ['shell', shell],
]);


export default algorithms;