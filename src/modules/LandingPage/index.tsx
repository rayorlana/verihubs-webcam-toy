import { FaGithub } from 'react-icons/fa';
import { FiChevronRight } from 'react-icons/fi';
import { GITHUB_REPO_URL } from '../../utils/constants';

interface Props {
  isPermissionError: boolean;
  onRequestShowWebcam: () => void;
}

const LandingPage: React.FC<Props> = ({ isPermissionError, onRequestShowWebcam }) => {
  return (
    <div className="flex flex-1 flex-col items-center">
      <div className="mt-28 flex flex-1 flex-col items-center">
        <h2 className="text-center text-5xl font-extrabold uppercase">
          <div className="text-primary-gradient">Webcam Toy</div>
          <div className="">📸 🧸</div>
        </h2>
        <div className="mt-2.5 text-xl">Take selfies with various fun effects!</div>
        <button
          onClick={onRequestShowWebcam}
          className="bg-primary-gradient mt-5 flex w-auto items-center rounded text-white shadow-sm transition-shadow hover:shadow-xl active:shadow-xl"
        >
          <div className="flex h-full items-center justify-center border-r-[0.5px] border-r-purple-900 p-3">
            <FiChevronRight size={28} />
          </div>
          <div className="flex-1 select-none p-3 text-xl font-semibold">Ready? Smile!</div>
        </button>
        {!!isPermissionError && (
          <div className="mt-5 text-center">
            <div>Please enable camera access in your web browser's settings.</div>
            <div>Camera access denied</div>
          </div>
        )}
      </div>
      <a href={GITHUB_REPO_URL} target="_blank" rel="noopener noreferrer" className="mb-5 mr-5 self-end" aria-label="Github">
        <FaGithub size={30} />
      </a>
    </div>
  );
};

export default LandingPage;
