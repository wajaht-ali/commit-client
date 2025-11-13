import { useState } from 'react';

const OutputPanel = ({ output }) => {
    const [activeTab, setActiveTab] = useState('output');

    const renderContent = () => {
        switch (activeTab) {
            case 'output':
                return (
                    <pre className="flex-1 p-4 bg-black text-white text-sm whitespace-pre-wrap overflow-y-auto font-mono">
                        {output}
                    </pre>
                );
            case 'console':
                return (
                    <div className="flex-1 p-4 text-neutral-400">
                        Debug console coming soon...
                    </div>
                );
            case 'ai':
                return (
                    <div className="flex-1 p-4 text-neutral-400">
                        AI Assistant chat coming soon...
                    </div>
                );
            default:
                return null;
        }
    };

    const TabButton = ({ name, label }) => (
        <button
            onClick={() => setActiveTab(name)}
            className={`px-4 py-2 text-sm font-medium transition-colors ${activeTab === name
                ? 'text-white border-b-2 border-blue-500'
                : 'text-neutral-400 hover:text-white'
                }`}
        >
            {label}
        </button>
    );

    return (
        <div className="bg-[#161b22] rounded-lg flex flex-col h-full border border-[#30363d]">
            <div className="flex items-center border-b border-[#30363d]">
                <TabButton name="output" label="Output" />
                <TabButton name="console" label="Debug Console" />
                <TabButton name="ai" label="AI Assistant" />
            </div>
            {renderContent()}
        </div>
    );
};

export default OutputPanel;