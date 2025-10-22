import React from 'react';

import { FaCopy } from 'react-icons/fa';
import { IoMdDownload } from "react-icons/io";
import { BsArrowRepeat } from "react-icons/bs";
import toast from 'react-hot-toast';

const Spinner = () => (
    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);

const AiAssistantModal = ({
    isOpen,
    prompt,
    setPrompt,
    isGenerating,
    generatedCode,
    language,
    onGenerate,
    onClose,
}) => {
    if (!isOpen) {
        return null;
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(generatedCode)
            .then(() => toast.success('Code copied to clipboard!'))
            .catch(() => toast.error('Failed to copy code!'));
    };

    const handleDownload = () => {
        const fileExtensions = {
            python: 'py',
            javascript: 'js',
            cpp: 'cpp',
        };
        const extension = fileExtensions[language] || 'txt';
        const blob = new Blob([generatedCode], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `ai_generated_code.${extension}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        toast.success('File Downloaded!');
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50 p-4 backdrop-blur-sm lg:inset-auto lg:bottom-4 lg:right-4 lg:block lg:bg-transparent lg:p-0 lg:backdrop-blur-none">
            <div className="w-full max-w-lg bg-gray-800 border border-gray-700 rounded-lg shadow-2xl flex flex-col lg:w-[32rem]">
                <div className="flex justify-between items-center p-3 border-b border-gray-600">
                    <h3 className="text-lg font-semibold text-white flex items-center">
                        <span role="img" aria-label="sparkles" className="mr-2">✨</span>
                        AI Code Generator
                    </h3>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:bg-gray-700 hover:cursor-pointer rounded-full p-1 transition-colors"
                        aria-label="Close"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                </div>

                <div className="p-4 flex-grow flex flex-col gap-4">
                    <div>
                        <label htmlFor="ai-prompt" className="block text-md font-medium text-gray-300 mb-1">
                            Describe the code you want to generate:
                        </label>
                        <textarea
                            id="ai-prompt"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="e.g., a Python function to check if a number is prime"
                            className="w-full h-24 p-2 bg-gray-900 text-white border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 transition"
                            disabled={isGenerating}
                        />
                    </div>
                    <button
                        onClick={onGenerate}
                        disabled={isGenerating || !prompt}
                        className="w-full flex justify-center items-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors disabled:bg-blue-800 disabled:cursor-not-allowed"
                    >
                        {isGenerating ? <><Spinner /> Generating...</> : 'Generate Code'}
                    </button>

                    {generatedCode && (
                        <div className="mt-2">
                            <div className="flex justify-between items-center mb-2">
                                <h4 className="text-md font-semibold text-gray-200">AI Suggestion:</h4>
                                <div className="flex items-center gap-4 lg:mr-2">

                                    <button
                                        onClick={onGenerate}
                                        disabled={isGenerating}
                                        title="Re-generate"
                                        className="text-gray-400 hover:text-white hover:cursor-pointer transition-colors disabled:text-gray-600"
                                    >
                                        <BsArrowRepeat />
                                    </button>
                                    <button
                                        onClick={handleCopy}
                                        title="Copy Code"
                                        className="text-gray-400 hover:text-white hover:cursor-pointer transition-colors"
                                    >
                                        <FaCopy />
                                    </button>
                                    <button
                                        onClick={handleDownload}
                                        title="Download File"
                                        className="text-gray-400 hover:text-white hover:cursor-pointer transition-colors"
                                    >
                                        <IoMdDownload />
                                    </button>
                                </div>
                            </div>
                            <div className="bg-black rounded-md max-h-48 overflow-y-auto">
                                <pre className="p-3 text-sm text-white">
                                    <code>{generatedCode}</code>
                                </pre>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AiAssistantModal;