import { FilterWebcamEffect, TextureWebcamEffect } from './constants';
import { FilterEffect, TextureEffect, WebcamEffect } from './types';

export const isTextureEffect = (effect: WebcamEffect) => TextureWebcamEffect.includes(effect as TextureEffect);

export const applyTextureEffect = (imageData: ImageData, effect: TextureEffect): ImageData => {
  let moddedImageData = imageData;
  switch (effect) {
    case 'red': {
      for (let i = 0; i < imageData.data.length; i += 4) {
        moddedImageData.data[i] = imageData.data[i];
        moddedImageData.data[i + 1] = 0;
        moddedImageData.data[i + 2] = 0;
      }
      break;
    }
    case 'green':
      for (let i = 0; i < imageData.data.length; i += 4) {
        moddedImageData.data[i] = 0;
        moddedImageData.data[i + 1] = imageData.data[i + 1];
        moddedImageData.data[i + 2] = 0;
      }
      break;
    case 'blue':
      for (let i = 0; i < imageData.data.length; i += 4) {
        moddedImageData.data[i] = 0;
        moddedImageData.data[i + 1] = 0;
        moddedImageData.data[i + 2] = imageData.data[i + 2];
      }
      break;
    case 'grayscale':
      for (let i = 0; i < imageData.data.length; i += 4) {
        const grayscale = (imageData.data[i] + imageData.data[i + 1] + imageData.data[i + 2]) / 3;
        moddedImageData.data[i] = grayscale;
        moddedImageData.data[i + 1] = grayscale;
        moddedImageData.data[i + 2] = grayscale;
      }
      break;
    default:
      break;
  }
  return moddedImageData;
};

export const isFilterEffect = (effect: WebcamEffect) => FilterWebcamEffect.includes(effect as FilterEffect);
