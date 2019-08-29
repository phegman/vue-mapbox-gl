import ControlOptions from './control-options.interface'
import { PositionOptions, FitBoundsOptions } from 'mapbox-gl'

export default interface GeolocateControlOptions extends ControlOptions {
  options?: {
    positionOptions?: PositionOptions
    fitBoundsOptions?: FitBoundsOptions
    trackUserLocation?: boolean
    showUserLocation?: boolean
  }
}
