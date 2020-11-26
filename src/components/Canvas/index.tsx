import React, {FunctionComponent, useEffect, useRef, useState} from 'react';
import debounce from 'lodash/debounce';
import shuffle from 'lodash/shuffle';
import range from 'lodash/range';
import {Theme} from '../Theme';
import {CanvasWrapper, CanvasStage} from './styles';

// interface Frame {
//     list: Array<number>;
//     highlightIndexes: Array<number>
// }

interface CanvasProps {
    // frames: Array<Frame>;
    theme: Theme;
    code: string;
}

type Size = [number, number];

const deviceRatio: number = ((): number => window.devicePixelRatio || 1)();

function rgba(rgb: string): string {
    return rgb.replace('rgb', 'rgba').replace(')', ', .15)');
}

function draw(context: CanvasRenderingContext2D | null, size: Size, theme: Theme) {
    if (context) {
        const barWidth = 16 * deviceRatio;
        const barGap = deviceRatio;
        const barCount = (size[0] / (barWidth + barGap)) | 0;
        const barUnit = (size[1] / barCount) | 0;
        const left = (size[0] - barCount * (barWidth + barGap)) / 2;
        context.clearRect(0, 0, size[0], size[1]);
        context.fillStyle = rgba(theme.defColor);
        shuffle(range(1, barCount + 1)).forEach((value, i) => {
            context.fillRect(
                left + barGap / 2 + (barWidth + barGap) * i,
                size[1] - barUnit * value,
                barWidth,
                barUnit * value
            );
        });
    }
}

const Canvas: FunctionComponent<CanvasProps> = ({theme, code}) => {
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
            draw(canvasRef.current.getContext('2d'), size, theme);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [size, theme.themeKey]);

    useEffect(() => {
        onResizing();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [code]);

    return <CanvasWrapper>
        <CanvasStage ref={canvasRef} width={size[0]} height={size[1]}/>
    </CanvasWrapper>;
};

export default Canvas;