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
    public speed = 100;
    public audioPlayer?: AudioPlayer;
    private _frames: Array<Frame> = [];
    private context: CanvasRenderingContext2D;
    private playId = NaN;
    private left = 0;
    private barUnit = 0;
    private barCount = 0;
    private barGap = 0;
    private barWidth = 0;

    constructor(context: CanvasRenderingContext2D) {
        this.context = context;
    }

    private _executor: Executor = () => undefined;

    set executor(executor: Executor) {
        this._executor = executor;
        if (this._frames[0]) {
            this._frames = collectFrames(this._frames[0].list, executor);
        } else {
            this._frames = collectFrames(shuffle(range(1, this.barCount + 1)), executor);
        }
        this.play();
    }

    private _size?: Size;

    set size(size: Size) {
        this._size = size;
        this.getLayout();
    }

    private _theme?: Theme;

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

    _nextFrame(): void {
        this.playId = window.setTimeout(() => {
            const frame = this._frames.shift();
            if (frame) {
                if (this.audioPlayer) {
                    this.audioPlayer.play(frame, this.speed, this.barCount);
                }
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

    replay(): void {
        this._frames = [];
        this.play();
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
}

export class AudioPlayer {
    public isEnabled = false;
    private audioContext: AudioContext;

    constructor() {
        this.audioContext = new AudioContext();
    }

    private static frequency(value: number, upper: number) {
        return 30 + (4200 - 30) * (value / upper);
    }

    play(frame: Frame, duration: number, barCount: number): void {
        if (this.isEnabled) {
            const timeSlice = duration < 100 ? .1 : .5;
            if (frame.swap) {
                frame.swap?.forEach((swap, index) => {
                    this.beep('square', AudioPlayer.frequency(swap, barCount), index * timeSlice, (index + 1) * timeSlice, .1);
                });
            } else if (frame.comparing) {
                frame.comparing?.forEach((comparing, index) => {
                    this.beep('sine', AudioPlayer.frequency(comparing, barCount), index * timeSlice, (index + 1) * timeSlice, .03);
                });
            }
        }
    }

    private beep(type: OscillatorType, frequency: number, start: number, stop: number, value: number): void {

        const oscillator = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();
        gain.connect(this.audioContext.destination);

        oscillator.type = type;
        oscillator.frequency.value = frequency;

        oscillator.connect(gain);

        oscillator.start(this.audioContext.currentTime + start);
        oscillator.stop(this.audioContext.currentTime + stop);

        gain.gain.setValueAtTime(value, this.audioContext.currentTime + start);
        gain.gain.exponentialRampToValueAtTime(0.00001, this.audioContext.currentTime + stop);
    }
}
