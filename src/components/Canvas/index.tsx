import React, {FunctionComponent, useEffect, useRef, useState} from 'react';
import debounce from 'lodash/debounce';
import shuffle from 'lodash/shuffle';
import range from 'lodash/range';
import {useRouteMatch} from 'react-router-dom';
import {Params} from '../Algorithms';
import {Theme} from '../Theme';
import {CanvasWrapper, CanvasStage} from './styles';

// interface Frame {
//     list: Array<number>;
//     highlightIndexes: Array<number>
// }
//
// interface CanvasProps {
//     frames: Array<Frame>;
// }

type Size = [number, number];

const deviceRatio: number = ((): number => window.devicePixelRatio || 1)();

function rgba(rgb: string): string {
    return rgb.replace('rgb', 'rgba').replace(')', ', .15)');
}

function draw(context: CanvasRenderingContext2D | null, size: Size, count: number, theme: Theme) {
    if (context) {
        const unit = [(size[0] / count) | 0, (size[1] / count) | 0];
        context.clearRect(0, 0, size[0], size[1]);
        context.fillStyle = rgba(theme.defColor);
        shuffle(range(0, count)).forEach((value, i) => {
            context.fillRect(
                unit[0] * i + deviceRatio,
                size[1] - unit[1] * value,
                unit[0] - deviceRatio,
                unit[1] * value
            );
        });
    }
}

const Canvas: FunctionComponent<Theme> = (theme) => {
    const {params: {algorithmKey}} = useRouteMatch<Params>();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [size, setSize] = useState<Size>([0, 0]);

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
            draw(canvasRef.current.getContext('2d'), size, 100, theme);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [size, theme.themeKey]);

    useEffect(() => {
        onResizing();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [algorithmKey]);

    return <CanvasWrapper>
        <CanvasStage ref={canvasRef} width={size[0]} height={size[1]}/>
    </CanvasWrapper>;
};

export default Canvas;