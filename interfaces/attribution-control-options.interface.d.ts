import ControlOptions from './control-options.interface';
export default interface NavigationControlOptions extends ControlOptions {
    options: {
        compact?: boolean;
        customAttribution?: string | string[];
    };
}
