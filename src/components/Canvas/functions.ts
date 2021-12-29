import {Theme} from '../Theme';
import {Executor, Frame} from '../Algorithms/codes';
import range from 'lodash/range';
import shuffle from 'lodash/shuffle';

export type Size = [number, number];

export const deviceRatio: number = ((): number => window.devicePixelRatio || 1)();

function rgba(rgb: string, alpha = .2): string {
    return rgb.replace('rgb', 'rgba').replace(')', `, ${alpha})`);
}

export function collectFrames(disorderedList: Array<number>, executor: Executor): Array<Frame> {
    const frames: Array<Frame> = [];
    executor(disorderedList, (_) => frames.push(JSON.parse(JSON.stringify(_))));
    return frames;
}

export class AnimationPlayer {
    private _frames: Array<Frame> = [];
    private _executor: Executor = () => undefined;
    private context: CanvasRenderingContext2D;
    private _size?: Size;
    private _theme?: Theme;
    private playId = NaN;
    private left = 0;
    private barUnit = 0;
    private barCount = 0;
    private barGap = 0;
    private barWidth = 0;

    public speed = 100;

    constructor(context: CanvasRenderingContext2D) {
        this.context = context;
    }

    set size(size: Size) {
        this._size = size;
        this.getLayout();
    }

    set executor(executor: Executor) {
        this._executor = executor;
        if (this._frames[0]) {
            this._frames = collectFrames(this._frames[0].list, executor);
        } else {
            this._frames = collectFrames(shuffle(range(1, this.barCount + 1)), executor);
        }
        this.play();
    }

    set theme(theme: Theme) {
        this._theme = theme;
    }

    drawFrame(frame: Frame): void {
        if (this._size && this._theme) {
            const {keywordColor, variableColor, defColor} = this._theme;
            this.context.clearRect(0, 0, this._size[0], this._size[1]);
            frame.list.forEach((value, i) => {
                if (frame.swap?.includes(i)) {
                    this.context.fillStyle = rgba(keywordColor, .3);
                } else if (frame.comparing?.includes(i)) {
                    this.context.fillStyle = rgba(variableColor, .3);
                } else {
                    this.context.fillStyle = rgba(defColor);
                }
                if (this._size)
                    this.context.fillRect(
                        this.left + this.barGap / 2 + (this.barWidth + this.barGap) * i,
                        this._size[1] - this.barUnit * value,
                        this.barWidth,
                        this.barUnit * value
                    );
            });
        }
    }

    private getLayout(): void {
        this.barWidth = 16 * deviceRatio;
        this.barGap = deviceRatio;
        if (this._size) {
            this.barCount = (this._size[0] / (this.barWidth + this.barGap)) | 0;
            this.barUnit = (this._size[1] / this.barCount) | 0;
            this.left = (this._size[0] - this.barCount * (this.barWidth + this.barGap)) / 2;
        }
    }

    _nextFrame(): void {
        this.playId = window.setTimeout(() => {
            const frame = this._frames.shift();
            if (frame) {
                this.drawFrame(frame);
                this._nextFrame();
            } else {
                this.play();
            }
        }, this.speed);
    }

    play(): void {
        clearTimeout(this.playId);
        if (this._frames.length === 0) {
            this._frames = collectFrames(shuffle(range(1, this.barCount + 1)), this._executor);
        }
        this._nextFrame();
    }

    replay():void {
        this._frames = [];
        this.play();
    }
}