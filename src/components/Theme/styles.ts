import styled from 'styled-components';
import {Theme} from '../Theme';

export const List = styled.ul<Theme>`
    color: ${({codeColor}) => codeColor};
    display: flex;
    list-style: none;
    flex-wrap: wrap;
    font-size: 12px;
    justify-content: flex-start;
`;
export const ListItem = styled.li<Theme>`
    margin: 3px;
    a {
      text-decoration: none;
      color: ${({defColor}) => defColor};
      &:hover {
        text-decoration: underline;
      }
      &.active{
        color: ${({keywordColor}) => keywordColor};
        text-decoration: underline;
      }
    }
`;