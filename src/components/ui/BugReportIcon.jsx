import { useNavigate } from 'react-router-dom';

const BugReportIcon = () => {
  const navigate = useNavigate();

  return (
    <div
      className="fixed left-4 bottom-4 z-50 flex items-center gap-2 bg-white shadow-lg rounded-full px-4 py-2 cursor-pointer hover:bg-red-100 transition-all duration-200"
      onClick={() => navigate('/report-bug', { state: { from: window.location.pathname } })}
      aria-label="Report a bug"
    >
      <span className="flex items-center justify-center w-8 h-8 bg-red-500 text-white rounded-full text-lg font-bold animate-pulse">
        !
      </span>
      <span className="text-sm font-medium text-gray-700 hidden sm:block">Report a Bug!</span>
    </div>
  );
};

export default BugReportIcon;
