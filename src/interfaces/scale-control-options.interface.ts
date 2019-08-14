import ControlOptions from './control-options.interface'

export default interface ScaleControl extends ControlOptions {
  options: {
    maxWidth?: number
    unit?: 'imperial' | 'metric' | 'nautical'
  }
}
