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
                    this.audioPlayer.play(frame, this.speed);
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

export class Audio {
    public start;
    public stop;

    constructor() {
        const audioContext = new AudioContext();
        const oscillator = audioContext.createOscillator();
        const gain = audioContext.createGain();

        oscillator.type = 'sine';
        oscillator.frequency.value = 500;
        oscillator.type = 'sine';
        oscillator.connect(gain);
        gain.connect(audioContext.destination);

        this.start = () => oscillator.start();
        this.stop = () => oscillator.stop();
    }
}

export class AudioPlayer {
    public isEnabled = false;
    private audioContext: AudioContext;
    private gain: GainNode;

    constructor() {
        this.audioContext = new AudioContext();
        this.gain = this.audioContext.createGain();
        this.gain.connect(this.audioContext.destination);
    }

    play(frame: Frame, duration: number) {
        if (this.isEnabled) {
            if (frame.swap) {
                const oscillator = this.audioContext.createOscillator();

                oscillator.type = 'sawtooth';
                oscillator.frequency.value = frame.swap[0] * 10;
                oscillator.connect(this.gain);


                oscillator.start();
                setTimeout(() => {
                    oscillator.stop();
                }, duration);
            } else if (frame.comparing) {
                const oscillator = this.audioContext.createOscillator();

                oscillator.type = 'sine';
                oscillator.frequency.value = frame.comparing[0] * 10;
                oscillator.connect(this.gain);

                oscillator.start();
                setTimeout(() => {
                    oscillator.stop();
                }, duration);
            }
        }
    }
}
