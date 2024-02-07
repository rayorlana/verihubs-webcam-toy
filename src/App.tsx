import { useState } from 'react';
import LandingPage from './modules/LandingPage';
import WebcamStage from './modules/WebcamStage';

export const App = () => {
  const [showWebcam, setShowWebcam] = useState(false);
  const [isPermissionError, setIsPermissionError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleNavToLandingPage = () => {
    setShowWebcam(false);
  };

  const handleRequestShowWebcam = async () => {
    try {
      setIsLoading(true);
      await navigator.mediaDevices.getUserMedia({ video: true });
      setShowWebcam(true);
      setIsPermissionError(false);
    } catch (error) {
      setIsPermissionError(true);
      setShowWebcam(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex h-full w-full flex-1 flex-col bg-gray-200">
      <header className="fixed left-0 top-0 z-50 flex h-[50px] w-full items-center bg-black/40 px-4 py-2.5 backdrop-blur-md">
        <button className="appearance-none" onClick={handleNavToLandingPage}>
          <h1 className="text-xl font-semibold text-white">
            📸 🧸 Webcam Toy<span className="align-super text-base font-light text-white/60">®</span>
          </h1>
        </button>
      </header>
      <main className="relative flex h-full w-full flex-1 flex-col overflow-hidden pt-[50px]">
        {isLoading ? (
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">Loading...</div>
        ) : (
          <>{showWebcam ? <WebcamStage /> : <LandingPage onRequestShowWebcam={handleRequestShowWebcam} isPermissionError={isPermissionError} />}</>
        )}
      </main>
    </div>
  );
};

export default App;
