import { useId, useState } from 'react';
import { FiCamera, FiChevronLeft, FiChevronRight, FiSettings } from 'react-icons/fi';
import { Popover } from '@headlessui/react';
import BackgroundWebcam from '../../components/BackgroundWebcam';
import { WEBCAM_EFFECTS } from '../../utils/constants';
import Webcam from '../../components/Webcam';
import { WebcamEffect } from '../../utils/types';

const WebcamStage = () => {
  const [currentEffectIndex, setCurrentEffectIndex] = useState<number>(0);
  // mirroring of the webcam image. captured webcam image is reversed by default(false), default state val is true, because normally we expect the image to be mirrored.
  const [mirrored, setMirrored] = useState(true);
  const [square, setSquare] = useState(false);
  const activeWebcamEffect: WebcamEffect = WEBCAM_EFFECTS[currentEffectIndex];
  const canvasId = useId();

  const handleToggleSquare = () => {
    setSquare(!square);
  };

  const handleToggleMirrored = () => {
    setMirrored(!mirrored);
  };

  const handlePrevEffect = () => {
    setCurrentEffectIndex(currentEffectIndex === 0 ? WEBCAM_EFFECTS.length - 1 : currentEffectIndex - 1);
  };

  const handleNextEffect = () => {
    setCurrentEffectIndex(currentEffectIndex === WEBCAM_EFFECTS.length - 1 ? 0 : currentEffectIndex + 1);
  };

  const handleCaptureImage = () => {
    const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    if (canvas) {
      const downloadLink = document.createElement('a');
      downloadLink.href = canvas.toDataURL('image/jpg');
      downloadLink.download = 'verihubs-webcam-toy.jpg';
      downloadLink.click();
    }
  };

  const renderActions = () => {
    return (
      <div className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 justify-around gap-x-5 text-center">
        <Popover className="-left-[30%] hidden md:absolute md:block">
          <Popover.Button className="relative h-[60px] rounded bg-pink-700 p-4 text-white active:top-0.5 active:shadow-inner">
            <FiSettings size={24} aria-label="Settings" />
          </Popover.Button>
          <Popover.Panel className="absolute -top-40 left-1/2 flex h-[150px] -translate-x-1/2 flex-col gap-y-2.5 rounded-2xl bg-gray-900/65 p-4 font-medium text-white backdrop-blur-sm">
            <label className="flex select-none items-center gap-x-2.5">
              <input type="checkbox" checked={mirrored} onChange={handleToggleMirrored} className="h-6 w-6 accent-pink-700" />
              Mirror
            </label>
            <label className="flex select-none items-center gap-x-2.5">
              <input type="checkbox" checked={square} onChange={handleToggleSquare} className="h-6 w-6 accent-pink-700" />
              Square
            </label>
          </Popover.Panel>
        </Popover>
        <div className="flex h-[60px] gap-x-2.5">
          <button className="relative rounded bg-pink-700 p-4 text-white shadow-md active:top-0.5 active:shadow-inner" onClick={handlePrevEffect}>
            <FiChevronLeft size={24} aria-label="Prev Effect" />
          </button>
          <div className="hidden w-[250px] rounded bg-black/35 p-4 text-lg font-semibold capitalize text-white shadow-md backdrop-blur-sm md:block">
            {activeWebcamEffect}
          </div>
          <button className="relative rounded bg-pink-700 p-4 text-white shadow-md active:top-0.5 active:shadow-inner" onClick={handleNextEffect}>
            <FiChevronRight size={24} aria-label="Next Effect" />
          </button>
        </div>
        <button
          className="relative flex h-[60px] w-[100px] items-center justify-center rounded bg-pink-700 p-4 text-white shadow-md active:top-0.5 active:shadow-inner md:absolute md:-right-[35%]"
          onClick={handleCaptureImage}
        >
          <FiCamera size={24} aria-label="Capture" />
        </button>
      </div>
    );
  };

  return (
    <>
      <BackgroundWebcam />
      <div className="flex-1">
        <Webcam id={canvasId} mirrored={mirrored} square={square} effect={activeWebcamEffect} />
        {renderActions()}
      </div>
    </>
  );
};

export default WebcamStage;
