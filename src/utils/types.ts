import { WEBCAM_EFFECTS } from './constants';

export type WebcamEffect = (typeof WEBCAM_EFFECTS)[number];

/** effects that alters camera rendering */
export type CameraEffect = 'normal' | 'upside down' | 'split screen' | 'quad cam';

/** effects that alters textures/colors */
export type TextureEffect = 'red' | 'green' | 'blue' | 'grayscale';

/** built-in filter settings from canvas 2d context */
export type FilterEffect = 'x-ray';
