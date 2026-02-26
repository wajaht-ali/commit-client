import { useState, useRef, useEffect } from "react";
import { FaBars, FaPlay, FaChevronDown, FaCheck } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";
import { languageOptions } from "../../../utils/Utilities";
import { TbBrandJavascript, TbBrandCpp } from "react-icons/tb";
import { IoLogoPython } from "react-icons/io";
import { TbLockCancel } from "react-icons/tb";

const TopBar = ({
    isMobile,
    onMenuClick,
    language,
    handleLanguageChange,
    runCode,
    setIsAiModalOpen
}) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const getLanguageIcon = (lang) => {
        switch (lang) {
            case 'python': return <IoLogoPython />;
            case 'javascript': return <TbBrandJavascript />;
            case 'cpp': return <TbBrandCpp />;
            default: return '📝';
        }
    };

    const currentLanguageLabel = languageOptions.find(opt => opt.value === language)?.label || language;

    const onLanguageSelect = (value) => {
        handleLanguageChange({ target: { value } });
        setIsDropdownOpen(false);
    };

    return (
        <div
            className="flex items-center justify-between px-3 py-2 sm:px-4 sm:py-2.5 border-b border-[#1e2530] bg-[#000]"
        >
            <div className="flex items-center gap-2 sm:gap-3">
                {isMobile && (
                    <button
                        onClick={onMenuClick}
                        className="p-1.5 sm:p-2 rounded-lg text-[#8b949e] hover:bg-[#1a2028] hover:text-[#e6edf3] transition-colors"
                    >
                        <FaBars size={isMobile ? 16 : 18} />
                    </button>
                )}

                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="flex items-center gap-2 px-2 py-1.5 sm:px-3 sm:py-1.5 rounded-[3px] bg-[#30363d] hover:bg-[#161b22] border border-transparent hover:border-[#30363d] transition-all duration-200 cursor-pointer group"
                    >
                        <span className="text-base sm:text-lg">{getLanguageIcon(language)}</span>
                        <span className="text-xs sm:text-sm font-medium text-[#e6edf3]">
                            {currentLanguageLabel}
                        </span>
                        <FaChevronDown
                            className={`text-[10px] text-[#6e7681] transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                        />
                    </button>

                    {isDropdownOpen && (
                        <div className="absolute top-full left-0 mt-1 w-48 bg-[#1a2028] border border-[#30363d] rounded-md shadow-xl z-50 overflow-hidden py-1 animate-in fade-in zoom-in-95 duration-100">
                            {languageOptions.map((option) => (
                                <button
                                    key={option.value}
                                    disabled={option.status === 'disabled'}
                                    onClick={() => onLanguageSelect(option.value)}
                                    className={`w-full text-left px-3 py-2 flex items-center justify-between gap-2 hover:bg-[#21262d] transition-colors ${language === option.value ? 'bg-[#111] text-white' : 'text-[#c9d1d9]'
                                        }`}
                                >
                                    <div className="flex items-center gap-2">
                                        <span className="text-base">{getLanguageIcon(option.value)}</span>
                                        <span className="text-xs sm:text-sm">{option.label}</span>
                                        <span>{option.status === 'disabled' && <TbLockCancel className="text-sm text-red-500" />}</span>
                                    </div>
                                    {language === option.value && (
                                        <FaCheck className="text-xs text-green-500" />
                                    )}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div className="flex items-center gap-2">
                <button
                    onClick={runCode}
                    className="flex items-center gap-1.5 sm:gap-2 px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-[3px] bg-emerald-500 hover:bg-emerald-600 text-white transition-all shadow-sm hover:shadow-md cursor-pointer group"
                    title="Run Code (⌘R)"
                >
                    <FaPlay className="w-3 h-3 sm:w-3 sm:h-3 group-hover:scale-110 transition-transform" />
                    <span className="text-xs sm:text-sm font-medium">Run</span>
                </button>

                <button
                    onClick={() => setIsAiModalOpen(true)}
                    className="flex items-center gap-1.5 sm:gap-2 px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-[3px] bg-emerald-500 hover:bg-emerald-600 text-white transition-all shadow-sm hover:shadow-md cursor-pointer group"
                    title="Ask AI (⌘K)"
                >
                    <HiSparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:scale-110 transition-transform" />
                    <span className="text-xs sm:text-sm font-medium">Ask AI</span>
                </button>

            </div>
        </div>
    );
};

export default TopBar;