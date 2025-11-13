import { FaBars } from "react-icons/fa";
import { languageOptions } from "../../../utils/Utilities";

const TopBar = ({
    isMobile,
    onMenuClick,
    language,
    handleLanguageChange,
    runCode,
    setIsAiModalOpen
}) => {
    return (
        <div className="flex items-center justify-between bg-[#161b22] rounded-lg px-3 py-2 border border-[#30363d] shrink-0">
            <div className="flex items-center gap-4">
                {isMobile && (
                    <button onClick={onMenuClick} className="p-1 text-neutral-300 hover:text-white">
                        <FaBars size={20} />
                    </button>
                )}

                <div className="relative flex-shrink-0">
                    <select
                        value={language}
                        onChange={handleLanguageChange}
                        className="bg-[#0d1117] text-neutral-200 font-mono text-sm border border-[#30363d] rounded-md px-3 py-1.5 pr-8 appearance-none cursor-pointer"
                    >
                        {languageOptions.map(option => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                    <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-500 pointer-events-none">▼</span>
                </div>
            </div>

            <div className="flex items-center space-x-2">
                <button
                    onClick={() => setIsAiModalOpen(true)}
                    className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold text-sm py-1.5 px-3 rounded-md"
                    title="Generate code with AI"
                >
                    Ask AI
                </button>
                <button
                    onClick={runCode}
                    className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold text-sm py-1.5 px-3 rounded-md"
                >
                    Run
                </button>
            </div>
        </div>
    );
};

export default TopBar;