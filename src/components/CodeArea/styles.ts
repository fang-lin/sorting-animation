import {createGlobalStyle} from 'styled-components';

export const CodeMirrorStyle = createGlobalStyle`
    .CodeMirror {
      font-family: 'Source Code Pro', monospace;
      font-size: 14px !important;
      background-image: none !important;
    }
    
    .CodeMirror-line {
      line-height: 18px !important;
    }
`;