import ControlOptions from './control-options.interface';
export default interface NavigationControlOptions extends ControlOptions {
    options: {
        showCompass?: boolean;
        showZoom?: boolean;
        visualizePitch?: boolean;
    };
}
