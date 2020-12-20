import React, {Dispatch, FunctionComponent, SetStateAction} from 'react';
import {Wrapper, Button} from './styles';
import {Theme} from '../Theme';
import Shuffle from '../../icons/shuffle.svg';

interface ShuffleButtonProps {
    theme: Theme;
    triggerShuffle: Dispatch<SetStateAction<number>>;
}

const ShuffleButton: FunctionComponent<ShuffleButtonProps> = ({theme, triggerShuffle}) => {
    return <Wrapper><Button onClick={({timeStamp}) => triggerShuffle(timeStamp)} {...theme}><Shuffle/></Button></Wrapper>;
};

export default ShuffleButton;