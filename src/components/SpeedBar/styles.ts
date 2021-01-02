import styled from 'styled-components';
import {Theme} from '../Theme';

export const OperationBarWrapper = styled.div`
    padding: 10px 25px;
`;

export const SpeedBarList = styled.ul`
    list-style: none;
    display: flex;
    margin: 0 -10px;
    padding: 0;
`;

export const SpeedBarItem = styled.li<Theme>`
    a {    
        margin: 0 5px;
        cursor: pointer;
        display: block;
        border-radius: 26px;
        padding: 10px;
        svg {
            display: block;
            width: 32px;
            height: 32px;
            fill: ${({keywordColor}) => keywordColor};
        }
        &.active {
            background: ${({defColor}) => defColor};
        }
    }
`;
