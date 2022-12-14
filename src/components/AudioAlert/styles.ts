import styled from 'styled-components';
import {Theme} from '../Theme';
import {rgba} from '../../functions';

export const AudioAlertBackground = styled.div<Theme>`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: ${({backgroundColor}) => rgba(backgroundColor, .75)};
`;

export const AudioAlterWrapper = styled.h2<Theme>`
  padding: 20px;
  font-size: 12px;
  line-height: 20px;
  background: ${({defColor}) => defColor};
  color: ${({keywordColor}) => keywordColor};
  z-index: 3;
  display: flex;
  gap: 20px;
  align-items: center;
  border: solid 5px transparent;
  box-shadow: 0 3px 15px 3px rgba(0, 0, 0, .5);
  user-select: none;

  :active {
    border-color: ${({keywordColor}) => keywordColor};
  }

  svg {
    display: block;
    width: 64px;
    height: 64px;
    fill: ${({keywordColor}) => keywordColor};
  }
`;

export const PlayButton = styled.span<Theme>`
  font-size: 64px;
  font-weight: bold;
  color: ${({keywordColor}) => keywordColor};
`;

export const ChangeTheme = styled.h3<Theme>`
  font-size: 24px;
  font-weight: bold;
  text-transform: uppercase;

  a {
    color: ${({keywordColor}) => keywordColor};
    text-decoration: none;

    :hover, :active {
      text-decoration: underline;
    }
  }
`;
