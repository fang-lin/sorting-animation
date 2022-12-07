import styled from 'styled-components';
import {Theme} from '../Theme';

export const Wrapper = styled.div`
    padding: 10px 20px;
`;

export const Button = styled.span<Theme>`
    cursor: pointer;
    display: block;
    padding: 10px;
    svg {
        display: block;
        width: 32px;
        height: 32px;
        fill: ${({keywordColor}) => keywordColor};
    }
`;
