import {Theme} from '../Theme';
import {Executor, Frame} from '../Algorithms/codes';
import shuffle from 'lodash/shuffle';
import range from 'lodash/range';

export type Size = [number, number];

export interface Layout {
    barWidth: number;
    barGap: number;
    barUnit: number;
    barCount: number;
    left: number;
    size: Size;
}

export const deviceRatio: number = ((): number => window.devicePixelRatio || 1)();

function rgba(rgb: string, alpha = .2): string {
    return rgb.replace('rgb', 'rgba').replace(')', `, ${alpha})`);
}

function collectFrames(list: Array<number>, executor: Executor): Array<Frame> {
    const frames: Array<Frame> = [];
    executor(list, (_) => frames.push(JSON.parse(JSON.stringify(_))));
    return frames;
}

function drawFrame(context: CanvasRenderingContext2D, frame: Frame, theme: Theme, layout: Layout) {
    const {size, left, barGap, barWidth, barUnit} = layout;
    context.clearRect(0, 0, size[0], size[1]);

    frame.list.forEach((value, i) => {
        if (frame.swap?.includes(i)) {
            context.fillStyle = rgba(theme.keywordColor, .3);
        } else if (frame.comparing?.includes(i)) {
            context.fillStyle = rgba(theme.variableColor, .3);
        } else {
            context.fillStyle = rgba(theme.defColor);
        }
        context.fillRect(
            left + barGap / 2 + (barWidth + barGap) * i,
            size[1] - barUnit * value,
            barWidth,
            barUnit * value
        );
    });
}

function getLayout(size: Size): Layout {
    const barWidth = 16 * deviceRatio;
    const barGap = deviceRatio;
    const barCount = (size[0] / (barWidth + barGap)) | 0;
    const barUnit = (size[1] / barCount) | 0;
    const left = (size[0] - barCount * (barWidth + barGap)) / 2;

    return {
        barWidth,
        barGap,
        barUnit,
        barCount,
        left,
        size
    };
}

export function animationPlayer(context: CanvasRenderingContext2D | null, size: Size, theme: Theme, executor: Executor): number {
    if (context) {
        const layout = getLayout(size);
        const frames = collectFrames(shuffle(range(1, layout.barCount + 1)), executor);
        let i = 0;
        const animationId = setInterval(() => {
            if (frames[i]) {
                drawFrame(context, frames[i], theme, layout);
            } else {
                clearInterval(animationId);
            }
            i++;
        }, 0);

        return animationId;
    }
    return NaN;
}