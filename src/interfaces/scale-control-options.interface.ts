import ControlOptions from './control-options.interface'

export default interface ScaleControlOptions extends ControlOptions {
  options: {
    maxWidth?: number
    unit?: 'imperial' | 'metric' | 'nautical'
  }
}
