import * as binaryInsert from './binaryInsert';
import * as bubble from './bubble';
import * as heap from './heap';
import * as insert from './insert';
import * as merge from './merge';
import * as quick from './quick';
import * as select from './select';
import * as shaker from './shaker';
import * as shell from './shell';

export interface Code {
    code: string;
    name: string;
}

const algorithms = new Map<string, Code>([
    ['binaryInsert', binaryInsert],
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