import styled from 'styled-components';
import {Theme} from '../Theme';

export const List = styled.ul<Theme>`
    list-style: none;
    padding: 0;
    margin: 0;
    width: 180px;
    //text-align: right;
`;
export const ListItem = styled.li<Theme>`
    display: inline-block;
    margin: 3px;
    font-size: 12px;
    a {
      text-decoration: none;
      color: ${({codeColor}) => codeColor};
      &:hover {
        text-decoration: underline;
      }
      &.active{
        color: ${({operatorColor}) => operatorColor};
        text-decoration: underline;
      }
    }
`;