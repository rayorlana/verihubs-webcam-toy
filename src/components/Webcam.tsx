import { useEffect, useId, useRef } from 'react';
import { MAX_CANVAS_HEIGHT, MAX_CANVAS_WIDTH } from '../utils/constants';
import { applyTextureEffect, isFilterEffect, isTextureEffect } from '../utils/webcam';
import { FilterEffect, TextureEffect, WebcamEffect } from '../utils/types';

let animationFrameId: number;

interface Props {
  id?: string;
  mirrored?: boolean;
  square?: boolean;
  effect: WebcamEffect;
}

const Webcam: React.FC<Props> = ({ id, mirrored = true, square = false, effect = 'normal' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const aspectRatio = 4 / 3;
  const canvasWidth = MAX_CANVAS_WIDTH;
  const canvasHeight = MAX_CANVAS_HEIGHT;
  const canvasWrapperId = useId();
  const canvasId = id || useId();
  const isTextureWebcamEffect = isTextureEffect(effect);
  const isFilterWebcamEffect = isFilterEffect(effect);

  const loadVideoCamera = async () => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      // willReadFrequently option set to true for performance best practice to render using CPU instead of GPU.
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      // Canvas Resets
      if (ctx) {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        ctx.filter = 'none';
      }
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      const video = document.createElement('video');
      video.srcObject = stream;
      video.play();

      const drawVideo = () => {
        if (video && ctx) {
          // apply Camera WebcamEffect
          switch (effect) {
            case 'upside down': {
              // save default canvas state as restore point
              ctx.drawImage(video, 0, 0, canvasWidth, canvasHeight);
              ctx.save();
              // flip vertically and render canvas
              ctx.translate(0, canvasHeight);
              ctx.scale(1, -1);
              ctx.drawImage(video, 0, 0, canvasWidth, canvasHeight);
              // reset canvas context
              ctx.restore();
              if (!isFilterWebcamEffect) ctx.filter = 'none';
              break;
            }
            case 'quad cam': {
              const segmentWidth = canvasWidth / 2;
              const segmentHeight = canvasHeight / 2;
              for (let row = 0; row < 2; row++) {
                for (let col = 0; col < 2; col++) {
                  const x = col * segmentWidth;
                  const y = row * segmentHeight;
                  ctx.drawImage(video, x, y, segmentWidth, segmentHeight);
                }
              }
              break;
            }
            case 'normal':
            default:
              ctx.drawImage(video, 0, 0, canvasWidth, canvasHeight);
              break;
          }
          // apply Texture WebcamEffect
          if (isTextureWebcamEffect) {
            const imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
            const moddedImageData = applyTextureEffect(imageData, effect as TextureEffect);
            ctx.putImageData(moddedImageData, 0, 0);
          }
          // apply Filter WebcamEffect
          if (isFilterWebcamEffect) {
            switch (effect as FilterEffect) {
              case 'x-ray':
                ctx.filter = 'invert(1)';
            }
          }
          animationFrameId = requestAnimationFrame(drawVideo);
        }
      };

      video.onplay = () => {
        if (ctx) {
          const currentTranslateX = ctx.getTransform().e;
          if (mirrored) {
            if (currentTranslateX !== canvasWidth) {
              ctx?.translate(canvasWidth, 0);
              ctx?.scale(-1, 1);
            }
          } else {
            if (currentTranslateX === canvasWidth) {
              ctx?.scale(-1, 1);
              ctx?.translate(-canvasWidth, 0);
            }
          }
          drawVideo();
        }
      };
    }
  };

  const unloadVideoCamera = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    const tracks = stream.getTracks();
    tracks.forEach(track => {
      stream.removeTrack(track);
      track.stop();
    });
  };

  useEffect(() => {
    const handleResize = () => {
      const canvas = document.getElementById(canvasId);
      const canvasWrapper = document.getElementById(canvasWrapperId);
      const isExceedMaxWidth = window.innerWidth < canvasWidth;
      if (canvas && canvasWrapper) {
        canvas.style.width = isExceedMaxWidth ? `${window.innerWidth}px` : `${window.innerHeight * aspectRatio}px`;
        canvas.style.height = isExceedMaxWidth ? `${window.innerWidth / aspectRatio}px` : `${window.innerHeight}px`;
        canvasWrapper.style.width = square ? canvas.style.height : canvas.style.width;
        canvasWrapper.style.height = canvas.style.height;
      }
    };

    if (canvasRef.current) {
      loadVideoCamera();

      window.addEventListener('resize', handleResize);
      handleResize();
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      unloadVideoCamera();
      cancelAnimationFrame(animationFrameId);
    };
  }, [mirrored, square, effect]);

  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <div id={canvasWrapperId} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden">
        <canvas id={canvasId} ref={canvasRef} width={800} height={600} className="relative left-1/2 -translate-x-1/2" />
      </div>
    </div>
  );
};

export default Webcam;
