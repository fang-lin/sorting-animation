import styled from 'styled-components';
import {Theme} from '../Theme';

export const List = styled.ul<Theme>`
    color: ${({codeColor}) => codeColor};
`;
export const ListItem = styled.li<Theme>`
    a {
      color: ${({defColor}) => defColor};
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
      &.active {
        color: ${({keywordColor}) => keywordColor};
        text-decoration: none;
      }
    }
`;