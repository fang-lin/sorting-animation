import styled, {createGlobalStyle} from 'styled-components';
import {Theme} from '../Theme';

export const GlobalStyle = createGlobalStyle<Theme>`
    html, body, #root {
        background: ${({background}) => background};
        transition: background 1s;
        height: 100%;
    }
`;

export const Head1 = styled.h1<Theme>`
    margin: 0 0 30px 0;
    font-size: 42px;
    color: ${({variableColor}) => variableColor};
`;
export const Head3 = styled.h3<Theme>`
    color: ${({variableColor}) => variableColor};
`;

export const Wrapper = styled.section`
    display: flex;
    flex-direction: column;
    max-width: 1280px;
    justify-content: space-between;
    margin: 0 auto;
    height: 100%;
    box-sizing: border-box;
`;

export const AlgorithmsWrapper = styled.div`
    display: flex;
    flex: 1;
    justify-content: space-between;
    padding: 30px 0;
`;

export const CodeAreaWrapper = styled.div`
    flex: 1;
`;

export const MenuWrapper = styled.div`
    margin: 0 30px;
`;

export const ThemeBarWrapper = styled.div`
`;

export const Footer = styled.footer<Theme>`
    padding: 20px 0;
    font-size: 12px;
    color: ${({numberColor}) => numberColor};
    a {
        color: ${({numberColor}) => numberColor};
        text-decoration: none;
        &:hover {
            text-decoration: underline;
        }
    
    }
`;