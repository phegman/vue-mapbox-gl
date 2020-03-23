import ControlOptions from './control-options.interface';
export default interface FullscreenControlOptions extends ControlOptions {
    options: {
        container?: HTMLElement | null;
    };
}
