import styled from 'styled-components';
import {Theme} from '../Theme';

export const OperationBarWrapper = styled.div`
    padding: 20px 30px;
`;

export const SpeedBarList = styled.ul`
    list-style: none;
    display: flex;
    gap: 30px;
    margin: 0;
    padding: 0;
`;

export const SpeedBarItem = styled.li<Theme>`
    a {
    cursor: pointer;
    display: block;
    svg {
        display: block;
        width: 32px;
        height: 32px;Algorithms/index.tsx
        fill: ${({codeColor}) => codeColor};
    }
    &.active {
        svg {
            fill: ${({operatorColor}) => operatorColor};
        }
    }
    }
`;
