import React, {FunctionComponent, useEffect, useRef, useState} from 'react';
import debounce from 'lodash/debounce';
import {Theme} from '../Theme';
import {CanvasStage, CanvasWrapper} from './styles';
import {Executor} from '../Algorithms/codes';
import {deviceRatio, animationPlayer, Size} from './functions';

interface CanvasProps {
    theme: Theme;
    executor: Executor;
}

const Canvas: FunctionComponent<CanvasProps> = ({theme, executor}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [size, setSize] = useState<Size>([0, 0]);
    const [animationId, setAnimationId] = useState<number>(NaN);

    const onResizing = debounce(() => {
        if (canvasRef.current) {
            const {width, height} = canvasRef.current.getBoundingClientRect();
            setSize([width * deviceRatio, height * deviceRatio]);
        }
    }, 200);

    useEffect(() => {
        window.addEventListener('resize', onResizing);
        return () => {
            window.removeEventListener('resize', onResizing);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (canvasRef.current) {
            clearInterval(animationId);
            setAnimationId(animationPlayer(canvasRef.current.getContext('2d'), size, theme, executor));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [size, theme.themeKey]);

    useEffect(() => {
        onResizing();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [executor]);

    return <CanvasWrapper>
        <CanvasStage ref={canvasRef} width={size[0]} height={size[1]}/>
    </CanvasWrapper>;
};

export default Canvas;