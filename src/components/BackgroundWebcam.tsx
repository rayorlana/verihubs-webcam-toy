import { useEffect, useRef } from 'react';

const BackgroundWebcam = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const loadVideoCamera = async () => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      const video = document.createElement('video');
      video.srcObject = stream;
      video.play();
      video.classList.add('-scale-x-100');

      const drawVideo = () => {
        if (video && ctx) {
          ctx.drawImage(video, 0, 0, 40, 40);
          requestAnimationFrame(drawVideo);
        }
      };

      drawVideo();
    }
  };

  useEffect(() => {
    if (canvasRef.current) {
      if (canvasRef.current) {
        loadVideoCamera();
      }
    }
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" width={4} height={4} />;
};

export default BackgroundWebcam;
