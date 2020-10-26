import styled, {createGlobalStyle} from 'styled-components';
import {Theme} from '../Theme';

export const GlobalStyle = createGlobalStyle<Theme>`
    html, body, #root {
        background: ${({background}) => background};
    }
`;

export const Head3 = styled.h3<Theme>`
    color: ${({variableColor}) => variableColor};
`;