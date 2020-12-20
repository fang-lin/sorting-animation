import styled from 'styled-components';
import {Theme} from '../Theme';

export const Wrapper = styled.div`
    padding: 20px 30px;
`;

export const Button = styled.span<Theme>`
    cursor: pointer;
    display: block;
    svg {
        display: block;
        width: 32px;
        height: 32px;
        fill: ${({codeColor}) => codeColor};
    }
`;
