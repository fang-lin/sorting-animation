import styled from 'styled-components';
import {Theme} from '../Theme';

export const List = styled.ul<Theme>`
    color: ${({codeColor}) => codeColor};
    list-style: none;
    padding: 0;
    margin: -20px 0;
    font-weight: 700;
    text-align: right;
`;
export const ListItem = styled.li<Theme>`
    font-size: 24px;
    line-height: 24px;
    margin: 20px 0;
    a {
      text-decoration: none;
      color: ${({keywordColor}) => keywordColor};
      &:hover {
        text-decoration: underline;
      }
      &.active {
        color: ${({defColor}) => defColor};
        text-decoration: none;
      }
    }
`;