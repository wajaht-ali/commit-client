import { FaBars, FaPlay } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";
import { languageOptions } from "../../../utils/Utilities";

const TopBar = ({
    isMobile,
    onMenuClick,
    language,
    handleLanguageChange,
    runCode,
    setIsAiModalOpen
}) => {
    // Get language icon/emoji
    const getLanguageIcon = () => {
        switch (language) {
            case 'python': return '🐍';
            case 'javascript': return '📜';
            case 'cpp': return '⚙️';
            default: return '📝';
        }
    };

    return (
        <div
            className="flex items-center border-b border-gray-700 justify-between px-4 py-2.5"
            style={{ backgroundColor: '#000' }}
        >
            <div className="flex items-center gap-3">
                {isMobile && (
                    <button
                        onClick={onMenuClick}
                        className="p-2 rounded-lg transition-all"
                        style={{ color: '#8b949e' }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#1a2028';
                            e.currentTarget.style.color = '#e6edf3';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                            e.currentTarget.style.color = '#8b949e';
                        }}
                    >
                        <FaBars size={18} />
                    </button>
                )}

                {/* Language Selector */}
                <div className="relative">
                    <div
                        className="flex items-center gap-2 px-3 py-1.5 rounded-[2px] cursor-pointer"
                        style={{ backgroundColor: '#0a0c0fff' }}
                    >
                        <span className="text-base">{getLanguageIcon()}</span>
                        <select
                            value={language}
                            onChange={handleLanguageChange}
                            className="bg-transparent text-sm font-medium appearance-none cursor-pointer pr-4 outline-none border-none"
                            style={{ color: '#e6edf3' }}
                        >
                            {languageOptions.map(option => (
                                <option
                                    key={option.value}
                                    value={option.value}
                                    style={{ backgroundColor: '#1a2028', color: '#e6edf3', }}
                                >
                                    {option.label}
                                </option>
                            ))}
                        </select>
                        <span
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs pointer-events-none"
                            style={{ color: '#6e7681' }}
                        >
                            ▼
                        </span>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-2">
                {/* Ask AI Button */}
                <button
                    onClick={() => setIsAiModalOpen(true)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-[3px] font-medium text-sm transition-all cursor-pointer"
                    style={{
                        backgroundColor: '#10b981',
                        color: 'white'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#059669';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#10b981';
                    }}
                    title="Ask AI (⌘K)"
                >
                    <HiSparkles size={16} />
                    <span>Ask AI</span>
                    <span
                        className="text-xs px-1.5 py-0.5 rounded ml-1"
                        style={{ backgroundColor: 'rgba(0,0,0,0.2)' }}
                    >
                        ⌘K
                    </span>
                </button>

                {/* Run Button */}
                <button
                    onClick={runCode}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-[3px] font-medium text-sm transition-all cursor-pointer"
                    style={{
                        backgroundColor: '#10b981',
                        color: 'white'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#059669';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#10b981';
                    }}
                    title="Run Code (⌘R)"
                >
                    <FaPlay size={12} />
                    <span>Run</span>
                    <span
                        className="text-xs px-1.5 py-0.5 rounded ml-1"
                        style={{ backgroundColor: 'rgba(0,0,0,0.2)' }}
                    >
                        ⌘R
                    </span>
                </button>
            </div>
        </div>
    );
};

export default TopBar;